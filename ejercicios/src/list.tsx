import React from 'react'
import { Link } from "react-router-dom"

export const ListPage = () => {
    return (
        <div>
            <h2>List page</h2>
            <Link to="/detail">Navigate to detail page</Link>
        </div>
    )
}

