import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link, Switch, Route} from "react-router-dom";
import Lecturers from "./lecturers/Lecturers";

const App: React.FC = () => {
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-warning px-2">
                <Link to="/" className="navbar-light"><img src={logo} alt={`Educato`} width={50}/></Link>
                <div id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link fw-bold fs-3">Lecturers</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div>
                <Switch>
                    <Route path="/" component={Lecturers}/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
