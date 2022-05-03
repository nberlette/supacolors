<script context="module">
  import { writable as localstore } from '@svelterun/store';
  import { slide } from 'svelte/transition';
  import swatches from '~/swatches.json';
  import SvgIcon from "./SvgIcon.svelte";
  const colors = [...new Set(Object
    .keys(swatches.light)
      .concat(Object.keys(swatches.dark))
        .concat(Object.keys(swatches.lightAlpha))
          .concat(Object.keys(swatches.darkAlpha))
            .map(c => c.trim().toLowerCase())
    )];
  // const colorsSafelist = colors.map(clr =>
  //   Object.keys(swatches?.light?.[clr] ?? {}).map(key =>
  //     `bg-${clr}-${key}`
  //   )
  // ).flat(Infinity).join(' ');
  export const enabledColors = localstore('enabledColors', colors);
  export const panelOpen = localstore('panelOpen', false);
</script>

<script>
  $: if ($enabledColors.length === 0) {
    enabledColors.set(colors);
  }
</script>

<div transition:slide={{ duration: 500, delay: 100 }} class="px-4 py-2 grid grid-cols-12 gap-x-8">
  <div class="col-span-9 w-full min-h-[10rem]">
    {#if $panelOpen}
      <div class="flex gap-x-6 gap-y-4 place-items-center content-center justify-evenly flex-wrap" transition:slide={{ duration: 500, delay: 100 }}>
      {#key colors}
        {#each colors as value, key (key)}
          <label class={`flex gap-x-2 align-center content-center text-lg px-4 py-1.5 rounded-full ${$enabledColors.includes(value) ? `bg-${value}-800` : 'bg-slate-700'}`} for={`toggle-${value}-${key}`}>
            <input type="checkbox" id={`toggle-${value}-${key}`} bind:group={$enabledColors} name="enabledColors" {value} {key} hidden />
            <span class="font-semibold cursor-pointer" class:line-through={!$enabledColors.includes(value)}>{value}</span>
          </label>
        {/each}
      {/key}
      </div>
    {/if}
  </div>
  <div class="col-span-3 pl-6">
    <button class=" text-base font-medium rounded-full bg-cyan-900 hover:bg-cyan-800 transition-all duration-300 ease-in text-white py-3 text-center cursor-pointer dark:highlight-mint-1000/20 flex gap-x-3 my-8 px-6 shadow-md ring-2 ring-inset ring-teal-1000" on:click={() => panelOpen.update(v => !v)}>
      <SvgIcon id="adjustments" class="w-8 h-8 inline" />
      <span class="text-xl tracking-tighter lowercase drop-shadow-sm hidden md:inline-block pr-2">Palettes</span>
    </button>
  </div>
</div>