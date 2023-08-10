<script lang="ts">
  // Create a non-blocking timer that can be displayed in the UI.
  // The timer will update every second and be extremely simple and basic.
  import Fa from 'svelte-fa'
  import { faCircle as faCircleEmpty } from '@fortawesome/free-regular-svg-icons'
  import { faCircle } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'
  import ping from '../../assets/ping.mp3'
  import { Howl, Howler } from 'howler'

  export let colors
  export let mode
  export let mute
  export let progress
  export let selectedTask
  export let setMode
  export let time: number
  export let updateTaskProgress

  let previousMode = mode
  let timer: number
  let timerRunning = false
  let sound = new Howl({
    src: [ping]
  })

  $: {
    if (mode !== previousMode) {
      stopTimer() // Clear any existing timer
      timeAsSeconds = time * 60 // Reset the time based on the new mode
    }
    previousMode = mode // Store the current mode as the previous mode
  }

  $: timeAsSeconds = time * 60
  $: minutes = Math.floor(timeAsSeconds / 60)
  $: seconds = timeAsSeconds % 60

  function startTimer() {
    timerRunning = true

    timer = setInterval(() => {
      if (timeAsSeconds === 0) {
        if (!mute) sound.play()
        stopTimer()
        if (mode === 'pomodoro') {
          if (selectedTask) updateTaskProgress(selectedTask)
          progress++
          if (progress % 4 === 0) {
            setMode('longBreak')
          } else {
            setMode('shortBreak')
          }
        } else {
          setMode('pomodoro')
        }
      } else {
        timeAsSeconds--
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

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])
</script>

<button
  on:click="{handleClick}"
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <div>
    <p
      class="time"
      class:flash="{!timerRunning}"
      style="{!timerRunning
        ? `--flash-color: hsl(${hue}, ${saturation}%, ${lightness}%)`
        : ''}"
    >
      {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </p>
    <p class="mode">{mode}</p>
    <span>
      <!-- icon is faCircleEmpty if progress is 0 or 4 or 8 etc else faCircle -->
      <Fa
        icon="{progress % 4 === 0 && mode !== 'longBreak'
          ? faCircleEmpty
          : faCircle}"
      />
      <!-- icon is faCircleEmpty if progress is 0, 1, 4, 5 etc -->
      <Fa
        icon="{progress % 4 < 2 && mode !== 'longBreak'
          ? faCircleEmpty
          : faCircle}"
      />
      <!-- icon is faCircleEmpty if progress is 0, 1, 2, 4, 5, 6 etc -->
      <Fa
        icon="{progress % 4 < 3 && mode !== 'longBreak'
          ? faCircleEmpty
          : faCircle}"
      />
      <!-- icon is faCircleEmpty if progress is 0, 1, 2, 3, 5, 6 etc -->
      <Fa icon="{mode !== 'longBreak' ? faCircleEmpty : faCircle}" />
    </span>
  </div>
</button>

<style lang="scss">
  button {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    margin: 2rem 0 0 0;
    min-width: 260px;
    width: 260px;
    max-width: 250px;
    padding: 2.5rem 1.5rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .time {
    font-size: 86px;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }

  .mode {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  span {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
  }

  .flash {
    animation: blinker both 1s infinite;
  }

  @keyframes blinker {
    50% {
      color: var(--flash-color);
    }
  }
</style>
