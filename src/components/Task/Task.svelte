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

<div
  class="task"
  style="background-color: {`hsl(${hue}, ${saturation}%, ${lightness}%)`}; color: {colors.text}"
>
  <div class="content">
    <Fa icon="{faCircleCheckEmpty}" style="font-size: 1.25rem" />
    <p>{task}</p>
  </div>
  <span>33</span>
</div>

<style lang="scss">
  .task {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.5rem 0;
    gap: 0.5rem;
    border-radius: 5px;
    padding: 0 1rem;
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
