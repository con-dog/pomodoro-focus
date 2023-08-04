<script lang="ts">
  import Fa from 'svelte-fa'
  import {
    faVolumeHigh,
    faVolumeXmark
  } from '@fortawesome/free-solid-svg-icons'

  export let colors
  export let mute
  export let toggleMute
</script>

<div class="wrapper">
  <button on:click="{toggleMute}" style="color: {colors.text}">
    <Fa icon="{mute ? faVolumeXmark : faVolumeHigh}" />
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
  }
</style>
