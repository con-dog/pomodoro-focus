<script lang="ts">
  import Timer from './components/Timer/Timer.svelte'
  import Todos from './components/Todos/Todos.svelte'

  let mode = 'pomodoro'
  let progress = 0
</script>

<main>
  <Timer mode="{mode}" progress="{progress}" />
</main>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
    background-color: red;
  }
</style>
