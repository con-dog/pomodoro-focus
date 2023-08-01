<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCircleCheck as faCircleCheckEmpty } from '@fortawesome/free-regular-svg-icons'
  import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
  import hexToHSL from '../../helpers/hexToHSL'

  export let colors
  export let mode
  export let task

  $: [hue, saturation, lightness] = hexToHSL(colors[mode])
</script>

<button
  class="task"
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <div class="content">
    <Fa icon="{faCircleCheckEmpty}" style="font-size: 1.25rem" />
    <p>{task}</p>
  </div>
  <span>33</span>
</button>

<style lang="scss">
  .task {
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
      transform: scale(1.1);
    }
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
  }
</style>
