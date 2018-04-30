import React from 'react';
//styles
import "./AddBeerForm.css";

import "../constants/constants"
import "./DeleteBeerList.css";
import {BEER_API} from "../constants/constants";

const DELETE_BEER = '/delete-beer';
const GET_BEERS = '/get-beers'

class DeleteBeerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerListItems: '',
            beerList: [],
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

     renderList() {
        const url = BEER_API + GET_BEERS;
        fetch(url).then(
            (resp) => resp.json().then((data) => {
                this.setState({beerList: data.beerList});
                const beerListItems = this.state.beerList.map((beer) =>
                    <div className='list' key={beer.id}>{beer.name}
                        <button onClick={() => {
                            this.handleDelete(beer);
                        }}>Delete beer</button>
                    </div>);
                this.setState({beerListItems: beerListItems});
            })
        ).catch(error => {
            alert();
            console.log(error);
        });
    }

    componentWillMount() {
        this.renderList();
    }

    handleDelete(beer) {
        //TODO add authorization
       if (window.confirm (`Are you sure you want to delete ${beer.name}?`)) {
           const url = BEER_API + DELETE_BEER;
           fetch(url, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({beerId: beer.id})
           }).then(() => {
                   alert('A beer with name ' + beer.name
                       + ' and description ' + beer.description
                       + ' was deleted');
                   this.renderList();
               }
           ).catch(error => {
               alert("Delete failed");
               console.log(error);
           });
       }
    }

    render() {
        return (
            <div className="container">
                {this.state.beerListItems}
            </div>


        );
    }
}

export default DeleteBeerList;