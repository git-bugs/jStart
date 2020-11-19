const calcValid = () => {
  const calcInput = document.querySelector('.calc');
  const inputNum = (event) => {
    let target = event.target;
    if (target.matches('input')) {
      target.addEventListener('input', () => {
        target.value = target.value.replace(/\D/g, '')
      })
    }
  }
  calcInput.addEventListener('click', inputNum)
};

export default calcValid;
