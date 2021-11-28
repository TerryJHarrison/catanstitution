import React, {useState} from "react";
import {Form, Dropdown, Input, Radio} from "semantic-ui-react";
import {connect} from "react-redux";

const PlayerAddressFormField = ({
  playerNum,
  value,
  onChange,
  addresses
}) => {

  const [isSelected, setSelected] = useState(true);
  const handleSelectedChange = () => {setSelected(!isSelected)};

  const players = [];
  for(const a in addresses){
    players.push({
      key: addresses[a],
      text: a,
      value: addresses[a]
    });
  }

  return (
    <Form.Field>
      <label>Player {playerNum}</label>
      <label>
        {isSelected && "Choose player"}
        {!isSelected && "Enter address"}
        <Radio toggle value={isSelected} onChange={handleSelectedChange}/>
      </label>
      {isSelected && <Dropdown placeholder={players[0].text} name={`p${playerNum}`} value={value} onChange={onChange} options={players}/>}
      {!isSelected && <Input placeholder='0x0123...' name={`p${playerNum}`} value={value} onChange={onChange}/>}
    </Form.Field>
  )
}

const mapStateToProps = state => ({
  addresses: state.names.addresses
});

export default connect(mapStateToProps)(PlayerAddressFormField);