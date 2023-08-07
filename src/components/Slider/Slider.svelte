<script lang="ts">
  import Fa from 'svelte-fa'
  import { faSliders } from '@fortawesome/free-solid-svg-icons'

  export let colors
  export let handleSliderModal
  export let mode
</script>

<div class="wrapper">
  <button on:click="{handleSliderModal}">
    <Fa icon="{faSliders}" style="color: {colors[mode]}" />
  </button>
</div>

<style lang="scss">
  .wrapper {
    align-items: center;
    display: flex;
    height: 50px;
    width: 50px;
    justify-content: center;
    margin: 0;
  }

  button {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    outline: none;
    padding: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
</style>
