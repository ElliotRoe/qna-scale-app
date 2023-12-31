// menuStore.js
import { writable } from 'svelte/store';

export const topicFilterValue = writable<string>('light');
