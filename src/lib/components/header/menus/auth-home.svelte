<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { signOut } from "firebase/auth";
	import { auth } from "$lib/firebase";


    export let homePath = '/';

    type MenuItem = {
		name: string;
		path: string;
		variant: 'default' | 'ghost';
		onclick?: () => void;
	};

	const menuItems: MenuItem[] = [
		{
			name: 'Sign out',
			path: '/',
			variant: 'ghost',
			onclick: () => {
				signOut(auth)
				window.location.reload();
			},
		},
		{
			name: 'New Session',
			path: '/create',
			variant: 'default'
		}
	]
</script>

<a href={homePath}>
    <h4 class="font-bold text-5xl">QNA</h4>
</a>
<div class="flex flex-row space-x-2">
    {#each menuItems as item (item)}
        <a href={item.path}>
            <Button on:click={item.onclick} variant={item.variant}>{item.name}</Button>
        </a>
    {/each}
</div>