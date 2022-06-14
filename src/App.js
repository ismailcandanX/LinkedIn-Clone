import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<><Header /><Home /></>} />
    </Routes>
  );
}

export default App;
