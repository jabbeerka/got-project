import React from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import APIrequest from '../../API/Api';
import RowBlock from '../../rowBlock/rowBlock';

export default class BooksPage extends React.Component {
    APIrequest = new APIrequest()
    state = {
        selectedBook: 7,
        error: false
    }

    onSelectedBook = (id) => {
        this.setState({
            selectedBook: id
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
                onSelectedItem={this.onSelectedBook}
                getData={this.APIrequest.getAllBooks}
                renderItems={({ name, publisher }) => `${name} (${publisher})`} />
        )
        const charDetails = (
            <ItemDetails itemId={this.state.selectedBook} getData={this.APIrequest.getBook}>
                <Field label="Authors" field="author" />
                <Field label="Publisher" field="publisher" />
                <Field label="Pages count" field="numberOfPages" />
                <Field label="Released" field="released" />
            </ItemDetails>)
        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}