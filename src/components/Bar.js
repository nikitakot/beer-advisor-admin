import React from 'react';
import { auth } from '../firebase/firebase';
//css
import './Bar.css';

import { BEER_API } from '../constants/constants';

const ACCEPT_CHANGES = '/apply-bar-changes';
const DELETE_BAR = '/delete-bar';

class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            hasChanges: false,
        };
    }

    componentWillMount() {
        if (this.props.barChanges && Object.keys(this.props.barChanges).length !== 0) {
            this.setState({ hasChanges: !this.state.hasChanges });
        }
    }

    renderChanges(changes) {
        const changesArr = [];
        changesArr.push(
            <tr key="a">
                <td>Name</td>
                <td>Adress</td>
                <td>Opening time</td>
                <td>Closing time</td>
                <td>Phone number</td>
            </tr>);

        for (const prop in changes) {
            changesArr.push(
                <tr key={prop}>
                    <td>{changes[prop].name}</td>
                    <td>{changes[prop].address}</td>
                    {changes[prop].openTimeH ? <td>{changes[prop].openTimeH}:{changes[prop].openTimeM}</td> : <td></td>}
                    {changes[prop].closeTimeH ? <td>{changes[prop].closeTimeH}:{changes[prop].closeTimeM}</td> :
                        <td></td>}
                    <td>{changes[prop].phone}</td>
                    <button onClick={() => this.accept(this.props.bar.id, prop)}>Accept</button>
                </tr>)
        }
        return changesArr;
    }

    delete(barId) {
        //TODO add authorization
        const url = BEER_API + DELETE_BAR;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ barId })
        }).then(() => {
                alert(`Bar with id ${barId} was deleted`);
            }
        ).catch(error => {
            alert('Delete failed, try again later');
            console.log(error);
        });
    }

    accept(barId, changesId) {
        //TODO add authorization
        const url = BEER_API + ACCEPT_CHANGES;
        return auth.currentUser.getIdToken(true)
            .then(token =>
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        barId,
                        changesId
                    })
                }).then(() => {
                        alert('Changes were accepted');
                    }
                ).catch(error => {
                    alert('Fetch failed, try again later');
                    console.log(error);
                })
            );
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    render() {
        return (
            <div>
                <div className="containerHeader">
                    <h4 className={this.state.hasChanges ? 'rowHighlitghted' : ''}>{this.props.bar.name}</h4>
                    <button onClick={this.toggle}>
                        View suggestion
                    </button>
                    <button onClick={() => this.delete(this.props.bar.id)}>Delete</button>
                </div>
                <table>
                    <tbody>
                    {this.state.collapse ? this.renderChanges(this.props.barChanges) : <tr />}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Bar;
