<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import UserAuthForm from "./user-auth-form.svelte";

    import {onMount} from 'svelte';

</script>
<div
	class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div
		class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
	>
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1544531585-f14f463149ec?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			🙋⚡️ Intellecture
		</div>
		<div class="relative z-20 mt-auto">
			<p class="text-lg">
				Start engaging. Start discussing. Start teaching.
			</p>
		</div>
	</div>
	<div class="lg:p-8">
		<div
			class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
		>
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Create an account
				</h1>
			</div>
			<UserAuthForm />
			<!-- <p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our{" "}
				<a
					href="/terms"
					class="underline underline-offset-4 hover:text-primary"
				>
					Terms of Service
				</a>{" "}
				and{" "}
				<a
					href="/privacy"
					class="underline underline-offset-4 hover:text-primary"
				>
					Privacy Policy
				</a>
				.
			</p> -->
		</div>
	</div>
</div>