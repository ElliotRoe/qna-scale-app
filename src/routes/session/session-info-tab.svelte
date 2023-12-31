<script lang="ts">
	import { SessionCard } from "$lib/components/session-card";

    // @ts-ignore
    import ChatMessages from '~icons/mynaui/chat-messages'

    export let sessionPasscode: string | null;
    export let sessionId: string | null;
    export let discussionQuestion: string | null;

</script>

<div class="flex flex-col w-full grow space-y-10">
    <SessionCard sessionPass={sessionPasscode ?? ""} sessionId={sessionId} displayName={"Elliot"}/>
    <div class="w-full flex flex-col justify-center items-start border rounded-xl overflow-hidden p-5">
        <div class="flex flex-row items-center space-x-1">
            <div class="relative">
                <div class="w-2 h-2 rounded-full bg-primary bg-red-600 absolute animate-ping"/>
                <div class="w-2 h-2 rounded-full bg-primary bg-red-600"/>
            </div>
            <p class="font-black text-sm text-red-600">Live</p>
        </div>
        <div class="flex flex-row space-x-2 items-center">
            <ChatMessages class="w-6 h-6"/>
            <h4 class="text-2xl">{discussionQuestion}</h4>
        </div>
    </div>
</div>