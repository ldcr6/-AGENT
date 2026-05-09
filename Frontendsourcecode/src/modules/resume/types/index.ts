export interface Resume {
	id: number;
	name: string;
	position: string;
	intro: string;
	createdAt: string;
}

export interface ResumeFile {
	uid: string;
	name: string;
	status: string;
	url?: string;
	createdAt: string;
}
