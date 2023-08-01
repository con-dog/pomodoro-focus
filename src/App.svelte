<script lang="ts">
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Profile from './components/Profile/Profile.svelte'
  import Timer from './components/Timer/Timer.svelte'

  let colors = {
    pomodoro: '#e74c3c',
    shortBreak: '#ccb42e',
    longBreak: '#3498db',
    text: '#f3f3f3'
  }
  let mode = 'pomodoro'
  let progress = 0

  function setLabelColor(e, target) {
    console.log(e.target.value)
    colors[target] = e.target.value
  }

  function setMode(newMode) {
    mode = newMode
  }
</script>

<main style="background-color: {colors[mode]}">
  <div>
    <nav>
      <ColorPicker colors="{colors}" setLabelColor="{setLabelColor}" />
    </nav>
    <Timer
      colors="{colors}"
      mode="{mode}"
      progress="{progress}"
      setMode="{setMode}"
    />
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: sans-serif;
    text-align: center;
    max-width: 280px;
    height: 100%;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
  }
</style>
