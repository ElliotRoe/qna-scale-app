<script>
    import { Input } from "../ui/input";
    // @ts-ignore
    import ChatMessages from '~icons/mynaui/chat-messages'
</script>

<div class="flex flex-col space-y-2 w-full">
    <div class="flex flex-row space-x-2 w-full items-center justify-center">
        <ChatMessages class="w-8 h-8"/>
        <Input class="rounded-none rounded-t-lg border-0 border-b-2 border-border text-2xl" placeholder="Discussion question..." />
    </div>
</div>