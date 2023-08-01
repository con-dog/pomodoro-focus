<script lang="ts">
  import AddTodo from './components/AddTodo/AddTodo.svelte'
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Timer from './components/Timer/Timer.svelte'

  let colors = {
    pomodoro: '#e74c3c',
    shortBreak: '#ccb42e',
    longBreak: '#3498db',
    text: '#f3f3f3'
  }
  let mode = 'pomodoro'
  let progress = 0
  let tasks = []

  function setLabelColor(e, target) {
    colors[target] = e.target.value
  }

  function setMode(newMode) {
    mode = newMode
  }
</script>

<main style="background-color: {colors[mode]}">
  <div class="container">
    <div class="color-picker-wrapper">
      <ColorPicker colors="{colors}" setLabelColor="{setLabelColor}" />
    </div>
    <div class="timer-wrapper">
      <Timer
        colors="{colors}"
        mode="{mode}"
        progress="{progress}"
        setMode="{setMode}"
      />
    </div>
    <div class="todo-wrapper"><AddTodo colors="{colors}" mode="{mode}" /></div>
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

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: sans-serif;
    text-align: center;
    max-width: 280px;
    height: 100%;
    > * {
      width: 100%;
    }
    .color-picker-wrapper {
      flex: 1;
    }
    .timer-wrapper {
      flex: 3;
    }
    .todo-wrapper {
      flex: 2;
    }
  }

  .timer-wrapper,
  .color-picker-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 1rem;
  }
</style>
