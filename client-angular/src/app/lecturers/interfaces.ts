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

interface ServerData {
    languages: Array<Language>,
    lecturers: Array<Lecturer>,
}

export interface ServerResponse {
    status: string;
    data: ServerData;
}


