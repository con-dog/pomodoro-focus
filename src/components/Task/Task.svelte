<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCircleCheck as faCircleCheckEmpty } from '@fortawesome/free-regular-svg-icons'
  import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'

  export let colors
  export let mode
  export let task
  export let updateTask

  let editing = false
  let maxCharacters = 40
  let textarea

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])

  function handlePClick() {
    editing = true
  }

  function handleKeyDown(event) {
    if (task.text && event.keyCode === 13) {
      updateTask(task.id, task.text)
      editing = false
    }
  }
</script>

<button
  class="task"
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <div class="content">
    <div class="spin-on-hover">
      <Fa icon="{faCircleCheckEmpty}" style="font-size: 1.25rem;" />
    </div>
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
          on:keydown="{handleKeyDown}"
          rows="2"
          maxlength="{maxCharacters}"
          placeholder="Add text: Enter to save"></textarea>
        <div class="character-count">
          {maxCharacters - task.text.length}
        </div>
      </div>
    {/if}
  </div>
  <span>33</span>
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
      transform: translateX(0.5rem);
    }

    // &:focus {
    //   outline: 2px solid white;
    // }
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

  p {
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    word-break: break-all;
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

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .spin-on-hover {
    &:hover {
      animation: spin 1s infinite linear;
    }
  }

  .text-area-container {
    position: relative;
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
