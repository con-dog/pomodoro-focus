<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCircleCheck as faCircleCheckEmpty } from '@fortawesome/free-regular-svg-icons'
  import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'
  import confetti from 'canvas-confetti'
  import { onDestroy } from 'svelte'

  onDestroy(() => {
    confetti({
      particleCount: 500,
      spread: 80,
      origin: { y: 0.6 }
    })
  })

  export let colors
  export let completeTask
  export let id
  export let mode
  export let selectedTask
  export let setSelectedTask
  export let task
  export let updateTask

  let complete = false
  let editing = false
  let icon = faCircleCheckEmpty
  let maxCharacters = 40
  let textarea

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])

  // bind the input event to handleInput function and adjust the initial height
  $: if (textarea) {
    task.text = task.text.replace(/(\r\n|\n|\r)/gm, '')
    textarea.addEventListener('input', handleInput)
    handleInput() // for initial height adjustment
  }

  const handleInput = () => {
    textarea.style.height = 'auto' // reset the height
    textarea.style.height = textarea.scrollHeight + 5 + 'px' // set the new height
  }

  function handlePClick() {
    editing = true
    setTimeout(() => textarea.focus(), 0)
  }

  function handleCompleteTask() {
    complete = true
    completeTask(task.id)
  }

  function handleKeyDown(event) {
    if (task.text && event.keyCode === 13) {
      updateTask(task.id, task.text)
      editing = false
    }
  }

  function handleBlur() {
    if (textarea.value) {
      updateTask(task.id, textarea.value)
    }
    editing = false
  }
</script>

<button
  id="{id}"
  class="task"
  class:selected="{selectedTask === task.id}"
  on:click="{() => setSelectedTask(task.id)}"
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}; --text-color: {colors.text}"
>
  <div class="content">
    <button
      class="spin-on-hover"
      on:mouseover="{() => (icon = faCircleCheck)}"
      on:mouseout="{() => (icon = faCircleCheckEmpty)}"
      on:click="{handleCompleteTask}"
      style="color: {colors.text}"
    >
      <Fa icon="{icon}" style="font-size: 1.25rem; font-weight: bold;" />
    </button>
    {#if !editing}
      <button class="button-p" on:click="{handlePClick}">
        <p
          style="--flash-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; --text-color: {colors.text};"
        >
          {task.text}
        </p>
      </button>
    {:else}
      <div class="text-area-container">
        <textarea
          bind:this="{textarea}"
          bind:value="{task.text}"
          on:blur="{handleBlur}"
          on:keydown="{handleKeyDown}"
          maxlength="{maxCharacters}"
          placeholder="Add text: Enter to save"></textarea>
        <div class="character-count">
          {maxCharacters - task.text.length}
        </div>
      </div>
    {/if}
  </div>
  <span>{task.progress}</span>
</button>

<style lang="scss">
  .task {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem auto;
    gap: 0.5rem;
    border-radius: 5px;
    padding: 0 1rem;
    border: none;
    cursor: pointer;
    width: 95%;
    transition: all 0.1s ease-in-out;

    &:hover {
      transform: translateX(0.3rem);
    }
  }

  .selected {
    outline: 4px solid var(--text-color);
  }

  .button-p {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  span {
    font-size: 1rem;
    font-weight: 600;
    text-decoration: underline;
    color: var(--text-color);
  }

  p {
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
    color: var(--text-color);

    &:hover {
      animation: blinker both 1s infinite;
    }

    @keyframes blinker {
      50% {
        color: var(--flash-color);
      }
    }
  }

  .spin-on-hover {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .text-area-container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  textarea {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    resize: none;
  }

  .character-count {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    color: #aaa;
  }
</style>
