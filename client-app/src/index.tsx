import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initOptions = { checkLoginIframe: false, onLoad: 'check-sso' };

const loadingComponent = (
  <div>
    <h1>Loading...</h1>
  </div>
)

root.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} onLoadingComponent={loadingComponent}>
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();