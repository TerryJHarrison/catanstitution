import React from 'react';
import {Popup} from "semantic-ui-react";

const AddressLabel = ({address}) => {
  return <Popup content={address} trigger={<span>{address.slice(0, 5)}...{address.slice(-3, -1)}</span>}/>
}

export default AddressLabel;
