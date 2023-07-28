import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { create } from "zustand";

import Header from "./components/header/header.js";
import Home from './components/home/home.js';
/*
const useStore = create(set => ({
  stores: [
    {id: 1, title: 'Test store'}
  ],
  isLoading: false,
  error: null,
  addStore: (id, title) => set(state => {
    const newStore = {id: id, title}
    return {stores: [...state.stores, newStore]}
  })
}));*/

function App() {

  const [accounts, setAccounts] = useState('');

  return (
    <BrowserRouter>
      <Header accounts={accounts} setAccounts={setAccounts} />
      <Routes>
        <Route path="/" element={<Home accounts={accounts} setAccounts={setAccounts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
