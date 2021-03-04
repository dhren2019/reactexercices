import { routes } from 'core/router';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { isValidLogin } from './login.api';
import { LoginComponent } from './login.component';
import { Login } from './login.vm';
import Snackbar from '@material-ui/core/Snackbar';

export const LoginContainer: React.FunctionComponent = () => {
  const history = useHistory();

  const loginSucceded = (isValid: boolean) :void => {
    if (isValid) {
      history.push(routes.submoduleList)
    }else {
     alert('Invalid login')
     
        
      
    }
  }

  const handleLogin = ( login:Login) => {
    isValidLogin(login.user, login.password).then(loginSucceded)
  }
  return (
    <>
      <LoginComponent onLogin={handleLogin}/>
    </>
  );
};
