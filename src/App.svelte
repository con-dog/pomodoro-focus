<script lang="ts">
  import AddTask from './components/AddTask/AddTask.svelte'
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Task from './components/Task/Task.svelte'
  import Timer from './components/Timer/Timer.svelte'
  import { v4 as uuid } from 'uuid'

  let colors = {
    pomodoro: '#9a031e',
    shortBreak: '#e9c46a',
    longBreak: '#3F88C5',
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

  function addTask(text) {
    let task = {
      id: uuid(),
      text
    }
    tasks = [...tasks, task]
  }

  function updateTask(id, text) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        task.text = text
      }
      return task
    })
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
    <div class="task-wrapper">
      <AddTask addTask="{addTask}" colors="{colors}" mode="{mode}" />
      {#each tasks as task}
        <Task
          colors="{colors}"
          mode="{mode}"
          task="{task}"
          updateTask="{updateTask}"
        />
      {/each}
    </div>
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
    .task-wrapper {
      flex: 3;
    }
  }

  .color-picker-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
