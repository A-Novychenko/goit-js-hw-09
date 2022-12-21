import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const currentDate = Date.now();
let selectedDate = 0;
let dateCounter = 1000;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    dateHandle(selectedDate);
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', 'enabled');
  input.setAttribute('disabled', 'enabled');

  timerId = setInterval(() => {
    const deltaTime = selectedDate - currentDate;
    let timeLeft = deltaTime - dateCounter;

    dateCounter += 1000;

    if (timeLeft < 1000) {
      clearInterval(timerId);
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
}

function dateHandle(selectedDate) {
  const dateInFuture = selectedDate > currentDate;

  if (!dateInFuture) {
    alert('Please choose a date in the future');
    return;
  }
  startBtn.removeAttribute('disabled');
  return;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
