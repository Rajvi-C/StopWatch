$(document).ready(function () {
  let timer;
  let elapsedTime = 0;
  let isRunning = false;

  const today = new Date(Date.now()).toISOString().split("T")[0];
  $("#datePicker").val(today);

  function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }

  async function startStopwatch() {
    return new Promise((resolve) => {
      if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
          elapsedTime++;
          $("#timeLabel").text(formatTime(elapsedTime));
        }, 1000);
        resolve();
      }
    });
  }

  async function stopStopwatch() {
    return new Promise((resolve) => {
      if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        resolve();
      }
    });
  }

  async function resetStopwatch() {
    return new Promise((resolve) => {
      clearInterval(timer);
      elapsedTime = 0;
      $("#timeLabel").text(formatTime(elapsedTime));
      isRunning = false;
      resolve();
    });
  }

  $("#startBtn").click(async function () {
    await startStopwatch();
  });

  $("#stopBtn").click(async function () {
    await stopStopwatch();
  });

  $("#resetBtn").click(async function () {
    await resetStopwatch();
  });
});
