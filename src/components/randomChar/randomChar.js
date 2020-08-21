import React, { Component } from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import APIrequest from '../API/Api';
import ErrorMessage from '../error/error';
import Spinner from '../spinner/spinner'


const RandomCharWrap = styled.div`
        min-height: 310px;
        background-color: rgb(68, 56, 60);
        margin: 25px 0;
        padding-top: 20px;
        border-radius: 15px
`
const RandomCharTitle = styled.h4`
        margin-bottom: 20px;
        text-align: center;
        color: white;
`

export default class RandomChar extends Component {
    APIrequest = new APIrequest();
    state = {
        char: {},
        loading: true,
        error: false
    }
    componentDidMount() {
        this.setChar();
        this.timerId = setInterval(this.setChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onCharLoader = (char) => {
        this.setState({ char });
        this.setState({ loading: false });
    }
    errorMessage = () => {
        this.setState({ 
            error: true,
            loading: false
        });
    }
    setChar = () => {
        const id = Math.floor(Math.random()*250 + 35);
        this.APIrequest.getCharacter(id)
            .then(this.onCharLoader)
            .catch(this.errorMessage)
    }
    render() {
        const { char, loading, error } = this.state;
        const someError = error ? <ErrorMessage /> : null
        const content = !(error || loading) ? <Character char={char}/> : null
        const spinner = loading ? <Spinner/> : null
        return (
            <RandomCharWrap>
                {spinner}
                {content}
                {someError}
            </RandomCharWrap>
        );
    }
}

const Character = ({char}) => {
    const { name, gender, born, died, culture } = char
    return (
        <>
            <RandomCharTitle>Random Character: {name} </RandomCharTitle>
            <Table dark>
                <thead>
                    <tr>
                        <th>Gender</th>
                        <th> {gender} </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Born</td>
                        <td> {born} </td>
                    </tr>
                    <tr>
                        <td>Died</td>
                        <td> {died} </td>
                    </tr>
                    <tr>
                        <td>Culture</td>
                        <td> {culture} </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}  