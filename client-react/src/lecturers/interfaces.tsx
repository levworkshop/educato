export interface BaseObj {
    id: number;
    name: string;
}

export interface Lecturer extends BaseObj{
    email: string;
    languages: Array<number>;
}

export interface Language extends BaseObj{
    courseCode: string;
}

export interface Props {}

export interface State {
    lecturers: Array<Lecturer>;
    languages: Array<Language>;
    filter: Array<Lecturer>;
    languageMap: Map<number,Language>
}

export interface ServerResponse {
    status: string;
    data: State;
}


