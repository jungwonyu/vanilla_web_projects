document.addEventListener('DOMContentLoaded', () => {
  const username = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  const submit = document.getElementById('submit');

  const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    small.classList.add('on');
  };

  const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.classList.remove('on');
  };

  const regularEx = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validations() {
    username.value === '' ? showError(username, '세 글자 이상 입력하세요.') : showSuccess(username);
    email.value === '' || !regularEx(email.value) ? showError(email, `'@'를 포함하여 입력하세요.`) : showSuccess(email);
    password.value === '' || password.value.length < 6 ? showError(password, '최소 6자이상 입력하세요.') : showSuccess(password);
    password2.value === '' || password2.value !== password.value ? showError(password2, '비밀번호가 일치하지 않습니다.') : showSuccess(password2);
  }

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    validations();
  });
});
