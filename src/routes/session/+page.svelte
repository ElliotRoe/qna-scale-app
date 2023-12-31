<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { db } from "$lib/firebase";
    import { doc, getDoc } from "firebase/firestore";
    import {page} from '$app/stores';
	import { onMount } from "svelte";
	import { generatePasscode } from "$lib/session-management";
    import { sessionId } from '$lib/stores/session-store';
    
    // @ts-ignore
    import Activtiy from '~icons/mynaui/activity'
    // @ts-ignore
    import Edit from '~icons/mynaui/edit'
    
    import * as Tabs from "$lib/components/ui/tabs";
    import SessionInfoTab from "./session-info-tab.svelte";
	import SessionResponsesTab from "./session-responses-tab.svelte";
    
    let sessionPasscode = "";
    let discussionQuestion = ""

    onMount(async () => {
        $sessionId = $page.url.searchParams.get('sessionId');

        if (!$sessionId) {
            return;
        }

        const sessionRef = doc(db, "sessions", $sessionId);
        const session = await getDoc(sessionRef);
        const sessionSeed = session?.data()?.seed;
        const createdAt = session?.data()?.createdAt as number;
        discussionQuestion = session?.data()?.question;
        const secondInterval = 30;

        const iteratePasscode = async () => {
            const difference = Date.now() - createdAt;
            sessionPasscode = await generatePasscode(sessionSeed, difference, secondInterval);
        }

        iteratePasscode();

        setInterval(async () => {
            iteratePasscode();
        }, 1000);

    });

    type Tab = "info" | "responses";

    let tab: Tab = "info"
    
    const onResponseClick = () => {
        tab = "responses";
    };

    const onSessionClick = () => {
        tab = "info";
    };

</script>

<section class="flex flex-col justify-start items-start h-screen max-w-app w-full">
    <div class="flex flex-row justify-between items-center w-full my-10 grow-none">
        <h1 class="text-6xl font-medium">QNA Session</h1>
        <div class="space-x-2 flex flex-row">
            <Button class="rounded-full" variant="outline" on:click={onSessionClick}><Edit class="w-full h-full mr-1"/> SESSION INFO</Button>
            <div class="flex flex-row"> 
                <Button class="rounded-full shadow-md" on:click={onResponseClick}>
                    <Activtiy class="w-full h-full mr-1"/>
                    <span>RESPONSES</span>
                </Button>
            </div>
        </div>
    </div>
    <Tabs.Root value={tab} class="w-full grow">
        <Tabs.Content value="info" class="w-full h-full">
            <SessionInfoTab sessionId={$sessionId} sessionPasscode={sessionPasscode} discussionQuestion={discussionQuestion}/>
        </Tabs.Content>
        <Tabs.Content value="responses" class="w-full h-full">
            <SessionResponsesTab/>
        </Tabs.Content>
    </Tabs.Root>
</section>
