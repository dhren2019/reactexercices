import React from 'react'
import {  LoginComponent } from './login.component';

export const LoginContainer: React.FC = () =>
{
    return (
        <>
        <h1>Heelo from login container</h1>
        <LoginComponent />
        </>
    )
}