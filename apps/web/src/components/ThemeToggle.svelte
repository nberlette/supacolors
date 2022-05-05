<script>
  import { writable as localstore } from '@svelterun/store';
  import SvgIcon from './SvgIcon.svelte';

  const theme = localstore('theme', 'dark');
</script>

<SvgIcon
  id={$theme === 'dark' ? 'sun' : 'moon'}
  class={`w-7 h-7 transition-colors duration-500 ease-in ${
    $theme === 'dark' ? 'text-cyan-1000' : 'text-amber-A1000'
  }`}
  on:click={() => theme.update(t => (t === 'dark' ? 'light' : 'dark'))}
/>
