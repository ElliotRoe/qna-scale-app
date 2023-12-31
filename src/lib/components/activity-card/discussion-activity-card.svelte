<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    // @ts-ignore
    import ChatMessages from '~icons/mynaui/chat-messages'
    // @ts-ignore
    import Save from '~icons/mynaui/save'

    export let onChange: (event: any) => void;

    const onInputChange = (event: any) => {
        onChange(event);
    }
</script>

<div class="flex flex-col space-y-2 w-full">
    <div class="flex flex-row space-x-2 w-full items-center justify-center">
        <ChatMessages class="w-8 h-8"/>
        <Input class="rounded-none rounded-t-lg border-0 border-b-2 border-border text-2xl" placeholder="Discussion question..." on:change={onInputChange}/>
    </div>
</div>