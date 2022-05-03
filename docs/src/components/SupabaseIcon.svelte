<script>
  export let width = 24,
    height = 24;
  let xmlns = 'http://www.w3.org/2000/svg',
    fill = 'none',
    viewBox = '0 0 24 24',
    stroke = '#40bf86';
</script>

<svg
  {xmlns}
  {viewBox}
  {fill}
  {stroke}
  {width}
  {height}
  shape-rendering="geometricPrecision"
  {...$$restProps}
>
  <path
    stroke-linecap="butt"
    stroke-linejoin="miter"
    stroke-width="1.75"
    filter="drop-shadow(0 2px 1px #0004)"
    d="M13 10V3L4 14h7v7l9-11h-7z"
  />
</svg>
