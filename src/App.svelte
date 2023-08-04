<script lang="ts">
  import AddTask from './components/AddTask/AddTask.svelte'
  import ColorPicker from './components/ColorPicker/ColorPicker.svelte'
  import Task from './components/Task/Task.svelte'
  import Timer from './components/Timer/Timer.svelte'
  import Volume from './components/Volume/Volume.svelte'
  import { tick } from 'svelte'
  import { fly } from 'svelte/transition'
  import { v4 as uuid } from 'uuid'

  let colors = {
    pomodoro: '#DB3352',
    shortBreak: '#437ECB',
    longBreak: '#0F8F1E',
    text: '#f3f3f3'
  }
  let mode = 'pomodoro'
  let mute = false
  let progress = 0
  let scrollContainer
  let selectedTask
  let tasks = []
  let times = {
    pomodoro: 4,
    shortBreak: 3,
    longBreak: 6
  }
  let time: number = times[mode]

  function setMode(newMode: string) {
    mode = newMode
    time = times[mode]
  }

  function setLabelColor(e, target) {
    colors[target] = e.target.value
  }

  function addTask(text) {
    let task = {
      id: uuid(),
      text,
      progress
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

  function updateTaskProgress(id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        task.progress++
      }
      return task
    })
  }

  function completeTask(id) {
    tasks = tasks.filter((task) => task.id !== id)
  }

  function setSelectedTask(id) {
    selectedTask = id
  }

  function toggleMute() {
    mute = !mute
  }
</script>

<main style="background-color: {colors[mode]}">
  <div class="container">
    <div class="header-wrapper">
      <ColorPicker colors="{colors}" setLabelColor="{setLabelColor}" />
      <Volume colors="{colors}" mute="{mute}" toggleMute="{toggleMute}" />
    </div>
    <div class="timer-wrapper">
      <Timer
        colors="{colors}"
        mode="{mode}"
        mute="{mute}"
        progress="{progress}"
        selectedTask="{selectedTask}"
        setMode="{setMode}"
        time="{time}"
        updateTaskProgress="{updateTaskProgress}"
      />
    </div>
    <div class="task-wrapper">
      <AddTask addTask="{addTask}" colors="{colors}" mode="{mode}" />
      <div bind:this="{scrollContainer}" class="scroll-container">
        {#each tasks as task (task.id)}
          <div
            in:fly="{{ y: -200, duration: 500 }}"
            out:fly="{{ y: -200, duration: 500 }}"
          >
            <Task
              id="{task.id}"
              colors="{colors}"
              completeTask="{completeTask}"
              mode="{mode}"
              selectedTask="{selectedTask}"
              setSelectedTask="{setSelectedTask}"
              task="{task}"
              updateTask="{updateTask}"
            />
          </div>
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
    .header-wrapper {
      flex: 1;
    }
    .timer-wrapper {
      flex: 3;
    }
    .task-wrapper {
      flex: 3;
    }
  }

  .header-wrapper {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
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
