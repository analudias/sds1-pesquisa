import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'; /*componente importado do react-router-dom*/
import Header from './components/Header';
import Home from './pages/Home';
import Records from './pages/Records';
import Charts from './pages/Charts';

const Routes = () => (
    <BrowserRouter>
    <Header /*para inserir o título em todas as páginas *//>
        <Switch /*decide qual rota será carregada*/> 
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/records" /*para sermos direcionado para essa página ao clicarmos no botão da tela inicial*/>
                <Records />
            </Route>
            <Route path="/charts">
                <Charts />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;