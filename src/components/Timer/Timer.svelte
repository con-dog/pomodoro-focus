<script lang="ts">
  // Create a non-blocking timer that can be displayed in the UI.
  // The timer will update every second and be extremely simple and basic.
  export let mode
  export let progress
  export let setMode

  let times = {
    pomodoro: 2,
    shortBreak: 2,
    longBreak: 2
  }

  let timer: number
  let timerRunning = false
  let time: number = times[mode]
  let remainingTime: number | null = null

  $: minutes = Math.floor(time / 60)
  $: seconds = time % 60

  function startTimer() {
    time = remainingTime !== null ? remainingTime : times[mode]
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
        time = times[mode] // set time to the new mode's time immediately
        remainingTime = time // reset remainingTime when the timer reaches zero
      } else {
        time--
        remainingTime = time
      }
    }, 1000)
  }

  function stopTimer() {
    if (timerRunning) {
      clearInterval(timer)
      timerRunning = false
    }
  }

  function handleClick() {
    if (timerRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }
</script>

<button on:click="{handleClick}" class="{mode}" class:flash="{!timerRunning}">
  <div>
    {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
    <span>{mode}</span>
  </div>
</button>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  button {
    width: 250px;
    max-width: 250px;
    padding: 2.5rem 1rem;
    font-size: 86px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(255, 104, 129);
    color: white;
  }

  span {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
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
