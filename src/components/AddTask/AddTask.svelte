<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'

  export let addTask
  export let colors
  export let mode

  let text = ''
  let maxCharacters = 50

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])

  $: text = text.replace(/(\r\n|\n|\r)/gm, '')

  function handleBlur() {
    if (text) addTask(text)
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      addTask(text)
    }
  }
</script>

<button
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <Fa icon="{faCirclePlus}" />
  Add Task
</button>
<hr />
<div class="text-area-container">
  <textarea
    bind:value="{text}"
    on:blur="{handleBlur}"
    on:keydown="{handleKeyDown}"
    rows="3"
    maxlength="50"
    placeholder="Add text: Enter to save"></textarea>
  <div class="character-count">
    {maxCharacters - text.length}
  </div>
</div>

<style lang="scss">
  button {
    width: 90%;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    text-transform: uppercase;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }

  .text-area-container {
    position: relative;
    width: 100%;
    z-index: 2;
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
