module.exports = function winners(wait, pushResult, STREET_RACERS, N) {
  const result = [];
  const racers = initRacers();

  function initRacers() {
    const racers = {};
    for (let streetRacer of STREET_RACERS) {
      racers[streetRacer] = 0;
    }
    return racers;
  }

  function check() {
    for (let racer in racers) {
      if (racers[racer] === N) {
        if (!result.includes(racer)) result.push(racer);
      }
    }
    if (result.length === 3) {
      pushResult(result);
    }
  }

  function cb(str) {
    const { streetRacer, i } = this;
    if (str === "connection lost") {
      wait(streetRacer, i, cb.bind({ streetRacer: streetRacer, i: i }));
      return;
    }
    if (i - racers[streetRacer] === 1) {
      racers[streetRacer] = i;
    }
    check();
  }

  for (let streetRacer of STREET_RACERS) {
    for (let i = 1; i <= N; i++) {
      wait(streetRacer, i, cb.bind({ streetRacer: streetRacer, i: i }));
    }
  }
};
