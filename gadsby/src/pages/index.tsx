import React from 'react'
import { css } from '@emotion/css'
import {SEO} from 'common/components'

const root = css`
background-color: tomato;
color: white;
font-size: 4rem;
font-family:'Open Sans';
padding:2rem;

`

const IndexPage = () => {
return (
    <>
    <SEO title="Home" keywords={[
        'gatsby',
        'Blog dhren',
        'musica',
        'cine',
    ]}/>
    <div className={root}>Hello from Gatsby</div>;
    </>
)
}
export default IndexPage;