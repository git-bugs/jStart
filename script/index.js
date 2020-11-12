const valid = new Validator({
  selector: '#form1',
  pattern: {
    phone:/^\+380\d{7}/,
    text: /[а-яА-ЯёЁ][^0-9]+/g
  },
  method: {
    'form1-name': [
      ['notEmpty'],
      ['pattern','text']
    ],
    'form1-email': [
      ['notEmpty'],
      ['pattern','email']
    ],
    'form1-phone': [
      ['notEmpty'],
      ['pattern','phone']
    ]
  }
});
valid.init();
const validFooter = new Validator({
  selector: '#form2',
  pattern: {
    phone:/^\+380\d{7}/,
    text: /[а-яА-ЯёЁ][^0-9]+/g
  },
  method: {
    'form2-name': [
      ['notEmpty'],
      ['pattern','text']
    ],
    'form2-email': [
      ['notEmpty'],
      ['pattern','email']
    ],
    'form2-phone': [
      ['notEmpty'],
      ['pattern','phone']
    ],
    'form2-message': [
      ['notEmpty'],
      ['pattern','text']
    ]
  }
})
validFooter.init();