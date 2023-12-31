<script>
	import { Button } from "$lib/components/ui/button";

	import { createNewSession } from "$lib/session-management";

</script>

<svelte:head>
	<title>Home</title>
	<meta name="QNA" content="Engage at scale" />
</svelte:head>

<section class="grow">
	<div class="flex flex-row justify-center items-center max-w-app">
		<div class="flex flex-col space-y-5 items-center mt-20">
			<h1 class="text-6xl font-bold font-soft text-center">Engage classrooms at scale</h1>
			<a href="create">
				<a href="/sign-up">
					<Button>Try Now</Button>
				</a>
			</a>
		</div>
		<!-- <div class="shadow-sm border rounded-xl p-10 py-20">
			<svg width="285" height="285" viewBox="0 0 285 285" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="285" height="285" fill="white"/>
				<path d="M48.5 87.5L143 32.5L238 87.5V198L143 252L48.5 198V87.5Z" stroke="#C351CD" stroke-width="11"/>
				<circle cx="142.5" cy="33.3152" r="17.6929" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				<circle cx="142.5" cy="250.685" r="17.6929" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				<circle cx="236.624" cy="87.6576" r="17.6929" transform="rotate(60 236.624 87.6576)" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				<circle cx="48.3762" cy="196.342" r="17.6929" transform="rotate(60 48.3762 196.342)" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				<circle cx="236.624" cy="196.342" r="17.6929" transform="rotate(120 236.624 196.342)" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				<circle cx="48.3761" cy="87.6576" r="17.6929" transform="rotate(120 48.3761 87.6576)" fill="white" stroke="#C351CD" stroke-width="13.4803"/>
				</svg>
		</div> -->
			
	</div>
</section>
