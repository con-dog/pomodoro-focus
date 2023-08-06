<script lang="ts">
  /* @license
  Connor Talbot | Pomodoro Focus | property of hackhive.io hello@hackhive.io | Copyright Disclaimer

  This Copyright Disclaimer (“Disclaimer”) sets forth the rights, limitations, and obligations concerning the use of copyrighted materials owned by Connor Talbot / hackhive.io (“Owner”). By accessing or using any materials, content, or intellectual property owned by the Owner, you acknowledge and agree to the terms of this Disclaimer.

  Copyright Ownership: All materials, content, and intellectual property, including but not limited to text, images, graphics, logos, audio, video, and software, made available in the Pomodoro Focus extension, hackhive.io website, publications, or other platforms, are protected by copyright laws and owned by the Owner unless otherwise stated.

  Permission for Personal Use: You may not download, reverse-engineer, copy, modify, or print copyrighted materials from Connor Talbots/hackhive.io/Pomodoro Focus platforms or extensions for any personal, non-commercial, or commercial use.

  Disclaimer of Liability: The Owner shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of copyrighted materials, including but not limited to errors, omissions, or inaccuracies in the content or loss or damage of any kind incurred as a result of the use of any copyrighted material.

  By accessing or using any copyrighted materials owned by Pomodoro Focus extension or Connor Talbot or hackhive.io, you acknowledge and agree to abide by the terms of this Copyright Disclaimer. If you do not agree with any of these terms, please refrain from accessing or using the copyrighted materials.

  For any inquiries regarding this Copyright Disclaimer, please contact 'hello' at hello@hackhive.io

  Date: 08.06.2023 deviceview | Connor Talbot | Auckland, New Zealand
  */
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
  let draggedTaskId
  let mode = 'pomodoro'
  let mute = false
  let progress = 0
  let scrollContainer
  const scrollSensitivity = 50 // Within 50px of edge
  const scrollSpeed = 5 // Scroll 5px per tick
  let scrollInterval
  let selectedTask
  let tasks = []
  let times = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
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

  function dragstart(e, id) {
    draggedTaskId = id
  }

  function dragover(e) {
    e.preventDefault()
  }

  function drop(e, id) {
    e.preventDefault()

    // Find the positions of the tasks in the array
    const draggedTaskIndex = tasks.findIndex(
      (task) => task.id === draggedTaskId
    )
    const targetTaskIndex = tasks.findIndex((task) => task.id === id)

    // Swap the tasks
    ;[tasks[draggedTaskIndex], tasks[targetTaskIndex]] = [
      tasks[targetTaskIndex],
      tasks[draggedTaskIndex]
    ]

    // Force Svelte to update the state
    tasks = tasks
  }

  function handleDragOverContainer(e) {
    const rect = scrollContainer.getBoundingClientRect()

    // Clear any existing scroll interval
    if (scrollInterval) {
      clearInterval(scrollInterval)
      scrollInterval = null
    }

    // If we're within scrollSensitivity distance from the top or bottom edge
    if (e.clientY - rect.top < scrollSensitivity) {
      // Set up an interval to scroll up every tick
      scrollInterval = setInterval(() => {
        scrollContainer.scrollTop -= scrollSpeed
      }, 1000 / 60) // 60fps
    } else if (rect.bottom - e.clientY < scrollSensitivity) {
      // Set up an interval to scroll down every tick
      scrollInterval = setInterval(() => {
        scrollContainer.scrollTop += scrollSpeed
      }, 1000 / 60) // 60fps
    }
  }

  function handleDragEnd(e) {
    // When the dragging ends, clear any potential scroll interval
    if (scrollInterval) {
      clearInterval(scrollInterval)
      scrollInterval = null
    }
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
      <div
        bind:this="{scrollContainer}"
        class="scroll-container"
        on:dragover="{handleDragOverContainer}"
        on:dragend="{handleDragEnd}"
        on:drop="{handleDragEnd}"
      >
        {#each tasks as task (task.id)}
          <div
            in:fly="{{ y: -200, duration: 500 }}"
            out:fly="{{ y: -200, duration: 500 }}"
            draggable="true"
            on:dragstart="{(e) => dragstart(e, task.id)}"
            on:dragover="{dragover}"
            on:drop="{(e) => drop(e, task.id)}"
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
