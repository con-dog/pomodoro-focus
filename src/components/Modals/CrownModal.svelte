<script>
  export let showCrownModal

  let dialog // HTMLDialogElement
  let pomdoroSlider
  let shortBreakSlider
  let longBreakSlider

  $: if (dialog && showCrownModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this="{dialog}" on:close on:click|self="{() => dialog.close()}">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="container">
    <!-- svelte-ignore a11y-autofocus -->
    <h2>⚡Supercharge⚡ Your Focus</h2>
    <ul>
      <li>♾️ Unlimited tasks</li>
      <li>💾 Save tasks</li>
      <li>⌛ Customize times</li>
      <li>🎨 Customize colours</li>
    </ul>
    <div class="button-wrapper">
      <button class="green">Go PRO for $6</button>
      <button class="neutral" on:click="{() => dialog.close()}">Cancel</button>
    </div>
  </div>
</dialog>

<style>
  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .green,
  .neutral {
    font-family: sans-serif;
    width: 100%;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .green {
    font-size: 1.2rem;
    font-weight: 700;
    background-color: #00b894;
    transition: transform 0.2s ease-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  .neutral {
    background-color: #636e72;
  }

  h2 {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }

  ul {
    text-align: left;
    list-style: none;
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
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
