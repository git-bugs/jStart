'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.top = 50;
    this.left = 50;
    this.render = function () {
      let item;
      if (this.selector.trim()[0] == '.') {
        item = document.createElement('div');
        item.classList.add(this.selector.trim());
      } else if (this.selector.trim()[0] == '#') {
        item = document.createElement('p');
        item.id = this.selector.trim();
      } else return;
      item.style.cssText = 'height:' + this.height + 'px; width:' + this.width + 'px; background:' + this.bg + '; font-size:' + this.fontSize + 'px; position: absolute; left:' + this.left + 'px; top:' + this.top + 'px;';
      document.body.append(item);
    };
    this.position = function (event) {
      let item = document.body.lastChild,
      width = document.body.clientWidth,
      height = document.body.clientHeight;
      console.log(height, width);
      if (event.key == 'ArrowRight' && this.left < width -100 ) {
        item.style.left = this.left + 10 + 'px';
        this.left += 10;
      } else if (event.key == 'ArrowLeft' && this.left > 0) {
        item.style.left = this.left - 10 + 'px';
        this.left -= 10;
      }  else if (event.key == 'ArrowUp' && this.top > 0) {
        item.style.top = this.top - 10 + 'px';
        this.top -= 10;
      } else if (event.key == 'ArrowDown' && this.top < height - 110) {
        item.style.top = this.top + 10 + 'px';
        this.top += 10;
      }
    };
    this.events = function () {
      document.addEventListener('keydown', this.position.bind(this));
      this.render();
    }
  };

  const newElement = new DomElement('.aqwsde', 100, 100, 'grey', 25);
  newElement.events();

});




