const sendForm = () => {

  const formSubmit = (formId) => {
    const errorMessage = 'Что-то пошло не так',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся';
    const form = document.getElementById(formId);
    let statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';
    form.lastChild.remove();
    form.appendChild(statusMessage);
    const formData = new FormData(form);
    statusMessage.textContent = loadMessage;
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status not 200');
        }
        statusMessage.textContent = successMessage;
        form.querySelectorAll('input').forEach(item => item.value = '')
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.log(error);
      });
  }

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/json'
      },
      body: JSON.stringify(body)
    });
  }

  document.body.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmit(event.target.closest('form').id);
  });
};

export default sendForm;