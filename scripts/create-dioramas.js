const fs = require('fs');
const path = require('path');
const YAML = require("json-to-pretty-yaml");

const dioramas = [
  {
    lang: "fr",
    items: [
      { slug: "fields", name: "Champs / Prairies" },
      { slug: "cliffs", name: "Falaises" },
      { slug: "dunes", name: "Dunes" },
      { slug: "seaside", name: "Bord de mer" },
      { slug: "mudflats", name: "Vasieres" },
      { slug: "swamps", name: "Marais" },
    ],
  },
  {
    lang: "en",
    items: [
      { slug: "fields", name: "Fields" },
      { slug: "cliffs", name: "Cliffs" },
      { slug: "dunes", name: "Dunes" },
      { slug: "seaside", name: "Seaside" },
      { slug: "mudflats", name: "Mudflats" },
      { slug: "swamps", name: "Swamps" },
    ],
  }
];

dioramas.forEach(({items, lang})=>{
  items.forEach(item=>{
    const fp = path.resolve(__dirname,'..', 'src', 'dioramas', `${item.slug}.${lang}.yml`);
    fs.writeFileSync(fp, YAML.stringify({lang, ...item}))
  })
})