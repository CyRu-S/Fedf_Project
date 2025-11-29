import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UserLoginPage from './components/UserLoginPage.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserLoginPage />
  </StrictMode>,
);
