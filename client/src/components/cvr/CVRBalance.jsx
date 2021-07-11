import React from 'react';
import {connect} from "react-redux";
import {getBalance} from "../../store/actions/cvr";
import {useEffect} from "react";

const CVRBalance = ({balance, address}) => {
  useEffect(() => {
    getBalance();
  }, [address]);

  return <span>{balance} CVR</span>;
}

const actionCreators = {
  getBalance
};

const mapStateToProps = state => ({
  balance: state.cvr.balance,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps, actionCreators)(CVRBalance);
