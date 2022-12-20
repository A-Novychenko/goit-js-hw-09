import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const currentTime = Date.now();
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
  timerId = setInterval(() => {
    dateCounter += 1000;
    let timeLeft = selectedDate - currentTime - dateCounter;
    console.log('interval', timeLeft);

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }, 1000);
}

function dateHandle(selectedDates) {
  const dateInFuture = selectedDate > currentTime;

  if (!dateInFuture) {
    alert('Please choose a date in the future');
    return;
  }
  startBtn.removeAttribute('disabled');
  return;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
