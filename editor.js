const toParagraph = (str) => `<p>${str}</p>`;
const toListItem = (str) => `<li>${str}</li>`;
const toList = (str) => `<ul>${str}</ul>`;
const toTitle = (str) => `<h1>${str}</h1>`;
const toLink = (link, text) => `<a href="${link}">${text}</a>`;

const reg = /\(\((?<link>[^ ]+) (?<text>.*)\)\)/gim;

const result = (str) => {
  let output = "";

  const lines = str.split("\n").map((line) => line.trim());
  let listItems = "";

  for (const ll of lines) {
    let line = ll;

    const links = [...line.matchAll(reg)];
    for (const link of links) {
      const linkHref = link.groups.link;
      const linkText = link.groups.text;
      line = line.replace(reg, toLink(linkHref, linkText));
    }

    if (line.startsWith("=")) {
      output += toTitle(line.substring(1).trim());
    } else if (line.startsWith("*")) {
      listItems += toListItem(line.substring(1).trim());
    } else {
      if (!!line.length) {
        output += toParagraph(line);
      }
    }

    if (!line.startsWith("*") && !!listItems.length) {
      output += toList(listItems);
      listItems = "";
    }
  }

  return output;
};

console.log(
  result(`
* test
`)
);
console.log(
  result(`
* item
* item
`)
);
console.log(
  result(`
* test

* test 2
`)
);
console.log(result(`test`));
console.log(
  result(`
= head

text ((https://ya.ru link)) text.

* item
* item`)
);
