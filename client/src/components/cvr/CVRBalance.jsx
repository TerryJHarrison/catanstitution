import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {getBalance} from "../../store/actions/cvr";
import {useEffect} from "react";

const CVRBalance = ({balance, address, ckg}) => {
  useEffect(() => {
    getBalance();
  }, [address]);

  return (
      <Fragment>
        <span>{balance} CVR</span><br/>
        <span>{ckg} CKG</span>
      </Fragment>
  );
}

const actionCreators = {
  getBalance
};

const mapStateToProps = state => ({
  balance: state.cvr.balance,
  ckg: state.cvr.ckg,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps, actionCreators)(CVRBalance);
