// 题目类型
export interface Question {
	id: number;
	title: string;
	options?: string[]; // 选择题/判断题选项
	type: 'single' | 'multiple' | 'text' | 'judge' | 'code'; // 题型
	answer?: string | string[] | boolean; // 正确答案
}

// 试卷结构
export interface ExamPaper {
  id: number;
  name: string;
  questions: Question[];
}

// 用户提交的答案类型
export interface UserAnswer {
	questionId: number;
	answer: string | string[];
}

// 用户答题记录
export interface UserQuestionRecord {
	id: number;
	questionId: number;
	userId: number;
	answer: string | string[];
	submitTime: string;
}
