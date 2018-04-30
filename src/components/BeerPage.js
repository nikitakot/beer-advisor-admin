import React from 'react';
import AddBeerForm from "./AddBeerForm";
import DeleteBeerList from "./DeleteBeerList";

class BeerPage extends React.Component {
    renderDeleteList(){
        this.deleteBeerList.renderList();
    }

    render() {
        return (
        <div>
            <AddBeerForm deleteListRender={this.renderDeleteList.bind(this)}/>
            <DeleteBeerList ref={deleteBeerList => this.deleteBeerList = deleteBeerList}/>
        </div>
        )
    }
}

export default BeerPage;

