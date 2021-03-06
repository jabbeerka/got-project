import React, { useState, useEffect } from 'react';
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

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { getCharacter } = new APIrequest();
    const setChars = () => {
        const id = Math.floor(Math.random() * 250 + 35);
        getCharacter(id)
            .then((data) => {
                setChar(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })
    }
    useEffect(() => {
        setChars();
        let timerId = setInterval(setChars, 1500);
        return () => {
            clearInterval(timerId);
        }
    }, [loading]);

    const someError = error ? <ErrorMessage /> : null
    const content = !(error || loading) ? <Character char={char} /> : null
    const spinner = loading ? <Spinner /> : null
    return (
        <RandomCharWrap>
            {spinner}
            {content}
            {someError}
        </RandomCharWrap>
    )
}

const Character = ({ char }) => {
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

export default RandomChar;