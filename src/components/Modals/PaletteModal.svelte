<script>
  import ColorPicker from '../ColorPicker/ColorPicker.svelte'

  export let colors
  export let setLabelColor
  export let showPaletteModal // boolean

  let dialog // HTMLDialogElement

  $: if (dialog && showPaletteModal) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this="{dialog}" on:close on:click|self="{() => dialog.close()}">
  <div on:click|stopPropagation>
    <ColorPicker colors="{colors}" setLabelColor="{setLabelColor}" />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click="{() => dialog.close()}">OKAY</button>
  </div>
</dialog>

<style>
  dialog {
    max-width: 280px;
    min-width: 200px;
    border-radius: 10px;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.85);
  }
  dialog > div {
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
