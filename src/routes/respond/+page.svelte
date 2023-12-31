<script lang="ts">
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { auth, db } from "$lib/firebase";
	import { onMount } from "svelte";
    import { page } from "$app/stores";
	import { doc, getDoc } from "firebase/firestore";
	import { submitResponse } from "$lib/session-management";

    // @ts-ignore
    import Spinner from '~icons/mynaui/spinner'

    let discussionQuestion = "";

    let sessionId = $page.url.searchParams.get('sessionId');

    onMount(async () => {
        if (!sessionId) {
            return;
        }

        const sessionRef = doc(db, "sessions", sessionId);
        const session = await getDoc(sessionRef);
        discussionQuestion = session?.data()?.question;
    });

    let response = "";
    const onChange = (event: any) => {
        response = event.target.value;
    };

    let errorDisplay = "";
    let loading = false;
    let responseDocId: string | undefined;

    const onSubmit = async () => {
        errorDisplay = "";
        const currentUserId = auth.currentUser?.uid;
        if (!currentUserId || !sessionId) {
            return;
        }
        loading = true;
        const { responseId, error } = await submitResponse(currentUserId, sessionId, response, "Elliot", responseDocId);
        if (!error) {
            responseDocId = responseId;
        } else {
            errorDisplay = error;
        }
        loading = false;
    };
</script>

<section class="flex flex-col justify-start items-start h-screen max-w-app w-full pt-10 space-y-5">
    <h1 class="text-4xl font-medium">{discussionQuestion}</h1>
    <Textarea class="w-full h-[400px] rounded-xl" placeholder="Enter your question here..." on:change={onChange}/>
    <Button class="rounded-full" on:click={onSubmit}>
        {#if loading}
            <Spinner class="w-6 h-6 animate-spin"/>
        {:else}
            {#if responseDocId}
                <p>UPDATE</p>
            {:else}
                <p>SUBMIT</p>
            {/if}
        {/if}
    </Button>
    {#if errorDisplay}
        <p class="text-red-500">{errorDisplay}</p>
    {/if}
</section>
