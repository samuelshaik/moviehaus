
// client/src/context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      axios.defaults.headers.common['x-auth-token'] = action.payload.token;
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGOUT':
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api/v1';

  // Load user on app start
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['x-auth-token'] = state.token;
      loadUser();
    } else {
      dispatch({ type: 'AUTH_ERROR', payload: 'No token found' });
    }
  }, [state.token]);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/user`);
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.response?.data?.msg || 'Failed to load user' });
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: error });
      return { success: false, error };
    }
  };

  const login = async (userData) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: error });
      return { success: false, error };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        clearErrors,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};