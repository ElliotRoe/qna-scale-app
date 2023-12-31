<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/stores';

	import UnauthMenu from './menus/unauth-home.svelte';

	export const homePath = '/';
</script>

{#if $page.url.pathname == homePath}
<header class="flex flex-col justify-center items-center w-full">
	<div class="flex flex-row justify-between w-full max-w-app py-4">
		<UnauthMenu/>
	</div>
	<Separator orientation="horizontal" class='w-full'/>
</header>
{/if}

