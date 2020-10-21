

let books = document.querySelectorAll('.book'),
  book2List = books[0].querySelectorAll('li'),
  book5List = books[5].querySelectorAll('li')
  

books[0].before(books[1]);
books[0].after(books[4]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

book2List[3].after(book2List[6]);
book2List[6].after(book2List[8]);
book2List[9].after(book2List[2]);

book5List[1].after(book5List[9]);
book5List[4].after(book5List[2]);
book5List[7].after(book5List[5]);


let newItem = document.createElement('li');
newItem.textContent = 'Глава 8: За пределами ES6';

books[2].querySelectorAll('li')[8].after(newItem);