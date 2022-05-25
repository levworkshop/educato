import { Component, OnInit } from '@angular/core';
import { Language, Lecturer } from "./interfaces";
import { LecturersService } from "./lecturers.service";

@Component({
    selector: 'app-lecturers',
    templateUrl: './lecturers.component.html',
})
export class LecturersComponent implements OnInit {

    lecturers: Array<Lecturer> = [];
    filteredList: Array<Lecturer> = [];
    languages: Array<Language> = [];
    languageMap = new Map<number, Language>();
    selectedLang: number = 0;

    constructor(private lecturersService: LecturersService) {
    }

    ngOnInit() {
        this.lecturersService.fetchLecturers().subscribe((res) => {
            const data = res.data;
            this.lecturers = data.lecturers;
            this.filteredList = data.lecturers;
            this.languages = data.languages;
            this.languageMap = new Map(data.languages.map(l => [l.id,l]));
        });
    }

    filterListByLanguage() {
        const selected = +this.selectedLang;
        if(selected === 0) {
            this.filteredList = this.lecturers;
            return;
        }

        this.filteredList = this.lecturers.filter(l => {
            const langs = l.languages.filter(i => i === selected);
            return langs.length > 0;
        });
    }

    hasLecturers(): boolean {
        return this.filteredList.length === 0;
    }

}
