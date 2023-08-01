<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'

  export let addTask
  export let colors
  export let mode

  let clicked = false
  let maxCharacters = 40
  let text = ''
  let textarea

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])

  $: text = text.replace(/(\r\n|\n|\r)/gm, '')

  function handleBlur() {
    if (text) {
      addTask(text)
      text = ''
    }
    clicked = false
  }

  function handleClick() {
    clicked = true
    setTimeout(() => textarea.focus(), 0)
  }

  function handleKeyDown(event) {
    if (text && event.keyCode === 13) {
      addTask(text)
      clicked = false
      text = ''
    }
  }
</script>

<div class="wrapper">
  {#if !clicked}
    <button
      on:click="{handleClick}"
      style="background-color: {colors.text}; color: {colors[mode]}"
    >
      <Fa icon="{faCirclePlus}" />
      Add Task
    </button>
  {:else}
    <div class="text-area-container">
      <textarea
        bind:this="{textarea}"
        bind:value="{text}"
        on:blur="{handleBlur}"
        on:keydown="{handleKeyDown}"
        rows="2"
        maxlength="{maxCharacters}"
        placeholder="Add text: Enter to save"></textarea>
      <div class="character-count">
        {maxCharacters - text.length}
      </div>
    </div>
  {/if}
</div>
<hr />

<style lang="scss">
  button {
    width: 75%;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    text-transform: uppercase;

    &:hover {
      transform: scale(1.2);
    }

    &:active {
      transform: scale(1);
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
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
