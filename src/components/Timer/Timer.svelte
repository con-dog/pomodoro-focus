<script lang="ts">
  // create a non-blocking timer that can be displayed in the UI.
  // The timer will update every second and be extremely simple and basic.
  export let mode
  export let progress

  let times = {
    pomodoro: 3,
    shortBreak: 2,
    longBreak: 5
  }

  let timer: number
  let timerRunning = false

  $: time = times[mode]
  $: minutes = Math.floor(time / 60)
  $: seconds = time % 60

  $: console.log(mode, progress)

  function setMode(newMode) {
    mode = newMode
  }

  function startTimer() {
    if (timerRunning) {
      return
    }

    time = times[mode] // reset time when the timer starts
    timerRunning = true

    timer = setInterval(() => {
      if (time === 0) {
        stopTimer()
        if (mode === 'pomodoro') {
          progress++
          if (progress % 4 === 0) {
            setMode('longBreak')
          } else {
            setMode('shortBreak')
          }
        } else {
          setMode('pomodoro')
        }
        time = times[mode] // reset time when the timer reaches zero
      } else {
        time--
      }
    }, 1000)
  }

  function stopTimer() {
    if (!timerRunning) {
      return
    }
    clearInterval(timer)
    timerRunning = false
  }

  function handleClick() {
    if (timerRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }
</script>

<!-- If timerRunning == false, set the class to 'flash' -->
<!-- Set the class based on mode (red blue green) -->
<button on:click="{handleClick}" class="{mode}">
  {minutes}:{seconds}
</button>

<style lang="scss">
  button {
    width: 250px;
    max-width: 250px;
    padding: 2rem 1rem;
    font-size: 6em;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(255, 104, 129);
    color: white;
  }

  .flash {
    animation: blinker both 1s infinite;
  }

  .pomodoro {
    background-color: rgb(255, 104, 129);
  }

  .shortBreak {
    background-color: rgb(255, 179, 71);
  }

  .longBreak {
    background-color: rgb(0, 184, 148);
  }

  @keyframes blinker {
    50% {
      color: darkgray;
    }
  }
</style>
