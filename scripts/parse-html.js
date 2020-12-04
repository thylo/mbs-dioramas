const fs = require('fs');
const path = require('path');
const YAML = require("json-to-pretty-yaml");
const { JSDOM } = require('jsdom');

const titles= ['swamps', 'dunes', "seaside"];

fs.readFile(path.resolve(__dirname,'marais.html'),'utf8', (err, content)=>{
  const dom = new JSDOM(content);
  [...dom.window.document.querySelectorAll('.dio')].forEach((element,index)=>{
    const birds = []
    let birdBuffer = null;
    [...element.querySelectorAll('p')].forEach(e=>{
      if(e.querySelector('.c14.c6')){
        if (birdBuffer){
          birds.push(birdBuffer);
          birdBuffer=null
        }
        birdBuffer = {
          title : e.textContent
        }
      } else if (e.querySelector('.c17') || e.querySelector('.c26.c6.c19')){
        birdBuffer.latin = e.textContent
      }
    })
    console.log(birds);
  })
})
