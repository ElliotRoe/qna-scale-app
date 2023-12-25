<script lang="ts">
	import { Button } from "$lib/components/ui/button";


    export let homePath = '/';

    type MenuItem = {
		name: string;
		path: string;
		variant: 'default' | 'ghost';
	};

	const menuItems: MenuItem[] = [
		{
			name: 'Sign In',
			path: '/sign-in',
			variant: 'ghost'
		},
		{
			name: 'Sign Up',
			path: '/sign-up',
			variant: 'ghost'
		},
		{
			name: 'Try Now',
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
            <Button variant={item.variant}>{item.name}</Button>
        </a>
    {/each}
</div>