<script context="module">
  import { writable as localstore } from '@svelterun/store';
  import { slide } from 'svelte/transition';
  import swatches from '~/swatches.json';
  import SvgIcon from './SvgIcon.svelte';
  const colors = [
    ...new Set(
      Object.keys(swatches.light)
        .concat(Object.keys(swatches.dark))
        .concat(Object.keys(swatches.lightAlpha))
        .concat(Object.keys(swatches.darkAlpha))
        .map(c => c.trim().toLowerCase())
    ),
  ];
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

<div hidden class="hidden text-opacity-60 hover:text-opacity-80" />
<div
  transition:slide={{ duration: 500, delay: 100 }}
  class="py-2 grid grid-cols-12 gap-x-8 max-w-[calc(100vw)-3rem]"
>
  <div class="col-span-10 w-full">
    {#if $panelOpen}
      <div
        class="flex gap-4 place-content-center content-center place-items-stretch flex-wrap"
        transition:slide={{ duration: 500, delay: 100 }}
      >
        {#key colors}
          {#each colors as value, key (key)}
            <label
              class="flex gap-x-2 align-center cursor-pointer shadow-sm hover:shadow-md content-center text-sm px-3.5 py-1 rounded-full transition-all duration-300 ease-in select-none opacity-80 hover:opacity-100  {$enabledColors.includes(
                value
              )
                ? `bg-${value}-900 text-slate-200`
                : 'bg-slate-800/75 hover:bg-slate-800 text-opacity-60 hover:text-opacity-80'}"
              for={`toggle-${value}-${key}`}
            >
              <input
                type="checkbox"
                id={`toggle-${value}-${key}`}
                bind:group={$enabledColors}
                name="enabledColors"
                {value}
                {key}
                hidden
              />
              <span
                class="font-semibold cursor-pointer"
                class:line-through={!$enabledColors.includes(value)}>{value}</span
              >
            </label>
          {/each}
        {/key}
      </div>
    {/if}
  </div>
  <div class="relative content-end place-self-end text-right">
    <button
      hidden
      class="visible absolute top-1 right-1 text-base font-medium rounded-full bg-cyan-900 hover:bg-cyan-800 transition-all duration-300 ease-in text-white py-3 px-3.5 text-center cursor-pointer dark:highlight-mint-1000/20 flex gap-x-3 mx-auto shadow-md ring-2 ring-inset ring-teal-1000"
      on:click={() => panelOpen.update(v => !v)}
    >
      <SvgIcon id="adjustments" class="w-8 h-8 relative -bottom-px inline drop-shadow" />
      <span class="text-xl tracking-tighter lowercase drop-shadow-sm hidden" />
    </button>
  </div>
</div>
