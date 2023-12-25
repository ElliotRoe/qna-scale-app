// menuStore.js
import { writable } from 'svelte/store';

export type ApplicationMenu = 'Home' | 'None';

export const showMenu = writable<ApplicationMenu>('Home');

export function setMenu(menu: ApplicationMenu) {
	showMenu.set(menu);
}
