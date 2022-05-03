<script>
  import { onDestroy } from 'svelte/internal';
  import tc from 'tinycolor2';
  import { enabledColors } from './Toggles.svelte';

  if (typeof window !== 'undefined') {
    import("@github/clipboard-copy-element")
  }

  export let colors = {};
  export let alpha = false;

  const formatColor = (color) => alpha ? tc(color).toHex8String() : tc(color).toHexString();

  let names;

  $: names = Object.keys(colors).filter(color => $enabledColors.includes(color))

  const handleClipboard = function (event) {
    const button = event.target
    button.classList.toggle('copied', true)
    setTimeout(() => {
      button.classList.toggle('copied', false);
    }, 2500)
  }

  let body;

  onDestroy(() => {
    body?.removeEventListener('clipboard-copy', handleClipboard)
  })
</script>

<svelte:body bind:this={body} on:clipboard-copy={handleClipboard} />

<div class="grid grid-cols-1 gap-14 my-10 w-full light">
{#key $enabledColors}
{#each names as palette, p (palette)}
  <div>
    <div class="flex flex-col justify-start space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
      <div class="w-16 h-full justify-start space-around flex flex-row relative">
        <div class="h-full block text-sm font-semibold text-slate-200 dark:text-slate-1100 uppercase ">{palette}</div>
      </div>
      <div class="min-w-0 flex-1 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12 gap-x-4 gap-y-3 3xl:gap-x-2">
      {#each Object.entries(colors[palette]) as [shade, color], c (c)}
        {@const tcolor = tc(color)}
        {#if !['hicontrast', 'locontrast'].includes(shade)}
          <div class="space-y-1.5">

            <clipboard-copy value={formatColor(color)} title="Copy {palette}-{shade} to clipboard">
              <div class="color-swatch h-10 w-full rounded ring-2 dark:ring-inset dark:ring-white/10 cursor-pointer hover:shadow-lg shadow-sm opacity-100 hover:opacity-75 transition-all duration-300 ease-in relative" style:--tw-ring-color={tcolor.getAlpha() < 1.0 ? tc(color).setAlpha(0.33).darken(10) : tc(color).darken(10)} style="background-color:{color};">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="checkmark text-grass-A900 opacity-0 transition-opacity w-6 h-6 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-300 ease-in-out"><path d="M5 13l4 4L19 7"></path></svg>
                <div class={"color-name w-full text-center font-medium font-mono opacity-100 transition-all duration-300 ease-in-out tracking-wide text-scale-200 text-2xs sm:text-xs md:text-sm pt-2.5 text-opacity-90 drop-shadow " + (alpha ? 'dark:text-[#ffffff]' : (tcolor.isDark() || tcolor.getAlpha() < 0.5) ? 'text-[#ffffff]' : `text-[${tc(color).setAlpha(0.5).darken(30)}]`)}>{formatColor(color).replace(/^[#]/g, '')}</div>
              </div>
            </clipboard-copy>
            <div class="px-0.5 md:flex md:justify-between md:space-x-2 3xl:space-x-0 3xl:block">
              <div class="text-scale-300 text-base font-mono dark:text-scale-800 uppercase">{shade}</div>
            </div>
          </div>
        {/if}
      {/each}
      </div>
    </div>
  </div>
{/each}
{/key}
</div>

<style>
  :global(.copied .checkmark) {
    opacity: 1;
    filter:drop-shadow(0 2px 8px #000);
  }
  :global(.copied .color-name) {
    opacity: 0;
  }
  :global(.copied .color-swatch) {
    background-color: #0006 !important;
  }
</style>