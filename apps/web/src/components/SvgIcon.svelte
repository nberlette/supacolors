<script>
  // our component's external props
  let width = '24',
    height = '24';
  export { width, height };

  export let id = 'github';

  let className = '';
  export { className as class };

  // internal props for the rendered svg
  let props = {
    'xmlns': 'http://www.w3.org/2000/svg',
    'fill': 'none',
    'viewBox': '0 0 24 24',
    'stroke': 'currentColor',
    'stroke-width': '1.66',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'shape-rendering': 'geometricPrecision',
    'role': 'img',
    // any other props passed to the <SvgIcon /> component will be parsed
    // through $$restProps, and added to the root <svg> element. by placing
    // this spread operator at the *end* of the object, we can override any
    // of the default props defined above (if needed)
    ...$$restProps,
  };

  // path map: maps different icon names to their corresponding path(s),
  // allowing us to use one component for multiple icons.
  const paths = {
    github:
      'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
    supabase: 'M13 10V3L4 14h7v7l9-11h-7z',
  };
  const d = paths[id] ?? null;
</script>

<svg {width} {height} class={className} {...props}>
  {#if id.toLowerCase() in paths}
    <path d={paths[id.toLowerCase()]} />
  {:else}
    <use href="/icons.svg#i-{id.toLowerCase().replace(/^i-/i, '')}" />
  {/if}
</svg>
