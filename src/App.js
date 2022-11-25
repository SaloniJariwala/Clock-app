import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';
import Clock from "./Components/Clock";
import Alarm from './Components/Alarm';
import Stopwatch from "./Components/Stopwatch";
import Timer from "./Components/Timer";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout Component={Clock} />} />
      <Route path='/alarm' element={<Layout Component={Alarm} />} />
      <Route path='/stopwatch' element={<Layout Component={Stopwatch} />} />
      <Route path='/timer' element={<Layout Component={Timer} />} />
    </Routes>
  );
}

export default App;
