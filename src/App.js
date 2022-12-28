import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout';
import Clock from "./Components/Clock";
import Alarm from './Pages/AlarmPage';
import Index from "./Components/StopWatch/index";
import Timer from "./Pages/TimerPage";
import Holiday from "./Components/Holiday";
import Reminder from "./Pages/ReminderPage";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout Component={Clock} />} />
      <Route path='/alarm' element={<Layout Component={Alarm} />} />
      <Route path='/stopwatch' element={<Layout Component={Index} />} />
      <Route path='/timer' element={<Layout Component={Timer} />} />
      <Route path='/timer/:name/:days' element={<Layout Component={Timer} />} />
      <Route path='/holidays' element={<Layout Component={Holiday} />} />
      <Route path='/reminder' element={<Layout Component={Reminder} />} />
    </Routes>
  );
}

export default App;
