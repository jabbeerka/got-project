import React from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field}  from '../../charDetails';
import APIrequest from '../../API/Api';
import RowBlock from '../../rowBlock/rowBlock';

export default class CharacterPage extends React.Component {
    APIrequest = new APIrequest()
    state = {
        selectedChar: 130,
        error: false
    }

    onSelectedChar = (id) => {
        this.setState({
            selectedChar: id
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
                onSelectedItem={this.onSelectedChar}
                getData={this.APIrequest.getAllCharacters}
                renderItems={({ name, gender }) => `${name} (${gender})`} />
        )
        const charDetails = (
        <ItemDetails itemId={this.state.selectedChar} getData={this.APIrequest.getCharacter}>
            <Field label="Gender" field="gender" />
            <Field label="Born" field="born" />
            <Field label="Died" field="died" />
            <Field label="Culture" field="culture" />
        </ItemDetails>)
        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}