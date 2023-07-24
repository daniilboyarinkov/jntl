function getLastCommonCommitMessage(commits, branches) {
  const commitsReversed = commits.sort(
    (prev, cur) => cur.timestamp - prev.timestamp
  );

  for (const commit of commitsReversed) {
    if (
      commit.branches.includes(branches[0]) &&
      commit.branches.includes(branches[1])
    ) {
      return commit.message;
    }

    for (const parentId of commit.parents) {
      const parent = commitsReversed.find((p) => p.id === parentId);

      parent.branches = [...(parent.branches ?? []), ...commit.branches];
    }
  }

  throw new Error("No common commit");
}

// module.exports = { getLastCommonCommitMessage };

// ----------------------------------------------------------------

try {
  const result1 = getLastCommonCommitMessage(
    [
      {
        id: "1",
        message: "initial commit",
        timestamp: 1624010073113,
      },
      {
        id: "2",
        parents: ["1"],
        message: "add layout",
        timestamp: 1624010082219,
      },
      {
        id: "3",
        parents: ["2"],
        message: "fix bugs",
        timestamp: 1624010109039,
        branches: ["master", "bugfix"],
      },
      {
        id: "4",
        parents: ["2"],
        message: "add link",
        timestamp: 1624010179662,
        branches: ["feature/link"],
      },
    ],
    ["bugfix", "feature/link"]
  );

  console.log(result1);
  // Output: 'add layout'
} catch (error) {
  console.log(error.message);
}

try {
  const result2 = getLastCommonCommitMessage(
    [
      {
        id: "1",
        message: "initial commit",
        timestamp: 1624010073113,
        branches: ["master"],
      },
    ],
    ["master", "master"]
  );

  console.log(result2);
  // Output: 'initial commit'
} catch (error) {
  console.log(error.message);
}

try {
  const result3 = getLastCommonCommitMessage(
    [],
    ["ghost", "bla-bla-bla-branch"]
  );

  console.log(result3);
  // Output: This code will not be reached because an error will be thrown
} catch (error) {
  console.log(error.message);
  // Output: 'No common commit'
}
