import React from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field}  from '../../charDetails';
import APIrequest from '../../API/Api';
import RowBlock from '../../rowBlock/rowBlock';

export default class HousesPage extends React.Component {
    APIrequest = new APIrequest()
    state = {
        selectedHouse: 7,
        error: false
    }

    onSelectedHouse = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const itemList = (
            <ItemList
                onSelectedItem={this.onSelectedHouse}
                getData={this.APIrequest.getAllHouses}
                renderItems={({ name }) => name} />
        )
        const charDetails = (
        <ItemDetails itemId={this.state.selectedHouse} getData={this.APIrequest.getHouse}>
            <Field label="Region" field="region" />
            <Field label="Words" field="words" />
            <Field label="Overlord" field="overlord" />
            <Field label="Titles" field="titles" />
        </ItemDetails>)
        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}