import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CharityForm from './components/CharityForm';
import DonationList from './components/DonationList';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/charity-form" component={CharityForm} />
          <Route path="/donation-list" component={DonationList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;