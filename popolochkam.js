// Товары в памяти
const Good1 = {
  type: "good",
  name: "Смесь Friso Frisolaс Gold 2035",
  comments: [],
  related: [],
};
const Good2 = {
  type: "good",
  name: "МакБук PRO 2035 13' w/ clickbar",
  comments: [],
  related: [],
};
const Good3 = {
  type: "good",
  name: "Фигурка Funko POP! Vinyl: Overwatch Уинстон",
  comments: [],
  related: [],
};

// Отзывы в памяти
const Comment1 = {
  type: "comment",
  text: "Классный ноутбук!",
  comments: [],
  parent: null,
};
const Comment2 = {
  type: "comment",
  text: "Не понравился! Кликбар не работает совсем!",
  comments: [],
  parent: null,
};
const Comment3 = {
  type: "comment",
  text: "Хорошая цена, у малыша не было аллергии на неё",
  comments: [],
  parent: null,
};

// Похожие товары
Good3.related.push(Good1, Good2);
Good1.related.push(Good3);
Good2.related.push(Good3);

// Расставляем комментарии
Comment1.parent = Good2;
Good2.comments.push(Comment1);

Comment2.parent = Comment1;
Comment1.comments.push(Comment2);

Comment3.parent = Good1;
Good1.comments.push(Comment3);

function solution(data) {
  function sortGoods(goods) {
    if (goods == null) return;

    goods.sort(function (a, b) {
      let nameA = a.name;
      let nameB = b.name;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  function sortComments(comments) {
    if (comments == null) return;

    comments.sort(function (a, b) {
      let textA = a.text;
      let textB = b.text;

      if (textA < textB) {
        return -1;
      }
      if (textA > textB) {
        return 1;
      }
      return 0;
    });
  }

  function formCommentText(comment, level) {
    let output = " ".repeat(level * 2) + "- " + comment.text;
    if (level == 0) {
      output += " - про " + comment.parent.name;
    }
    output += "\n";

    let newLevel = ++level;

    sortComments(comment.comments);

    for (let item of comment.comments) {
      output += formCommentText(item, newLevel);
    }

    return output;
  }

  let tdata = data;

  while (tdata.type == "comment" && tdata.parent != null) {
    tdata = tdata.parent;
  }

  let comments = "## Отзывы\n\n";
  let goods = "## Товары\n\n";

  let allgoods = [];
  allgoods.push(tdata);

  for (let good of allgoods) {
    for (let item of good.related) {
      if (!allgoods.includes(item)) {
        allgoods.push(item);
      }
    }
  }

  sortGoods(allgoods);

  for (let item of allgoods) {
    goods += "- " + item.name + "\n";
    sortGoods(item.related);

    for (let item2 of item.related) {
      goods += "  * " + item2.name + "\n";
    }
  }

  let firstComments = [];
  for (let good of allgoods) {
    firstComments = firstComments.concat(good.comments);
  }

  sortComments(firstComments);

  for (let item of firstComments) {
    comments += formCommentText(item, 0);
  }

  comments += "\n";
  return comments + goods;
}

console.log(solution(Comment3));
