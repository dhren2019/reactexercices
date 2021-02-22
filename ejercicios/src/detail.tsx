import React from 'react'
import { Link } from "react-router-dom"

export const DetailPage: React.FC = () => {
    return (
        <div>
            <h2>Hello from detail page</h2>
            <Link to="/list">Navigate to list page</Link>
        </div>
    )
}



