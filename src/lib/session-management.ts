import { db } from '$lib/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { randomBytes, hashData } from '$lib/crypto-util';

type SessionMeta = {
	authorId: string;
	authorDisplayName: string;
	authenticatedUserIds: string[];
	question: string;
	createdAt: number;
	seed: string;
	updatedAt: number;
	totpInterval: number;
};

const generateSeed = () => {
	const buffer = randomBytes(32);
	const seed = buffer.toString().replaceAll(',', '');
	return seed;
};

export const createNewSession = async (
	question: string,
	userId: string,
	authorDisplayName: string
) => {
	const sessionRef = collection(db, 'sessions');
	const currentTimeMillis = Date.now();
	const sessionData: SessionMeta = {
		authorId: userId,
		authorDisplayName,
		authenticatedUserIds: [],
		question,
		seed: generateSeed(),
		createdAt: currentTimeMillis,
		updatedAt: currentTimeMillis,
		totpInterval: 30
	};
	const newSession = await addDoc(sessionRef, sessionData);
	return newSession.id;
};

export const generatePasscode = async (
	seed: string,
	timeDifference: number,
	secondInterval: number
): Promise<string> => {
	// Create a SHA-256 hash of the seed and counter
	const interval = secondInterval * 1000;

	const hashedSeed = await hashData(seed + Math.floor(timeDifference / interval));

	// Convert the hashed seed to a numeric value
	const numericHashedSeed = parseInt(hashedSeed, 16);

	// Generate a 6-digit passcode
	const passcode = numericHashedSeed % 1000000;

	// Return the passcode as a string, padded with zeros if necessary
	return passcode.toString().padStart(6, '0');
};

type ResponseMeta = {
	authorId: string;
	displayName: string;
	response: string;
	createdAt: number;
	updatedAt: number;
};

export const submitResponse = async (
	userId: string,
	sessionId: string,
	response: string,
	displayName: string,
	responseId?: string
) => {
	const currentTime: number = Date.now();
	const responsesRef = collection(db, 'sessions', sessionId, 'responses');
	const responseMeta: ResponseMeta = {
		authorId: userId,
		displayName,
		response,
		createdAt: currentTime,
		updatedAt: currentTime
	};
	let fbError = '';
	let docId = null;
	if (responseId) {
		const docRef = doc(responsesRef, responseId);
		await setDoc(docRef, responseMeta).catch((error) => {
			fbError = error;
		});
	} else {
		const response = await addDoc(responsesRef, responseMeta).catch((error) => {
			fbError = error;
		});
		docId = response?.id;
	}

	return { responseId: docId ?? responseId, error: fbError };
};

// export const getAuthUrl = (passcode: string, sessionId: string) => {
//     const authBaseUrl = import.meta.env.VITE_SESSION_AUTH_BASE_URL;
//     const authPath = import.meta.env.VITE_SESSION_AUTH_PATH;

//     return `${authBaseUrl}/${authPath}?sessionId=${sessionId}&passcode=${passcode}`;
// };
