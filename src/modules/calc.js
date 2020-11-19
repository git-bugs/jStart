const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calcType[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value < 5 && calcDay.value) {
      dayValue *= 2;
    } else if (calcDay.value < 10 && calcDay.value) {
      dayValue *= 1.5;
    }
    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }
    const totalAnimate = () => {
      let count = totalValue.textContent;
      const timer = () => {
        requestAnimationFrame(timer);
        if (count < total) {
          count++;
          totalValue.textContent = count;
        } else if (count > total) {
          count--;
          totalValue.textContent = count;
        } else clearInterval(idAnimate);
      };
      const idAnimate = setInterval(timer, 1);
    };
    totalAnimate();
  };

  calcBlock.addEventListener('change', event => {
    let target = event.target;
    if (target.matches('.calc-item')) {
      countSum();
    }
  })
};

export default calc;