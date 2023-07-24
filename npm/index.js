function dependencyExplode(data, { packageName, version }) {
  const dependencies = [];
  const packageDependencies = (
    data[packageName].versions.find((package) => package.version == version)
      ?.dependencies || []
  ).slice();
  dependencies.push(...packageDependencies);
  packageDependencies.forEach((dependance) => {
    dependencies.push(...dependencyExplode(data, dependance));
  });
  return dependencies;
}

const SUCCESS = 0;
const FIRST_DOWN = 1;
const SECOND_DOWN = 2;

function tryCombine(data, packageA, packageB) {
  const versions = {};
  const dependenciesA = [packageA, ...dependencyExplode(data, packageA)];
  const dependenciesB = [packageB, ...dependencyExplode(data, packageB)];
  for (let { packageName, version } of dependenciesA) {
    if (versions[packageName] && versions[packageName] != version)
      return FIRST_DOWN;
    versions[packageName] = version;
  }
  const versionsB = {};
  for (let { packageName, version } of dependenciesB) {
    if (versionsB[packageName] && versionsB[packageName] != version)
      return SECOND_DOWN;
    versionsB[packageName] = version;
    if (versions[packageName]) {
      if (versions[packageName] > version) return FIRST_DOWN;
      if (versions[packageName] < version) return SECOND_DOWN;
    }
  }
  return SUCCESS;
}

function getLastCompatibleDependencies(data, packageA, packageB) {
  let indexA = 0;
  let indexB = 0;
  const versionsA = data[packageA].versions.sort(
    (a, b) => b.version - a.version
  );
  const versionsB = data[packageB].versions.sort(
    (a, b) => b.version - a.version
  );
  while (true) {
    const versionA = versionsA[indexA].version;
    const versionB = versionsB[indexB].version;
    const status = tryCombine(
      data,
      { packageName: packageA, version: versionA },
      { packageName: packageB, version: versionB }
    );
    if (status == SUCCESS)
      return { [packageA]: versionA, [packageB]: versionB };
    if (status == FIRST_DOWN) indexA += 1;
    if (status == SECOND_DOWN) indexB += 1;
  }
}

exports.getLastCompatibleDependencies = getLastCompatibleDependencies;
