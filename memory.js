// Жанры в памяти
const Genre1 = {
  type: "genre",
  name: "Рок",
  bands: [],
  subgenres: [],
  parent: null,
};
const Genre1Sub1 = {
  type: "genre",
  name: "Классик-рок",
  bands: [],
  subgenres: [],
  parent: null,
};
const Genre1Sub2 = {
  type: "genre",
  name: "Акустик-рок",
  bands: [],
  subgenres: [],
  parent: null,
};
const Genre1Sub3 = {
  type: "genre",
  name: "Полурок",
  bands: [],
  subgenres: [],
  parent: null,
};
const Genre2 = {
  type: "genre",
  name: "Нерок",
  bands: [],
  subgenres: [],
  parent: null,
};

// Разбираемся с роком
Genre1.subgenres.push(Genre1Sub1, Genre1Sub2, Genre1Sub3);
Genre1Sub1.parent = Genre1Sub2.parent = Genre1Sub3.parent = Genre1;

// Группы в памяти
const Band1 = {
  type: "band",
  name: "Жёлтый мох",
  friends: [],
  genres: [],
};
const Band2 = {
  type: "band",
  name: "Красный слой",
  friends: [],
  genres: [],
};
const Band3 = {
  type: "band",
  name: "Бритый гриб",
  friends: [],
  genres: [],
};

// И в жанрах
Band1.genres.push(Genre1Sub1);
Genre1Sub1.bands.push(Band1);

Band2.genres.push(Genre1Sub2);
Genre1Sub2.bands.push(Band2);

// А Бритый гриб лабает в двух жанрах
Band3.genres.push(Genre2);
Genre2.bands.push(Band3);
Band3.genres.push(Genre1Sub3);
Genre1Sub3.bands.push(Band3);

// Группы умеют дружить
Band1.friends.push(Band2);
Band2.friends.push(Band1);

// С некоторыми — по 2 раза, но это не взаимно
Band1.friends.push(Band3);

// Помнит Коля только про Бритый Гриб :-(
// console.log(Genre1.subgenres.includes(Genre1Sub2));
// console.log(Band3);

/**
 * @param {Band|Genre} data - ссылка на группу или жанр,
 * из которой нужно восстановить все возможные данные
 * @return {string}
 */
function solution(data) {
  const genres = new Set();
  const bands = new Set();

  /**
   * @param {Genre} genre
   */
  const traverseGenre = (genre) => {
    if (genres.has(genre)) {
      return;
    }

    if (!genre.parent) {
      genres.add(genre);
    } else {
      traverseGenre(genre.parent);
    }

    for (const band of genre.bands) {
      traverseBand(band);
    }

    for (const subgenre of genre.subgenres) {
      for (const band of subgenre.bands) {
        traverseBand(band);
      }
    }
  };

  /**
   * @param {Band} band
   */
  const traverseBand = (band) => {
    if (bands.has(band)) {
      return;
    }
    bands.add(band);

    for (const friend of band.friends) {
      traverseBand(friend);
    }

    for (const genre of band.genres) {
      traverseGenre(genre);
    }
  };

  const factoryFn = {
    genre: traverseGenre,
    band: traverseBand,
  };

  const stringCompare = (a, b) => (a.name > b.name ? 1 : -1);

  /**
   * @param {Band|Genre} node
   */
  const traverse = (node) => {
    factoryFn[node.type](node);
  };

  /**
   * @param {Band|Genre[]} genres
   * @param {Band[]} bands
   * @return {string}
   */
  const toMD = (genres, bands) => {
    let result = "";

    if (genres.length > 0) {
      result += "## Жанры\n\n";
      genres.sort(stringCompare);

      const trav = (genres, level) => {
        if (genres.length === 0) {
          return;
        }

        for (const genre of genres) {
          genre.bands.sort(stringCompare);
          genre.subgenres.sort(stringCompare);
          const bands =
            genre.bands.length > 0
              ? `: ${genre.bands.map((b) => b.name).join(" ,")}`
              : "";
          const line = `${" ".repeat(level * 2)}- ${genre.name}${bands}\n`;

          result += line;

          trav(genre.subgenres, level + 1);
        }
      };

      trav(genres, 0);

      result += "\n";
    }

    if (bands.length > 0) {
      result += "## Группы\n\n";

      bands.sort(stringCompare);
      for (const band of bands) {
        band.friends.sort(stringCompare);

        const friends =
          band.friends.length > 0
            ? ", друзья: " + band.friends.map((f) => f.name).join(", ")
            : "";
        const line = `- ${band.name}${friends}\n`;
        result += line;
      }
    }

    return result;
  };

  traverse(data);

  return toMD(Array.from(genres), Array.from(bands));
}

console.log(solution(Band3));
