import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import store from './services/store';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter basename='/projects/stellar-burger'>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
