// menuStore.js
import { writable } from 'svelte/store';

export const sessionId = writable<string | null>('');

export type Response = {
	id: string;
	text: string;
	name: string;
	category: string;
};

export const responsesData = writable<Response[]>([]);
export const topics = writable<string[]>([]);
