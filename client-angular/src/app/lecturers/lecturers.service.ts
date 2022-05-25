import { Injectable } from '@angular/core';
import { BaseObj, Language, Lecturer, ServerResponse } from "./interfaces";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class LecturersService {

    constructor(private httpClient: HttpClient) {
    }

    private static sortList <T extends BaseObj>(list: Array<T>): Array<T> {
        return list.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    }

    fetchLecturers(): Observable<ServerResponse> {
        return this.httpClient.get<ServerResponse>('http://localhost:3001/lecturers').pipe(
            tap((res: ServerResponse) => {
                if (res) {
                    LecturersService.sortList<Lecturer>(res.data.lecturers);
                    LecturersService.sortList<Language>(res.data.languages);
                }
            })
        );
    }

}
