<script lang="ts">
  import AddTask from './components/AddTask/AddTask.svelte'
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Task from './components/Task/Task.svelte'
  import Timer from './components/Timer/Timer.svelte'
  import { tick } from 'svelte'
  import { v4 as uuid } from 'uuid'

  let colors = {
    pomodoro: '#9a031e',
    shortBreak: '#e9c46a',
    longBreak: '#3F88C5',
    text: '#f3f3f3'
  }
  let mode = 'pomodoro'
  let progress = 0
  let scrollContainer
  let selectedTask
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

    tick().then(() => {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    })
  }

  function updateTask(id, text) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        task.text = text
      }
      return task
    })
    // Wait until the DOM has updated, then scroll to the updated task
    tick().then(() => {
      const updatedTask = document.getElementById(id)
      updatedTask.scrollIntoView({ behavior: 'smooth' })
    })
  }

  function setSelectedTask(id) {
    selectedTask = id
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
      <div bind:this="{scrollContainer}" class="scroll-container">
        {#each tasks as task}
          <Task
            id="{task.id}"
            colors="{colors}"
            mode="{mode}"
            selectedTask="{selectedTask}"
            setSelectedTask="{setSelectedTask}"
            task="{task}"
            updateTask="{updateTask}"
          />
        {/each}
      </div>
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

  .scroll-container {
    height: 250px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
