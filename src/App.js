import LoginContainer from './containers/LoginContainer.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'

function App() {
  return (
    <div className="App">
      <h1>Fish In Sight</h1>
      <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={LoginContainer} />
        <Route exact path={"/dashboard"} component={DashboardContainer} />
        
      </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
