import React from 'react';
import {BEER_API, GET_BARS} from "../constants/constants";
import Bar from "./Bar";

class EditBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barList: [],
            barListItems: '',
        };

    }

    componentWillMount() {
        const url = BEER_API + GET_BARS;
        fetch(url).then(
            (resp) => resp.json().then((data) => {
                this.setState({barList: data.barList});
                const barListItems = this.state.barList.map((bar) =>
                    <Bar key={bar.id} bar={bar} barChanges={bar.changes}/>);
                this.setState({barListItems: barListItems});
            })
        ).catch(error => {
            alert();
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Suggestions to edit bar</h1>
                {this.state.barListItems}
            </div>
        )
    }
}

export default EditBar;