import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./pages/header/header";
import Home from './pages/home/home';


function App() {

  const [accounts, setAccounts] = useState('');

  return (
    <BrowserRouter>
      <Header accounts={accounts} setAccounts={setAccounts}/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
