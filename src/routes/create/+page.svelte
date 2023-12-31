<script lang="ts">
    import { ActivityCard } from "$lib/components/activity-card";
    import { Button } from "$lib/components/ui/button";
    import { createNewSession } from "$lib/session-management";
    import { auth } from "$lib/firebase";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let userId = ""

    onMount(async () => {
        const authUser = auth.currentUser;
        if (authUser) {
            userId = authUser.uid;
        } else {
            goto('/sign-up');
        }
    });

    let discussionQuestion = "";

    const onSubmit = async () => {
        const sessionId = await createNewSession(discussionQuestion, userId, "Dr. Elliot")
        goto(`/session?sessionId=${sessionId}`);
    };


    const onChange = (event: any) => {
        discussionQuestion = event.target.value;
    };

</script>

<section class="flex flex-col justify-center items-start h-screen max-w-app w-full">
    <h1 class="text-4xl font-medium">Create a new session</h1>
    <ActivityCard onChange={onChange}/>
    <Button class="rounded-full" on:click={onSubmit}>SUBMIT</Button>
</section>