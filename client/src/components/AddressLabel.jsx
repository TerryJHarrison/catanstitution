import React from 'react';
import {Popup} from "semantic-ui-react";
import {connect} from "react-redux";

const AddressLabel = ({address, names}) => {
  const trigger = names.hasOwnProperty(address) ?
      <span>{names[address]}</span> :
      <span>{address.slice(0, 5)}...{address.slice(-3, -1)}</span>;
  return <Popup content={address} trigger={trigger}/>
}

const mapStateToProps = state => ({
  names: state.names.names
});

export default connect(mapStateToProps)(AddressLabel);
