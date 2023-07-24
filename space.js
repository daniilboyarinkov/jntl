function solution(inputString) {
  const reg =
    /^(?<space>[GHK-U][3-8]{3})(?<industryCode>(B(?<industrySubcodeB>[CKMB][GJP]))|(T(?<industrySubcodeT>[ORS][J8ME])))(?<number>[0-9A-Y]{1,24})Z$/;

  const match = inputString.toUpperCase().match(reg);

  if (!match) {
    return [null];
  }

  const result = [
    match.groups.space ?? null,
    match.groups.industryCode?.[0] ?? null,
    match.groups.industrySubcodeB ?? match.groups.industrySubcodeT ?? null,
    match.groups.number ?? null,
  ];

  return result;
}

console.log(solution("O464TR849BM182BDZ"));
console.log(solution("U345BMG123456789ABCDEFZ"));
console.log(solution("U345BMG123456789ABCDEF123456789ABCDEFZ"));
console.log(solution("O464UR849BM182BDZ"));
console.log(solution("O464UR849BM182BD"));
console.log(solution("G333TR81Z"));
