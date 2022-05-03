<script>
  import { onDestroy } from 'svelte/internal';
  import tc from 'tinycolor2';
  import { enabledColors } from './Toggles.svelte';

  if (typeof window !== 'undefined') {
    import("@github/clipboard-copy-element");
  }

  export let colors = {};
  let alpha = null
    , paletteNames = []
    , body;

  /**
   * Format the color to either Hex8 (if alpha < 1.0), or Hex3/6 (if opaque).
   *
   * @param {string} color - the original color to format
   * @returns {string} - 3, 6, or 8-digit hexadecimal color
   */
  const toHex = (color) => {
    const tcolor = tc(color);
    return tcolor.toString((alpha || tcolor.getAlpha() < 1.0) ? 'hex8' : 'hex3');
  }

  /**
   * Attempts to format the color's label text to ensure it's readable on the swatch background.
   *
   * @see {@link WCAG2AA}
   * @param {string} color - the color palette swatch
   * @returns {string} - adjusted hexadecimal color for the swatch label css rule
   */
  const adjustLabelColor = (color) => {
    const tcolor = tc(color);
    return tcolor.getAlpha() < 0.3
      ? tc(color).setAlpha(1.0)
        : (tcolor.isDark() || tcolor.setAlpha(1.0).getBrightness() < 128)
          ? tcolor.brighten(40).toHex8String()
            : tc(color).darken(50).toHex8String();
  }

  /**
   * Adjust the color swatch's ring color (outline) depending on the alpha value and brightness level.
   * Ideally, the ring should be slightly darker than the swatch when it's a light color, or slightly
   * lighter than the swatch when it's a dark color.
   * @param {string} color - the color palette swatch
   * @returns {string} - adjusted hexadecimal color for the ring's color value
   */
  const adjustRingColor = (color) => {
    const tcolor = tc(color);
    return tcolor.getAlpha() < 1.0
      ? tcolor.setAlpha(0.33).lighten(10)
      : tc(color).saturate(10).darken(5);
  }

  const paletteKeyBlacklist = ['hicontrast', 'locontrast'];
  /**
   * Format the color palette into an array of `[key, value]` pairs (entries). Each key is a shade of the specified color (e.g. `100`, `400`, etc.), and the value is that shade's corresponding CSS color value.
   * @param {string} palette - name of the target color palette (e.g. `amber`, `cyan`, etc.)
   * @returns {Array<[string, string]>} - array of `[shade, color]` pairs/entries
   */
  const paletteEntries = (palette) => Object.entries(colors[palette])
    .filter(([k, v]) => !paletteKeyBlacklist.includes(k));

  /**
   * Returns an array of color shades for the specified palette.
   * @param {string} palette - name of the target color palette (e.g. `amber`, `cyan`, etc.)
   */
  const paletteKeys = (palette) => Object.keys(colors[palette])
    .filter(k => !paletteKeyBlacklist.includes(k));

  /**
   * Returns an array of color values for the specified palette.
   * @param {string} palette - name of the target color palette (e.g. `amber`, `cyan`, etc.)
   */
  const paletteValues = (palette) => Object.entries(colors[palette])
    .map(([k, v]) => !paletteKeyBlacklist.includes(k) && v)
    .filter(Boolean);

  /**
   * Ensure that our `paletteNames` array is always up to date with the currently enabled color palettes.
   * When the user toggles colors on / off, paletteNames will automatically update and re-render the lists.
  */
  $: paletteNames = Object.keys(colors).filter(color => ~$enabledColors.indexOf(color))


  /**
   * Event handler to signal the user the selected color was copied to the clipboard.
   * Extracted into a separate function to allow us to also remove the event listener
   * when the component is destroyed.
   * @param {ClipboardEvent} event - the clipboard-copy event
   */
  const handleCopy = function (event) {
    const button = event.target
    button.classList.toggle('copied', true)
    setTimeout(() => {
      button.classList.toggle('copied', false);
    }, 2500)
  }

  /**
   * Remove accumulated event listeners when we destroy/unmount our component.
   * Prevents vicious memory leaks (hopefully).
  */
  onDestroy(() => {
    body?.removeEventListener('clipboard-copy', handleCopy)
  });

