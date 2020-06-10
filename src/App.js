import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/common/Header';
import Zones from './components/zones/index';
import Statistics from './components/statistics/index';
import Analytics from './components/analytics/index';
import LatestUpdates from './components/latest_updates/index';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-168120519-1');

function App() {
    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search); 
    });
    return (
        <div className="App">
        	<BrowserRouter>
                <Switch>
                    <Route exact path = '/' component={Dashboard} />
                    <Route exact path = '/analytics' component={Analytics} />
                    <Route exact path = '/zones' component={Zones} />
                    <Route exact path = '/statistics' component={Statistics} />
                    <Route exact path = '/updates' component={LatestUpdates} />
                    <Route render = {() => (<Header>Not Found</Header>) } />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
