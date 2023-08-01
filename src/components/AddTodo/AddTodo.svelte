<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'

  export let colors
  export let mode

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])
</script>

<hr />
<button
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <Fa icon="{faCirclePlus}" />
  Add Task
</button>

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
</style>
