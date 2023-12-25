import { db } from '$lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { randomBytes } from 'crypto';

type SessionMeta = {
	authorId: string;
	authorDisplayName: string;
	authenticatedUserIds: string[];
	question: string;
	createdAt: Date;
	seed: number;
	updatedAt: Date;
};

const generateSeed = () => {
	const buffer = randomBytes(6);
	const number = parseInt(buffer.toString('hex'), 16);
	return number;
};

export const createNewSession = async (
	question: string,
	userId: string,
	authorDisplayName: string
) => {
	const sessionRef = doc(db, 'sessions');
	const sessionData: SessionMeta = {
		authorId: userId,
		authorDisplayName,
		authenticatedUserIds: [],
		question,
		seed: generateSeed(),
		createdAt: new Date(),
		updatedAt: new Date()
	};
	await setDoc(sessionRef, sessionData);
};

type ResponseMeta = {
	submittedBy: string;
	displayName: string;
	response: string;
	createdAt: Date;
	updatedAt: Date;
};

export const submitResponse = async (
	userId: string,
	sessionId: string,
	response: string,
	displayName: string
) => {
	const responsesRef = doc(db, 'sessions', sessionId, 'responses');
	const responseMeta: ResponseMeta = {
		submittedBy: userId,
		displayName,
		response,
		createdAt: new Date(),
		updatedAt: new Date()
	};
	await setDoc(responsesRef, responseMeta);
};
