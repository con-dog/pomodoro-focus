<script lang="ts">
  $: colors = {
    pomodoro: '#e74c3c',
    shortBreak: '#ccb42e',
    longBreak: '#3498db'
  }

  function setLabelColor(e, target) {
    console.log(e.target.value)
    colors[target] = e.target.value
  }
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
    margin: 0;
    padding: 0;
    height: 25px;
    width: 25px;
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
