document.addEventListener('DOMContentLoaded', () => {
  const get = (target, parent = document) => parent.querySelector(target);
  const gets = (target, parent = document) =>
    Array.from(parent.querySelectorAll(target));

  const username = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  const submit = document.getElementById('submit');
  const popContainer = get('.popContainer');
  const popOpenBtn = get('.popOpenBtn');
  const popCloseBtn = get('.popContainer .closeBtn');
  const menuContainer = get('.menuContainer');
  const menuOpenBtn = get('.menuBtn');
  const menuCloseBtn = get('.menuContainer .closeBtn');

  showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  };

  showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  };

  regularEx = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  validations = () => {
    username.value === ''
      ? showError(username, '세 글자 이상 입력하세요.')
      : showSuccess(username);
    email.value === '' || !regularEx(email.value)
      ? showError(email, `'@'를 포함하여 입력하세요.`)
      : showSuccess(email);
    password.value === '' || password.value.length < 6
      ? showError(password, '최소 6자이상 입력하세요.')
      : showSuccess(password);
    password2.value === '' || password2.value !== password.value
      ? showError(password2, '비밀번호가 일치하지 않습니다.')
      : showSuccess(password2);
  };

  popOpen = (container) => {
    container.classList.add('on');
  };

  popClose = (container) => {
    container.classList.remove('on');
    container.classList.add('off');
  };

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    validations();
  });
  popOpenBtn.addEventListener('click', () => popOpen(popContainer));
  popCloseBtn.addEventListener('click', () => popClose(popContainer));
  menuOpenBtn.addEventListener('click', () => popOpen(menuContainer));
  menuCloseBtn.addEventListener('click', () => popClose(menuContainer));
});
