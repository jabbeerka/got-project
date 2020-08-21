import React from 'react';
import styled from 'styled-components';
import errorImg from './error.jpg'

const Error = styled.span`
    display: block;
    font-size: 32px;
    color: pink;
    text-align: center;
    margin: 0 auto;
`
const Img = styled.img`
    display: block;
    width: 100%;
    margin: 0 auto
`

const ErrorMessage = () => {
    return (
        <>
        <Error>Some Error</Error>
        <Img src={errorImg} alt="error"/>
        </>
    )
}

export default ErrorMessage;