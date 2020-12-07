const fs = require('fs');
const path = require('path');
const YAML = require("json-to-pretty-yaml");
const { JSDOM } = require('jsdom');
const slugify = require('slugify');

fs.readFile(path.resolve(__dirname,'vasieres.html'),'utf8', (err, content)=>{
  const dom = new JSDOM(content);

  const birds = []
  let birdBuffer = null;
  let sectionBuffer = null;
  [...dom.window.document.querySelectorAll('p')].forEach(e=>{
    if(!e.textContent)return;
    if(e.querySelector('.c1') && e.querySelector('.c2.c5')){
      if (birdBuffer){
        birdBuffer.sections.push(sectionBuffer);
        birds.push(birdBuffer);
        birdBuffer=null;
        sectionBuffer = null;
      }
      const title = e.querySelector('.c1').textContent
      birdBuffer = {
        title,
        slug : slugify(title, {remove:/'/}).toLowerCase(),
        diorama: 'fields',
        lang:'fr',
        sections: []
      }
      birdBuffer.latin = e.querySelector('.c2.c5').textContent
    }else if(e.querySelector('.c1')){
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
  if (birdBuffer){
    birdBuffer.sections.push(sectionBuffer);
    birds.push(birdBuffer);
    birdBuffer=null;
    sectionBuffer = null;
  }
  birds.forEach(bird=>{
    fs.writeFileSync(path.resolve(__dirname,'..', 'src', 'birds', `${bird.slug}.${bird.lang}.yml`),YAML.stringify(bird))
  })

  console.log(birds);
})
