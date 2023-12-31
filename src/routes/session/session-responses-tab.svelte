<script lang="ts">
    // @ts-ignore
    import Sparkles from '~icons/mynaui/sparkles'
    // @ts-ignore
    import Chat from '~icons/mynaui/chat'
    // @ts-ignore
    import Lightning from '~icons/mynaui/lightning'
    // @ts-ignore
    import Spinner from '~icons/mynaui/spinner'
	import ResponseTable from '$lib/components/reponse-table/response-table.svelte';
    import * as Select from "$lib/components/ui/select";
	import { topicFilterValue } from '$lib/stores/filter-store';
	import Button from '$lib/components/ui/button/button.svelte';
    import { httpsCallable } from "firebase/functions";
    import { functions } from "$lib/firebase";
    import { responsesData, sessionId, topics } from '$lib/stores/session-store';

    function onChange(selected: any) {
        topicFilterValue.set(selected.value);
    }

    const getTopics = httpsCallable(functions, "responseProccess");

    type Topic = {
        topic: string;
        responses: string[];
    };

    let generateLoading = false;
    let error = ""
    let fullTopics = ["All", ...$topics];

    async function onGenerateClick() {
        generateLoading = true;
        error = "";
        const response = await getTopics({sessionId: $sessionId}).catch((error) => {
            error = error.message;
        })
        if (error) {
            generateLoading = false;
            return;
        }
        console.log(response);
        
        const responseTopics = response?.data as Topic[];
        $topics = responseTopics.map((topic) => topic.topic);
        fullTopics = ["All", ...$topics];

        $responsesData = [];
        let i = 0;
        responseTopics.forEach((topic) => {
            topic.responses.forEach((response) => {
                $responsesData = [...$responsesData, {category: topic.topic, text: response, name: "Anonymous", id: i.toString()}]
                i++;
            })
        })
        topicFilterValue.set("All");
        generateLoading = false;
    }

</script>
<div class="w-full h-full grid grid-cols-3 grid-rows-3 pb-10 gap-4 ">
    <div class="col-span-1 row-span-1 border rounded-xl p-5 space-y-2 flex flex-col">
        <div class="flex flex-row space-x-1 items-center grow-none">
            <Sparkles class="w-8 h-8 text-slate-600"/>
            <h3 class="text-2xl font-bold text-slate-600">Topics</h3>
        </div>
        <div class="flex flex-col grow justify-end space-y-2">
            <Select.Root onSelectedChange={onChange}>
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="All"/>
                </Select.Trigger>
                <Select.Content>
                    {#each fullTopics as topic}
                        <Select.Item value={topic} label={topic}>
                            {topic}
                        </Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
            <p class="text-sm text-red-600">{error}</p>
            <Button class="w-full" disabled={generateLoading} on:click={onGenerateClick}>
                {#if generateLoading}
                    <Spinner class="w-6 h-6 animate-spin"/>
                {:else}
                    {$topics.length == 0 ? "GENERATE TOPICS" : "REFRESH TOPICS"}
                {/if}
            </Button>
        </div>
    </div>
    <div class="row-span-3 col-span-2 border rounded-xl p-5 flex flex-col">
        <div class="flex flex-row space-x-1 items-center">
            <Chat class="w-8 h-8 text-slate-600"/>
            <h3 class="text-2xl font-bold text-slate-600">Responses</h3>
        </div>
        <ResponseTable/>
    </div>
    <div class="col-span-1 row-span-2 border rounded-xl p-5">
        <div class="flex flex-row space-x-1 items-center">
            <Lightning class="w-8 h-8 text-slate-600"/>
            <h3 class="text-2xl font-bold text-slate-600">Summary</h3>
        </div>
    </div>
</div>