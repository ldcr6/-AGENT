import { ref } from 'vue';
import type { Resume, ResumeFile } from '../types';

export const resumes = ref<Resume[]>([]);
export const resumeFiles = ref<ResumeFile[]>([]);

export function addResume(resume: Resume) {
	resumes.value.push(resume);
}

export function removeResume(id: number) {
	resumes.value = resumes.value.filter(r => r.id !== id);
}

export function addResumeFile(file: ResumeFile) {
	resumeFiles.value.push(file);
}

export function removeResumeFile(uid: string) {
	resumeFiles.value = resumeFiles.value.filter(f => f.uid !== uid);
}
