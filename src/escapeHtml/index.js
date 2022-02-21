exports.escapeHtml = (str) => {
    const arrEntities = {
      nbsp: " ",
      lt: "<",
      gt: ">",
      amp: "&",
      ensp: "     ",
      emsp: " ",
      quot: '"',
      middot: "·",
      brvbar: "¦",
      mdash: "—",
      ndash: "–",
      ge: "≥",
      le: "≤",
      laquo: "«",
      raquo: "»",
      deg: "°",
      bull: "•",
      macr: "¯",
      "#64": "@",
      ldquo: "“",
      rdquo: "”",
      rsquo: "‚",
      lsquo: "‘",
      "#039": "'",
    };
    return str.replace(
      new RegExp(`&(${Object.keys(arrEntities).join("|")});`, "g"),
      (all, t) => {
        return arrEntities[t];
      }
    );
  };