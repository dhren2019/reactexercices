import React from 'react'
import { css } from '@emotion/css'

const root = css`
background-color: tomato;
color: white;
font-size: 4rem;
font-family:'Open Sans';
padding:2rem;

`


const IndexPage = () => <div className={root}>Hello from Gatsby</div>;
export default IndexPage;