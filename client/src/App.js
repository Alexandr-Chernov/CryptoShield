import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/header/header.js";
import Home from './components/home/home.js';
import Workspace from "./components/workspace/workspace.js";
import { accountAuth } from "./actions/accountLogin.js";
import LoadingAnimation from "./utils/loadingAnimation.js";

function App() {

  const dispatch = useDispatch();
  const [isTimeOuted, setIsTimeOuted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(accountAuth());
    }
    setTimeout(() => {
      setIsTimeOuted(true);
    }, 500);
  }, [dispatch, setIsTimeOuted]);

  const isAuth = useSelector(state => state.account.isAuth);

  return (
    <BrowserRouter>
      {isTimeOuted ? (<>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {isAuth ?
            <Route path="/workspace" element={<Workspace />} /> : <></>
          }
        </Routes>
      </>) : (
        <LoadingAnimation />
      )
      }
    </BrowserRouter>
  );

}

export default App;
