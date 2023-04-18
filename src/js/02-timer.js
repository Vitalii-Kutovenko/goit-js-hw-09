import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({ position: 'center-top', timeout: 5000 });

const startButton = document.getElementById("start-btn");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= new Date().getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener("click", startTimer);

function startTimer() {
  const selectedDate = flatpickr.parseDate(document.getElementById("datetime-picker").value, "Y-m-d H:i");
  startButton.disabled = true;
  let timer = setInterval(updateTimer, 1000);

  function updateTimer() {
    const timeLeft = selectedDate.getTime() - new Date().getTime();
    if (timeLeft < 0) {
      clearInterval(timer);
      document.querySelector(".timer").textContent = "00:00:00:00";
      startButton.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      document.querySelector(".timer").textContent = `${formatNumber(days)}:${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }
  }
}

function formatNumber(number) {
    return number < 10 ? `0${number}` : number;
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
