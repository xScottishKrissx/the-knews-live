import React from 'react';
import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className=''>
            <h1>Error</h1>
            <p>Page Not Found</p>
            <Link to="/">...go back</Link>
        </div>
    )
}

export default NotFoundPage;