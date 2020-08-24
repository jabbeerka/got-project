import React from 'react';
import ItemDetails, { Field } from '../../charDetails';
import APIrequest from '../../API/Api';



export default class HouseDetails extends React.Component {

    APIrequest = new APIrequest()

    render() {
        return (
            <ItemDetails itemId={this.props.itemId} getData={this.APIrequest.getHouse}>
                <Field label="Region" field="region" />
                <Field label="Words" field="words" />
                <Field label="Overlord" field="overlord" />
                <Field label="Titles" field="titles" />
            </ItemDetails>
        )

    }
}