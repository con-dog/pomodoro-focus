<script lang="ts">
  import Fa from 'svelte-fa'
  import { faBrush } from '@fortawesome/free-solid-svg-icons'

  export let colors
  export let handlePaletteButtonClick
  export let mode
</script>

<div class="wrapper">
  <button on:click="{handlePaletteButtonClick}">
    <Fa icon="{faBrush}" style="color: {colors[mode]}" />
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
