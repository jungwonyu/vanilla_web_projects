document.addEventListener('DOMContentLoaded', () => {
  const get = (target, parent = document) => parent.querySelector(target);
  const originSelect = get('.origin select');
  const originInput = get('.origin input');
  const exchangeSelect = get('.exchange select');
  const exchangeInput = get('.exchange input');
  const rate = get('.rate');
  const swapButton = get('.swap');
  const api = 'https://open.exchangerate-api.com/v6/latest';
  fetch(api)
    .then((response) => { // response 받아오기
      return response.json(); // json으로 변환
    })
    .then((data) => { // 변환된 데이터를 data로 받아오기
      const currency = Object.keys(data.rates);
      currency.map((element) => {
        const option = document.createElement('option');
        option.value = element;
        option.innerText = element;
        originSelect.appendChild(option);
        exchangeSelect.appendChild(option.cloneNode(true));
      });

      init(data);
    });

    originSelect.addEventListener('change', () => change());
    exchangeSelect.addEventListener('change', () => change());
    swapButton.addEventListener('click', () => swap());

  init = (data) => {
    originInput.value = 1;
    originSelect.value = 'USD';
    exchangeSelect.value = 'EUR';
    const rateValue = Number(data.rates[exchangeSelect.value] / data.rates[originSelect.value]);
    exchangeInput.value =  rateValue.toFixed(2);
    rate.innerText = `1 ${originSelect.value} = ${rateValue.toFixed(6)} ${exchangeSelect.value}`;
  };

  swap = () => {
    let prevData = originSelect.value;
    originSelect.value = exchangeSelect.value;
    exchangeSelect.value = prevData;
    change();
  }

  change = () => {
    fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        const rateValue = Number(data.rates[exchangeSelect.value] / data.rates[originSelect.value]);
        exchangeInput.value =  rateValue.toFixed(2);
        rate.innerText = `1 ${originSelect.value} = ${rateValue.toFixed(6)} ${exchangeSelect.value}`;
    });
  }
});
