import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import {connect} from "react-redux";
import {connectToChain} from "./store/actions/web3";
import "./css/App.css";
import LayoutRoute from "./components/LayoutRoute";
import Catanstitution from "./pages/Catanstitution";
import CatanKeeper from "./pages/CatanKeeper";
import Loading from "./pages/Loading";

const App = ({connectToChain, connection}) => {

  useEffect(() => {
    connectToChain();
  })

  return !connection ?
    <Loading/>:
    <Router>
      <Switch>
        <LayoutRoute path='/' exact component={Catanstitution}/>
        <LayoutRoute path='/keeper' exact component={CatanKeeper}/>
      </Switch>
    </Router>;
}

const actionCreators = {
  connectToChain
};

const mapStateToProps = state => ({
  connection: state.web3.connection
})

export default connect(mapStateToProps, actionCreators)(App);
