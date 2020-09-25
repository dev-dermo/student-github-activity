import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="*" render={() => {
            return (<h1 className="text-center mt-4">404 Page Not Found</h1>);
          }} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
