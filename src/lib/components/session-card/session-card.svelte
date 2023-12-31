<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import { Skeleton } from "$lib/components/ui/skeleton";
    // @ts-ignore
    import Copy from '~icons/mynaui/copy'
    // @ts-ignore
    import CheckMark from '~icons/mynaui/check'
    import { toDataURL } from 'qrcode';

    let copied = false;
    export let sessionPass: string;
    export let sessionId: string | null;
    export let displayName: string;

    const joinURL = (passcode: string, sessionId: string) => {
        return `${window.location.origin}/join?sessionId=${sessionId}&passcode=${passcode}`;
    }

    let qrCodeDataURL = "";

    $: {
        if (sessionId && sessionPass) {
            toDataURL(joinURL(sessionPass, sessionId), { scale: 12, errorCorrectionLevel: 'H'}).then((dataUrl: string) => {
                qrCodeDataURL = dataUrl;
            });
        }
    }

    function copyToClipboard(text:string) {
        const elem = document.createElement('textarea');
        elem.value = text;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
    }
</script>
<div class="flex flex-row justify-between items-center space-x-5 h-[360px] p-5 border rounded-xl">
    <div class="flex flex-col justify-between items-start h-full grow">
        <div class="space-y-5">
            <div>
                <h4 class="text-xl font-medium text-slate-600">Go to</h4>
                <h1 class="text-6xl font-bold flex flex-row space-x-1">{`${displayName}'s Session`}</h1>
            </div>
            <div>
                <h4 class="text-xl font-medium text-slate-600 mb-2">Join with session code</h4>
                <h1 class="text-6xl font-bold flex flex-row space-x-1">
                    {#each sessionPass.split('') as char, index (index)}
                    <span class="border rounded-xl p-2 w-16 text-center shadow-md">{char}</span>
                    {/each}
                </h1>
            </div>
        </div>
        <Button variant="outline" disabled={!sessionId} class="flex flex-row space-x-2" on:click={()=>{
            if (sessionId === null) return;
            copied = true;
            copyToClipboard(joinURL(sessionPass, sessionId));
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
        {#if qrCodeDataURL}
        <div class="grow bg-contain bg-center bg-no-repeat qr-code shadow-md border rounded-xl"
            style="background-image: url('{qrCodeDataURL}');"
        />
        {:else}
        <Skeleton class="grow"/>
        {/if}
    </div>
</div>