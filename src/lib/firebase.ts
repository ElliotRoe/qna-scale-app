// src/lib/firebase.js

import { initializeApp } from 'firebase/app';
import { OAuthProvider, getAuth, onIdTokenChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { readable, type Subscriber } from 'svelte/store';

// Your SvelteKit app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const microsoftAuthProvider = new OAuthProvider('microsoft.com');
export const db = getFirestore(app);
export const functions = getFunctions(app);

interface UserRec {
	displayName: string | null;
	photoURL: string | null;
	uid: string | null;
	email: string | null;
}

export const user = readable<UserRec | null>(undefined, (set: Subscriber<UserRec | null>) =>
	onIdTokenChanged(auth, (u: User | null) => set(u))
);
