import React from "react";
import { Language, Lecturer, BaseObj, Props, ServerResponse, State } from "./interfaces";


class Lecturers extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            lecturers: [],
            languages: [],
            filter: [],
            languageMap: new Map<number, Language>()
        };
    }

    sortList = <T extends BaseObj>(list: Array<T>): Array<T> => {
        return list.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    }


    filterListByLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const langId = +event.target.value;
        const lecturers = this.state.lecturers.filter(l => {
            const langs = l.languages.filter(i => i === langId);
            return langs.length > 0;
        });

        this.setState({
            ...this.state,
            filter: (langId === 0) ? this.state.lecturers : lecturers
        });
    }

    getList = () => {
        fetch('/lecturers')
            .then(res => res.json())
            .then((jsonRes:ServerResponse) => {
                this.setState({
                    lecturers: this.sortList<Lecturer>(jsonRes.data.lecturers),
                    languages: this.sortList<Language>(jsonRes.data.languages),
                    filter: jsonRes.data.lecturers,
                    languageMap: new Map(jsonRes.data.languages.map(l => [l.id,l]))
                });
            })
            .catch(error => console.log(error));
    };

    componentDidMount(): void {
        this.getList();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
                    <form className="d-flex align-items-center">
                        <label htmlFor="langList" className="form-label text-light mb-0 me-2">Language:</label>
                        <select className="form-select"
                                id="langList"
                                aria-label="List of languages"
                                onChange={(e) => this.filterListByLanguage(e)}>
                            <option value={0}>Any</option>
                            {
                                this.state.languages.map(lang => {
                                    return <option key={lang.id} value={lang.id}>{lang.name}</option>
                                })
                            }
                        </select>
                    </form>
                </nav>
                <div className="m-4">
                    {
                        this.state.filter.length === 0 ? (
                            <div className="text-center">No lecturers are available</div>
                        ) : (
                            this.state.filter.map(lecturer => {
                                return <div key={lecturer.id} className="card card-body mb-3">
                                    <h5 className="card-title">
                                        {lecturer.name}
                                    </h5>
                                    <p>{lecturer.email}</p>
                                    <p className="m-0">
                                        {
                                            lecturer.languages.map(lang => {
                                                return <span key={lang} className="badge bg-info text-dark me-1">
                                                {this.state.languageMap.get(lang)?.name}
                                            </span>
                                            })
                                        }
                                    </p>
                                </div>
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Lecturers;
