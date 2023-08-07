<script>
  export let handleTimeChange
  export let showSliderModal
  export let times

  let dialog // HTMLDialogElement
  let pomdoroSlider
  let shortBreakSlider
  let longBreakSlider

  $: if (dialog && showSliderModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this="{dialog}" on:close on:click|self="{() => dialog.close()}">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="container">
    <!-- svelte-ignore a11y-autofocus -->
    <div>
      <div class="row">
        <label for="pomodoro">POMDORO</label>
        <input
          bind:this="{pomdoroSlider}"
          bind:value="{times.pomodoro}"
          on:change="{() => handleTimeChange(pomdoroSlider.value, 'pomodoro')}"
          type="number"
          id="pomdoro"
          name="pomodoro"
          min="1"
          max="60"
        />
      </div>
      <div class="row">
        <label for="shortbreak">SHORTBREAK</label>
        <input
          bind:this="{shortBreakSlider}"
          bind:value="{times.shortBreak}"
          on:change="{() =>
            handleTimeChange(shortBreakSlider.value, 'shortBreak')}"
          type="number"
          id="shortbreak"
          name="shortbreak"
          min="1"
          max="60"
        />
      </div>
      <div class="row">
        <label for="longbreak">LONGBREAK</label>
        <input
          bind:this="{longBreakSlider}"
          bind:value="{times.longBreak}"
          on:change="{() =>
            handleTimeChange(longBreakSlider.value, 'longBreak')}"
          type="number"
          id="longbreak"
          name="longbreak"
          min="1"
          max="60"
        />
      </div>
    </div>
    <button class="neutral" on:click="{() => dialog.close()}">Okay</button>
  </div>
</dialog>

<style>
  .neutral {
    font-family: sans-serif;
    width: 100%;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    background-color: #636e72;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  input {
    width: 80px;
    border: none;
    border-bottom: 1px solid #000;
    padding: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
    &:focus {
      outline: none;
    }
  }

  dialog {
    max-width: 280px;
    min-width: 200px;
    border-radius: 10px;
    border: none;
    padding: 0;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.75);
  }

  dialog > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
