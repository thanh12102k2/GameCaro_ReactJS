import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route index element={<Home/>} />
        <Route path="/game" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();