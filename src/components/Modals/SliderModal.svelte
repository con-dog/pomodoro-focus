<script>
  export let showSliderModal // boolean
  export let times

  let dialog // HTMLDialogElement
  let pomdoroSlider
  let shortBreakSlider
  let longBreakSlider

  $: if (dialog && showSliderModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this="{dialog}" on:close on:click|self="{() => dialog.close()}">
  <div on:click|stopPropagation class="container">
    <!-- svelte-ignore a11y-autofocus -->
    <div>
      <div class="row">
        <label for="pomodoro">POMDORO</label>
        <input
          bind:this="{pomdoroSlider}"
          type="number"
          id="pomdoro"
          name="pomodoro"
          min="1"
          max="60"
          value="{times.pomodoro}"
        />
      </div>
      <div class="row">
        <label for="shortbreak">SHORTBREAK</label>
        <input
          bind:this="{shortBreakSlider}"
          type="number"
          id="shortbreak"
          name="shortbreak"
          min="1"
          max="60"
          value="{times.shortBreak}"
        />
      </div>
      <div class="row">
        <label for="longbreak">LONGBREAK</label>
        <input
          bind:this="{longBreakSlider}"
          type="number"
          id="longbreak"
          name="longbreak"
          min="1"
          max="60"
          value="{times.longBreak}"
        />
      </div>
    </div>
    <button autofocus on:click="{() => dialog.close()}">OKAY</button>
  </div>
</dialog>

<style>
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
  button {
    display: block;
  }
</style>
