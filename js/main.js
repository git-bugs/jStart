'use strict';

const DomElement = function(selector, height, width, bg, fontSize){
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.render = function(){
    let item;
  if (this.selector.trim()[0] == '.'){
    item = document.createElement('div');
    item.classList.add(this.selector.trim());
  } else if (this.selector.trim()[0] =='#'){
    item = document.createElement('p');
    item.id = this.selector.trim();
  } else return;
  item.textContent = item.tagName + ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda esse ad deleniti iste, aut aperiam, autem ducimus at, quibusdam nemo totam blanditiis inventore suscipit';
  item.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background:' + this.bg + '; font-size:' + this.fontSize + 'px;';
  document.body.append(item);
  }
};

const newElement = new DomElement('.aqwsde', 200, 500, 'grey', 25);
newElement.render();
