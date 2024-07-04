import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouteError } from 'react-router';

const Error=()=>{
    const err=useRouteError();
    return(
        <div>
            <ErrorIcon/>
            <h1>Oops error!!</h1>
            <h2>{err.statusText+":"+err.status}</h2>
        </div>
    )
}

export default Error