document.addEventListener('DOMContentLoaded', () => {
  const get = (target, parent = document) => parent.querySelector(target);
  const gets = (target, parent = document) => [...parent.querySelectorAll(target)];
  const seatList = gets('.row .seat');
  const occupiedSeatCount = get('.message .seat');
  const totalPrice = get('.message .price');
  const optionList = get('select');
  const resetBtn = get('.resetBtn');
  let seatArr = [];

  init = () => {
    for (let i = 0; i < optionList.options.length; i++) {
      if (Number(optionList.options[i].value) === Number(localStorage.getItem('price'))) {
        optionList.selectedIndex = i;
        break;
      }
    }
    const selectedSeat = localStorage.getItem('seatIdx').split(',').map((idx) => Number(idx));
    selectedSeat.forEach((idx) => seatList[idx].classList.add('selected'));
    seatArr = selectedSeat;
    occupiedSeatCount.innerText = selectedSeat.length;
    totalPrice.innerText = seatArr.length * Number(optionList.options[optionList.selectedIndex].value);
  };

  reset = () => {
    seatList.forEach((seat) => seat.classList.remove('selected'));
    localStorage.clear();
    occupiedSeatCount.innerText = 0;
    totalPrice.innerText = 0;
  };

  change = () => {
    const value = Number(optionList.options[optionList.selectedIndex].value);
    localStorage.setItem('price', value);
    totalPrice.innerText = localStorage.getItem('seat') * value;
  };

  selectedSeat = (seat, idx) => {
    seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
      const isSelected = seat.classList.contains('selected');
      isSelected ? seatArr.push(idx) : (seatArr = seatArr.filter((seatIdx) => seatIdx !== idx));
      localStorage.setItem('seatIdx', seatArr);

      const value = Number(localStorage.getItem('price')) || Number(get('select').options[get('select').selectedIndex].value);
      const seatLength = seatList.filter((seat) => seat.matches('.selected')).length;
      localStorage.setItem('seat', seatLength);
      occupiedSeatCount.innerText = seatLength;
      totalPrice.innerText = seatLength * value;
    });
  };

  optionList.addEventListener('change', () => change());
  seatList.forEach((seat, idx) => selectedSeat(seat, idx));
  localStorage.getItem('seatIdx') && init();
  resetBtn.addEventListener('click', () => reset());
});
