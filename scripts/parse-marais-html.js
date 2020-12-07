const fs = require('fs');
const path = require('path');
const YAML = require("json-to-pretty-yaml");
const { JSDOM } = require('jsdom');
const slugify = require('slugify');

const titles= ['swamps', 'dunes', "seaside"];

fs.readFile(path.resolve(__dirname,'marais.html'),'utf8', (err, content)=>{
  const dom = new JSDOM(content);
  [...dom.window.document.querySelectorAll('.dio')].forEach((element,index)=>{
    const birds = []
    let birdBuffer = null;
    let sectionBuffer = null;
    [...element.querySelectorAll('p')].forEach(e=>{
      if(e.querySelector('.c14.c6')){
        if (birdBuffer){
          birdBuffer.sections.push(sectionBuffer);
          birds.push(birdBuffer);
          birdBuffer=null
          sectionBuffer=null;
        }
        birdBuffer = {
          title : e.textContent,
          slug : slugify(e.textContent, {remove:/'/}).toLowerCase(),
          diorama: titles[index],
          lang:'fr',
          sections: []
        }
      } else if (e.querySelector('.c17') || e.querySelector('.c26.c6.c19')){
        birdBuffer.latin = e.textContent
      }else if(e.querySelector('.c5')){
        if (sectionBuffer){
          birdBuffer.sections.push(sectionBuffer);
          sectionBuffer=null
        }
        sectionBuffer = {
          title : e.textContent,
          content:''
        }
      }else{
        if(sectionBuffer) {
          sectionBuffer.content += e.innerHTML
        }
      }
    })
    birds.forEach(bird=>{
      fs.writeFileSync(path.resolve(__dirname,'..', 'src', 'birds', `${bird.slug}.${bird.lang}.yml`),YAML.stringify(bird))
    })
  })
})
