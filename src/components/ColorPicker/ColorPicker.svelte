<script lang="ts">
  export let colors
  export let setLabelColor
</script>

<div class="container">
  <div class="row">
    <label style="background-color: {colors['pomodoro']}">
      <input
        type="color"
        value="{colors['pomodoro']}"
        on:change="{(e) => setLabelColor(e, 'pomodoro')}"
      />
    </label>
    <p class="mode">POMODORO</p>
  </div>
  <div class="row">
    <label style="background-color: {colors['shortBreak']}">
      <input
        type="color"
        value="{colors['shortBreak']}"
        on:change="{(e) => setLabelColor(e, 'shortBreak')}"
      />
    </label>
    <p class="mode">SHORTBREAK</p>
  </div>
  <div class="row">
    <label style="background-color: {colors['longBreak']}">
      <input
        type="color"
        value="{colors['longBreak']}"
        on:change="{(e) => setLabelColor(e, 'longBreak')}"
      />
    </label>
    <p class="mode">LONGBREAK</p>
  </div>
  <div class="row">
    <label style="background-color: {colors['text']}">
      <input
        type="color"
        value="{colors['text']}"
        on:change="{(e) => setLabelColor(e, 'text')}"
      />
    </label>
    <p class="mode">TEXT</p>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .row {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
  }

  label {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    margin: 0;
    padding: 0;
    height: 20px;
    width: 20px;
    border: 2px solid white;
    border-radius: 5px;
  }

  .mode {
    font-family: sans-serif;
    margin: 0;
    padding: 0 0.5rem;
    text-align: center;
    font-size: 1.25rem;
  }

  input {
    visibility: hidden;
    padding: 0;
    margin: 0;
    appearance: none;
    border: none;
  }
</style>
