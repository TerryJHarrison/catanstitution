import React from "react";
import {Form} from "semantic-ui-react";

const PlayerVPFormField = ({
  playerNum,
  value,
  onChange
}) => {

  return (
    <Form.Field>
      <label>Player {playerNum} VP</label>
      <Form.Input placeholder='10' name={`p${playerNum}Vp`} value={value} onChange={onChange}/>
    </Form.Field>
  )
}

export default PlayerVPFormField;