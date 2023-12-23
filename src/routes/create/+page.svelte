<script>
	import { Button } from "$lib/components/ui/button";
	import Separator from "$lib/components/ui/separator/separator.svelte";
    import AspectRatio from "$lib/components/ui/aspect-ratio/aspect-ratio.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
	import { Checkbox } from "bits-ui";
    const sessionCode = "123456"
    // @ts-ignore
    import Copy from '~icons/mynaui/copy'
    // @ts-ignore
    import CheckMark from '~icons/mynaui/check'
    // @ts-ignore
    import Play from '~icons/mynaui/play'
    // @ts-ignore
    import Edit from '~icons/mynaui/edit'
    // @ts-ignore
    import Activtiy from '~icons/mynaui/activity'
	import Input from "$lib/components/ui/input/input.svelte";
	import { ActivityCard } from "$lib/components/activity-card";

    let copied = false;
</script>

<section>
	<div class="flex flex-col justify-center items-start h-screen">
        <div class="flex flex-row justify-between items-center w-full my-10">
            <h1 class="text-6xl font-medium">QNA Session</h1>
            <div class="space-x-2">
                <Button class="rounded-full" variant="outline"><Edit class="w-full h-full mr-1"/> EDIT</Button>
                <Button class="rounded-full" variant="outline"><Activtiy class="w-full h-full mr-1"/> RESPONSES</Button>
                <Button class="rounded-full shadow-md"><Play class="w-full h-full"/> START</Button>
            </div>
        </div>
        <div class="flex flex-col w-full grow space-y-10">
            <div class="flex flex-row justify-between items-center space-x-5 h-[360px] p-5 border rounded-xl">
                <div class="flex flex-col justify-between items-start h-full grow">
                    <div class="space-y-5">
                        <div>
                            <h4 class="text-xl font-medium text-slate-600">Go to</h4>
                            <h1 class="text-6xl font-bold flex flex-row space-x-1">QNA.com</h1>
                        </div>
                        <div>
                            <h4 class="text-xl font-medium text-slate-600 mb-2">Join with session code</h4>
                            <h1 class="text-6xl font-bold flex flex-row space-x-1">
                                {#each sessionCode.split('') as char (char)}
                                <span class="border rounded-xl p-2 w-16 text-center shadow-md">{char}</span>
                                {/each}
                            </h1>
                        </div>
                    </div>
                    <Button variant="outline" class="flex flex-row space-x-2" on:click={()=>{
                        copied = true;
                    }}>
                        {#if !copied}
                            <Copy/>
                            <p>Copy session info</p>
                        {:else}
                            <CheckMark/>
                            <p>Session info copied</p>
                        {/if}
                    </Button>
                </div>
                <div class="flex flex-col items-center justify-center space-y-4 h-full grow-0">
                    <Separator class="h-24" orientation="vertical"/>
                    <p class="text-slate-600">OR</p>
                    <Separator class="h-24" orientation="vertical"/>
                </div>
                <div class="h-full flex flex-col grow">
                    <h4 class="text-xl font-medium text-slate-600 mb-2 grow-0">Scan</h4>
                    <div class="grow bg-[url('/qr-code.png')] bg-contain bg-left bg-no-repeat"></div>
                </div>
            </div>
            <div class="w-full flex flex-col justify-center items-start border rounded-xl overflow-hidden p-5">
                <div class="flex flex-row items-center space-x-1">
                    <div class="w-2 h-2 rounded-full bg-primary"/>
                    <p class="font-bold text-sm">Not Live</p>
                </div>
                <ActivityCard/>
            </div>
            
        </div>
	</div>
</section>
