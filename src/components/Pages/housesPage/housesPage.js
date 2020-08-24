import React from 'react';
import ItemList from '../../itemList';
import APIrequest from '../../API/Api';
import { withRouter } from 'react-router-dom';

class HousesPage extends React.Component {
    APIrequest = new APIrequest()
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        return (
            <ItemList
                onSelectedItem={(id)=> {
                    this.props.history.push(id)
                }}
                getData={this.APIrequest.getAllHouses}
                renderItems={({ name }) => name} />
        )
    }
}

export default withRouter(HousesPage);