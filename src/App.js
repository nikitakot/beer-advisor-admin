import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'

import './App.css';
import {auth } from './firebase/firebase';
//components
import BeerPage from './components/BeerPage';
import EditBar from './components/EditBar';
import Navigation from './components/Navigation';
import SignInPage from './components/SignIn';
import * as routes from './constants/routes';

import {BEER_API, GET_ADMIN} from "./constants/constants";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                const url = BEER_API + GET_ADMIN;
                auth.currentUser.getIdToken(true)
                    .then(token =>
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                Authorization: `Bearer ${token}`
                            }
                        })).then((resp) => resp.json().then((data) => {
                        const isAdmin = data.isAdmin;
                        if (authUser && isAdmin) {
                            this.setState(() => ({authUser}))
                        } else {
                            this.setState(() => ({authUser: null,}));
                            alert("You are not authorized")
                        }
                    })
                ).catch(error => {
                    alert();
                    console.log(error);
                });
            } else {
                this.setState(() => ({authUser: null,}));
            }

        });
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser}/>
                    <hr/>
                    <Route exact path={routes.SIGN_IN} component={() => <SignInPage/>}/>
                    {this.state.authUser &&
                    <div>
                        <Route exact path={routes.HOME} component={() => <BeerPage/>}/>
                        <Route exact path={routes.EDIT_BAR} component={() => <EditBar/>}/>
                    </div>
                    }
                </div>
            </Router>
        );
    }
}

export default App;
