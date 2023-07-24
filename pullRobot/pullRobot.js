function conflicts(a, b) {
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      return true;
    } else if (a[i] > b[j]) {
      j++;
    } else {
      i++;
    }
  }

  return false;
}

module.exports = function (prs) {
  const all = [];

  const conflictMatrix = new Uint8Array(prs.length ** 2);
  const prToIndex = new WeakMap();

  for (let i = 0; i < prs.length; i++) {
    const pr1 = prs[i];
    prToIndex.set(pr1, i);
    conflictMatrix[i * prs.length + i] = 0;
    for (let j = i + 1; j < prs.length; j++) {
      const pr2 = prs[j];
      conflictMatrix[i * prs.length + j] = conflictMatrix[j * prs.length + i] =
        conflicts(pr1.files, pr2.files);
    }
  }

  function doPRsConflict(pr1, pr2) {
    const i = prToIndex.get(pr1);
    const j = prToIndex.get(pr2);
    return conflictMatrix[i * prs.length + j] === 1;
  }

  function conflictsWithSomePR(pr, prsToTest) {
    return prsToTest.some((prToTest) => doPRsConflict(pr, prToTest));
  }

  function getNonConflictingPRs(prsSet, mergedPrs) {
    const result = [];
    const prsToTest = [...prsSet, ...mergedPrs];
    prsSet.forEach((pr) => {
      if (!conflictsWithSomePR(pr, prsToTest)) {
        result.push(pr);
      }
    });
    return result;
  }

  const fullSearch = (prsSet, mergedPrs = [], mergedFilesCount = 0) => {
    const safeToMergePRs = getNonConflictingPRs(prsSet, mergedPrs);
    mergedPrs = mergedPrs.concat(safeToMergePRs);
    safeToMergePRs.forEach((pr) => {
      prsSet.delete(pr);
      mergedFilesCount += pr.files.length;
    });

    const pr = prsSet.values().next().value;

    if (!pr) {
      if (mergedPrs.length) {
        mergedPrs.sort((a, b) => a.created - b.created);
        all.push({
          mergedPrs,
          mergedFilesCount,
          date: mergedPrs[0].created,
        });
      }
      return;
    }

    if (!conflictsWithSomePR(pr, mergedPrs)) {
      prsSet.delete(pr);
      fullSearch(
        new Set(prsSet),
        [pr, ...mergedPrs],
        mergedFilesCount + pr.files.length
      );
      fullSearch(new Set(prsSet), mergedPrs, mergedFilesCount);
      prsSet.add(pr);
    } else {
      prsSet.delete(pr);
      fullSearch(new Set(prsSet), mergedPrs, mergedFilesCount);
      prsSet.add(pr);
    }
  };

  fullSearch(new Set(prs));

  if (!all.length) {
    return [];
  }

  all.sort(
    (a, b) => b.mergedFilesCount - a.mergedFilesCount || a.date - b.date
  );

  const out = all[0].mergedPrs.sort((a, b) => a.created - b.created);

  return out.map((p) => p.id);
};
