<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
	import { cn } from "$lib/utils";
    import { auth, microsoftAuthProvider } from '$lib/firebase';
	import { getRedirectResult, signInWithRedirect } from "firebase/auth";
    import { createNewSession } from "$lib/session-management";

    import {goto} from '$app/navigation';
	import { onMount } from "svelte";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

    const signInToMicrosoft = async () => {
        await signInWithRedirect(auth, microsoftAuthProvider);
    }

    onMount(async () => {
        const authUser = auth.currentUser;
        let userId: string | null = null;
        if (authUser) {
            userId = authUser.uid;
        } else {
            const result = await getRedirectResult(auth);
            if (result?.user) {
                userId = result.user.uid;
            }
        }
        if (userId) {
            goto('/create');
        }
    });
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
    <Button on:click={signInToMicrosoft} class="w-full space-x-1" variant="outline" type="button" disabled={isLoading}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
            <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z M 6 16 C 4.895 16 4 16.895 4 18 L 4 24 C 4 25.105 4.895 26 6 26 L 12 26 C 13.105 26 14 25.105 14 24 L 14 18 C 14 16.895 13.105 16 12 16 L 6 16 z M 18 16 C 16.895 16 16 16.895 16 18 L 16 24 C 16 25.105 16.895 26 18 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 18 C 26 16.895 25.105 16 24 16 L 18 16 z"></path>
        </svg>
		<p>Microsoft</p>
	</Button>
</div>