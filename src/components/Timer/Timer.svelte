<script lang="ts">
  // create a non-blocking timer that can be displayed in the UI.
  // The timer will update every second and be extremely simple and basic.
  let defaultTime = 25 * 60
  let time = defaultTime
  let timer: number
  let timerRunning = false

  $: minutes = Math.floor(time / 60)
  $: seconds = time % 60

  $: {
    if (time === 0) {
      stopTimer()
    }
  }

  // Modify the below function so that
  function startTimer() {
    if (timerRunning) {
      return
    }
    timer = setInterval(() => {
      time--
    }, 1000)
    timerRunning = true
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
<button on:click="{handleClick}" class="{timerRunning ? '' : 'flash'}">
  {minutes}:{seconds}{seconds === 0 ? 0 : ''}
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

  @keyframes blinker {
    50% {
      color: darkgray;
    }
  }
</style>
