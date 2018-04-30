import React from 'react';
import { auth } from '../firebase/firebase';
//styles
import "./AddBeerForm.css";
import {BEER_API} from "../constants/constants";

const ADD_BEER = '/add-beer';

class AddBeerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerName: '',
            beernamePlaceHolder: 'beer name',
            beerDescription: '',
            beerDescriptionPlaceHolder: 'beer description',
        };

        this.handleBeerNameChange = this.handleBeerNameChange.bind(this);
        this.handleBeerDescriptionChange = this.handleBeerDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBeerNameChange(event) {
        this.setState({beerName: event.target.value});
    }

    handleBeerDescriptionChange(event) {
        this.setState({beerDescription: event.target.value});
    }

    handleSubmit(event) {
        if (window.confirm("Are you sure you want to add this beer?")) {
            event.preventDefault();
            const beer = {
                name: this.state.beerName, description: this.state.beerDescription
            };
            const url = BEER_API + ADD_BEER;
            auth.currentUser.getIdToken(true)
                .then(token =>
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(beer)
            })).then((resp) => {
                if (resp.status !== 403) {
                    alert('A beer with name ' + beer.name
                        + 'and description ' + beer.description
                        + 'was submitted');
                    this.props.deleteListRender();
                } else {
                    alert('Unathorized access denied');
                }
                    this.setState({beerName: ''});
                    this.setState({beerDescription: ''});
                }
            ).catch(error => {
                alert("Fetch failed, try again later");
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Add a beer</h1>
                <form className="beer-form" onSubmit={this.handleSubmit}>
                    <input required type="text" value={this.state.beerName} placeholder={this.state.beernamePlaceHolder}
                           onChange={this.handleBeerNameChange}/>
                    <textarea required value={this.state.beerDescription}
                              placeholder={this.state.beerDescriptionPlaceHolder}
                              onChange={this.handleBeerDescriptionChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>


        );
    }
}

export default AddBeerForm;