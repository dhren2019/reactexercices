import React from "react";
import { HashRouter, Switch, Route, Router} from 'react-router-dom';
import { LoginPage} from './login'
import { ListPage} from './list'
import { DetailPage} from './detail'


export const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="list">
          <ListPage/>
        </Route>
        <Router path="detail">
          <DetailPage />
        </Router>
      </Switch>
    </HashRouter>
  )
};


// Clase 4.4 min 6.26