import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux"

import './App.css';

import { store } from 'redux/store';
import router from './AppRouter'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
      <RouterProvider router={router}/>
    </div>
    </Provider>
    
  );
}

export default App;