</script>

<svelte:body bind:this={body} on:clipboard-copy={handleCopy} />

<div class="grid grid-cols-1 gap-14 my-10 w-full light">
{#key paletteNames}
  {#each paletteNames as palette, p (palette)}
    {@const paletteShades = paletteKeys(palette)}
    <div>
      <div class="flex flex-row justify-start space-y-3 sm:space-y-0 sm:space-x-4">
        <!-- <div class="w-16 h-full justify-around flex flex-col relative">
          <div class="h-full block text-sm font-semibold text-slate-200 dark:text-slate-1100 uppercase ">{palette}</div>
        </div> -->
        <div class="bg-gradient-to-t from-[#d7d2eadd] to-[#fbf2ffdf] px-6 py-5 w-full rounded-lg ring-1 ring-inset ring-offset-violet-1200/20 border border-violet-1200/90 shadow-lg hover:shadow-xl transition-all duration-300 ease-in">
          <div class="min-w-0 flex-auto grid grid-cols-6 xl:grid-cols-12 gap-x-4 gap-y-3 lg:gap-x-2 justify-items-stretch">
            {#each paletteEntries(palette) as [shade, color], c (c)}
              <div class="space-y-1.5">
                <clipboard-copy value={toHex(color)} title="{palette}-{shade} ({toHex(color)})">
                  <div class="color-swatch h-12 min-w-[48px] w-full rounded ring-2 dark:ring-inset dark:ring-white/10 cursor-pointer hover:shadow-lg shadow-md opacity-100 hover:!bg-[{tc(color).saturate(20).darken(10).toHex8String()}] transition-all duration-300 ease-in relative group" style:--tw-ring-color={adjustRingColor(color)} style="background-color:{color};">
                    <svg width="24" height="24" class="checkmark text-grass-A900 opacity-0 transition-opacity w-6 h-6 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] duration-300 ease-in-out"><use href="/icons.svg#i-check" /></svg>
                    <div class="color-name h-12 aspect-square text-center opacity-100 transition-all duration-300 ease-in-out drop-shadow text-scale-300 text-2xs md:text-xs font-mono font-medium tracking-tight uppercase overflow-hidden relative" style:color={adjustLabelColor(color)}><svg width="24" height="24" class="opacity-0 group-hover:opacity-100 transition-all duration-[400ms] ease-in cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style:color={adjustLabelColor(color)}><use href="/icons.svg#i-clipboard-list" /></svg></div>
                  </div>
                </clipboard-copy>
                <!-- <div class="px-0.5 md:flex md:justify-between md:space-x-2 3xl:space-x-0 3xl:block"></div> -->
              </div>
            {/each}
            <div class="col-span-6 xl:col-span-12 mt-2 flex items-center font-mono text-sm justify-between text-slate-700 w-full">
              <span class="flex-1">{palette}-{paletteShades[0]}</span>
              <svg width="47" height="4" viewBox="0 0 47 4" fill="currentColor" class="text-slate-300 dark:text-slate-900"><circle cx="1.5" cy="2" r="1.5" class="opacity-50"/><circle cx="12.5" cy="2" r="1.5" class="opacity-75"/><circle cx="23.5" cy="2" r="1.5" class="opacity-100"/><circle cx="34.5" cy="2" r="1.5" class="opacity-75"/><circle cx="45.5" cy="2" r="1.5" class="opacity-50"/></svg>
              <span class="flex-1 text-right">{palette}-{paletteShades[paletteShades.length - 1]}</span>
            </div>
          </div>
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
    background-color: #000b !important;
  }
</style>