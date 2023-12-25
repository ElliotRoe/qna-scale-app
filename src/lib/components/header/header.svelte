<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/stores';

	import { showMenu } from '$lib/stores/menu-store';
	import type { ApplicationMenu } from '$lib/stores/menu-store';

	import HomeMenu from './menus/home.svelte';

	export const homePath = '/';

	const menus: Record<ApplicationMenu, any> = {
		Home: HomeMenu,
		None: null
	};

	let selectedMenu = menus[$showMenu];
</script>

{#if $showMenu != 'None'}
	<header class="flex flex-col justify-center items-center w-full">
		<div class="flex flex-row justify-between w-full max-w-app py-4">
			<svelte:component this={selectedMenu} />
		</div>
		{#if $page.url.pathname != homePath}
			<Separator orientation="horizontal" class='w-full'/>
		{/if}
	</header>
{/if}

