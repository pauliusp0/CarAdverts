import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './Components/Header';
import Loading from './Components/Loading';

// screens-pages
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import CarScreen from './Screens/CarScreen';
import ProtectedRoute from './ProtectedRoute';

// hooks
import useEndpoint from './Hooks/useEndpoints';

// Context
export const UserContext = React.createContext();

// State management
// -- global state
const initialState = { user: '', data: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { ...state, user: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGGED':
      return { ...state, data: action.payload };
    case 'LOGOUT':
      return { ...state, user: '' };
    case 'CAR_ADDED':
      return { ...state, user: action.payload };
    case 'CAR_DELETED':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

function App() {
  // -- Local state
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loaded, setLoaded] = useState(false);

  // hooks
  const userDetailsAPI = useEndpoint('userDetails');

  // -- side effects
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const tokenFromStorage = localStorage.getItem('user');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      };

      const fetchData = async () => {
        const { data } = await axios.get(userDetailsAPI, config);
        dispatch({ type: 'LOGGED', payload: data });
        setLoaded(true);
      };
      fetchData().catch((err) => {
        localStorage.removeItem('user');
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, [state.user, userDetailsAPI]);

  return loaded ? (
    <UserContext.Provider value={{ state, dispatch, setLoaded }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/my-account' component={ProtectedRoute} />
          <Route path='/car/:id' component={CarScreen} />
        </Switch>
      </Router>
    </UserContext.Provider>
  ) : (
    <Loading />
  );
}

export default App;
