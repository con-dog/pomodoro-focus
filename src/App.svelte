<script lang="ts">
  import Timer from './components/Timer/Timer.svelte'

  let mode = 'pomodoro'
  let progress = 0

  function setMode(newMode) {
    mode = newMode
  }
</script>

<main class="{mode}">
  <Timer mode="{mode}" progress="{progress}" setMode="{setMode}" />
</main>

<style>
  main {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    text-align: center;
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
