export interface Date {
	day: number;
}

export interface Screening {
	id: string;
	title: string;
	time: string;
	date: Date;
}

export interface Links {
	trailer: string;
	info: string;
}
export interface ScreeningFull {
	id: string;
	title: string;
	director: string;
	time: string;
	links: Links;
	poster: string;
	description: string;
	date: Date;
	location: string;
	isDoubleFeature: boolean;
}
