import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipesDetails from './components/RecipesDetails';
import Create from './components/Create';

function App() {
  
    return (
    
      <div className="App">
        <Route exact path='/'>
          <LandingPage></LandingPage>
        </Route>
        <Route exact path='/home'>
          <Home></Home>
        </Route>
        <Route exact path='/create'>
          <Create></Create>
        </Route>
        <Route exact path='/recipe/:id'>
          <RecipesDetails></RecipesDetails>
        </Route>
        
        
      </div>
      
  );
}

export default App;
