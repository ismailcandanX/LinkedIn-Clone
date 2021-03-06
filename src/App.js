import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<><Header /><Home /></>} />
    </Routes>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
