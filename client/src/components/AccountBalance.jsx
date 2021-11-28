import React, {Fragment} from 'react';
import {connect} from "react-redux";

const AccountBalance = ({balances, address}) => {
  const voter = balances.filter(b => b.address === address);
  return voter.length > 0 ? (
      <Fragment>
        <span>{voter[0].cvr} CVR</span><br/>
        <span>{voter[0].ckg} CKG</span>
      </Fragment>
  ) : null;
}

const mapStateToProps = state => ({
  balances: state.catanstitution.balances,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps)(AccountBalance);
