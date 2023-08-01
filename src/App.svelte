<script lang="ts">
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Profile from './components/Profile/Profile.svelte'
  import Timer from './components/Timer/Timer.svelte'

  let mode = 'pomodoro'
  let progress = 0

  function setMode(newMode) {
    mode = newMode
  }
</script>

<main class="{mode}">
  <div>
    <nav>
      <ColorPicker />
    </nav>
    <Timer mode="{mode}" progress="{progress}" setMode="{setMode}" />
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

  .pomodoro {
    background-color: #e74c3c;
  }

  .shortBreak {
    background-color: #ccb42e;
  }

  .longBreak {
    background-color: #3498db;
  }
</style>
