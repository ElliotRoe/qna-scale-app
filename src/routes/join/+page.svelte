<script lang="ts">
    import { httpsCallable } from "firebase/functions";
    import { auth, functions, microsoftAuthProvider, user } from "$lib/firebase";

    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    // @ts-ignore
    import Spinner from '~icons/mynaui/spinner'
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { signInAnonymously, signInWithRedirect } from "firebase/auth";

    let passcode: string | null = $page.url.searchParams.get('passcode');
    let sessionId: string | null = $page.url.searchParams.get('sessionId');

    let loading = false;
    let errorMessage = "";

    const joinSession = async (passcode: string | null, sessionId: string | null) => {
        if (!sessionId || !passcode) {
            return;
        }
        loading = true;
        const authorizeUserId = httpsCallable(functions, "sessionAuth");
        await authorizeUserId({ passcode, sessionId }).catch((error) => {
            errorMessage = error.message;
        });
        loading = false;

        if (errorMessage) {
            return;
        }
        goto(`/respond?sessionId=${sessionId}`)
    }

    const updatePasscode = (event: any) => {
        passcode = event.target.value;
    }
    const updateSessionId = (event: any) => {
        sessionId = event.target.value;
    }

    onMount(async () => {
        if (!sessionId || !passcode) {
            return;
        }

        joinSession(passcode, sessionId);
    });

    const signInToMicrosoft = async () => {
        await signInWithRedirect(auth, microsoftAuthProvider);
    }

    const signInGuest = async () => {
        await signInAnonymously(auth);
    }
</script>

<section class="flex flex-col justify-start items-center h-screen max-w-app w-full pt-10 space-y-5">
    <h1 class="text-4xl font-medium">Join Session</h1>
    <Input class="w-fit rounded-xl" placeholder="Enter passcode..." value={passcode} on:change={updatePasscode}/>
    <Input class="w-fit rounded-xl" placeholder="Enter sessionId..." value={sessionId} on:change={updateSessionId}/>
    {#if $user}
    <Button class="rounded-full" disabled={loading} on:click={() => joinSession(passcode, sessionId)}>
        {#if loading}
            <Spinner class="w-6 h-6 animate-spin"/>
        {:else}
            JOIN
        {/if}
    </Button>
    {:else}
    <div class="flex flex-col space-y-2 items-center">
        <p class="text-slate-600 text-sm">Sign in to join</p>
            <div class="flex flex-row space-x-2 items-center justify-center">
                <Button on:click={signInToMicrosoft} class="w-full space-x-1" variant="default" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30">
                        <path fill="#FFF" d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 12 C 4 13.105 4.895 14 6 14 L 12 14 C 13.105 14 14 13.105 14 12 L 14 6 C 14 4.895 13.105 4 12 4 L 6 4 z M 18 4 C 16.895 4 16 4.895 16 6 L 16 12 C 16 13.105 16.895 14 18 14 L 24 14 C 25.105 14 26 13.105 26 12 L 26 6 C 26 4.895 25.105 4 24 4 L 18 4 z M 6 16 C 4.895 16 4 16.895 4 18 L 4 24 C 4 25.105 4.895 26 6 26 L 12 26 C 13.105 26 14 25.105 14 24 L 14 18 C 14 16.895 13.105 16 12 16 L 6 16 z M 18 16 C 16.895 16 16 16.895 16 18 L 16 24 C 16 25.105 16.895 26 18 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 18 C 26 16.895 25.105 16 24 16 L 18 16 z"></path>
                    </svg>
                    <p>Microsoft</p>
                </Button>
                <p class="text-sm text-slate-600">OR</p>
                <Button variant="outline" on:click={signInGuest}>Guest</Button>
            </div>
        </div>
    {/if}
    <p class="text-sm text-red-700">{errorMessage}</p>
</section>
