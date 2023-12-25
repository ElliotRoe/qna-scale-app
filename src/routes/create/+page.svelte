<script>
	import { Button } from "$lib/components/ui/button";
	import Separator from "$lib/components/ui/separator/separator.svelte";
    import AspectRatio from "$lib/components/ui/aspect-ratio/aspect-ratio.svelte";

    // @ts-ignore
    import Play from '~icons/mynaui/play'
    // @ts-ignore
    import Edit from '~icons/mynaui/edit'
    // @ts-ignore
    import Activtiy from '~icons/mynaui/activity'
	import Input from "$lib/components/ui/input/input.svelte";
	import { ActivityCard } from "$lib/components/activity-card";
	import { setMenu } from "$lib/stores/menu-store";
	import { onMount } from "svelte";
	import SessionCard from "$lib/components/session-card/session-card.svelte";

    onMount(() => {
        setMenu('None'); // Set the menu to 'Home' when the component is mounted
        setInterval(() => {
        randomSessionPass = generateRandomSessionPass();
    }, 5000);
  });

  let randomSessionPass = generateRandomSessionPass();

    function generateRandomSessionPass() {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    
</script>

<section class="flex flex-col justify-center items-start h-screen max-w-app w-full">
        <div class="flex flex-row justify-between items-center w-full my-10">
            <h1 class="text-6xl font-medium">QNA Session</h1>
            <div class="space-x-2">
                <Button class="rounded-full" variant="outline"><Edit class="w-full h-full mr-1"/> EDIT</Button>
                <Button class="rounded-full" variant="outline"><Activtiy class="w-full h-full mr-1"/> RESPONSES</Button>
                <Button class="rounded-full shadow-md"><Play class="w-full h-full"/> START</Button>
            </div>
        </div>
        <div class="flex flex-col w-full grow space-y-10">
            <SessionCard sessionPass={randomSessionPass} domain={"QNA.com"}/>
            <div class="w-full flex flex-col justify-center items-start border rounded-xl overflow-hidden p-5">
                <div class="flex flex-row items-center space-x-1">
                    <div class="w-2 h-2 rounded-full bg-primary"/>
                    <p class="font-bold text-sm">Not Live</p>
                </div>
                <ActivityCard/>
            </div>
            
        </div>
</section>
