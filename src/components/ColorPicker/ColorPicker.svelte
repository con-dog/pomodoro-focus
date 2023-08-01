<script lang="ts">
  export let colors
  export let setLabelColor
</script>

<div>
  <label style="background-color: {colors['pomodoro']}">
    <input
      type="color"
      value="{colors['pomodoro']}"
      on:change="{(e) => setLabelColor(e, 'pomodoro')}"
    />
  </label>
  <label style="background-color: {colors['shortBreak']}">
    <input
      type="color"
      value="{colors['shortBreak']}"
      on:change="{(e) => setLabelColor(e, 'shortBreak')}"
    />
  </label>
  <label style="background-color: {colors['longBreak']}">
    <input
      type="color"
      value="{colors['longBreak']}"
      on:change="{(e) => setLabelColor(e, 'longBreak')}"
    />
  </label>
  <label style="background-color: {colors['text']}">
    <input
      type="color"
      value="{colors['text']}"
      on:change="{(e) => setLabelColor(e, 'text')}"
    />
  </label>
</div>

<style lang="scss">
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 100px;
  }

  label {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    margin: 0;
    padding: 0;
    height: 20px;
    width: 20px;
    border: 2px solid white;
    border-radius: 5px;
  }

  input {
    visibility: hidden;
    width: 25px;
    height: 25px;
    padding: 0;
    margin: 0;
    appearance: none;
    border: none;
  }
</style>
