import React from "react";
import {Form, Dropdown} from "semantic-ui-react";

const GameVariationFormField = ({
  value,
  onChange
}) => {

  const variations = [
    {key: 'The Settlers of Catan', text: 'The Settlers of Catan', value: 'The Settlers of Catan'},
    {key: 'Seafarers', text: 'Seafarers', value: 'Seafarers'},
    {key: 'Cities & Knights', text: 'Cities & Knights', value: 'Cities & Knights'},
    {key: 'Cities & Knights + Seafarers', text: 'Cities & Knights + Seafarers', value: 'Cities & Knights + Seafarers'},
    {key: 'Traders & Barbarians', text: 'Traders & Barbarians', value: 'Traders & Barbarians'},
    {key: 'Explorers & Pirates', text: 'Explorers & Pirates', value: 'Explorers & Pirates'},
    {key: 'Oil Springs', text: 'Oil Springs', value: 'Oil Springs'},
    {key: 'Frenemies of Catan', text: 'Frenemies of Catan', value: 'Frenemies of Catan'},
    {key: 'Settlers of the Stone Age', text: 'Settlers of the Stone Age', value: 'Settlers of the Stone Age'},
    {key: 'Struggle for Rome', text: 'Struggle for Rome', value: 'Struggle for Rome'},
    {key: 'Settlers of America: Trails to Rails', text: 'Settlers of America: Trails to Rails', value: 'Settlers of America: Trails to Rails'},
    {key: 'Merchants of Europe', text: 'Merchants of Europe', value: 'Merchants of Europe'},
    {key: 'Rise of the Inkas', text: 'Rise of the Inkas', value: 'Rise of the Inkas'}
  ];

  return (
    <Form.Field>
      <label>Game Variation</label>
      <Dropdown placeholder='The Settlers of Catan' name='variation' value={value} onChange={onChange} options={variations}/>
    </Form.Field>
  );
}

export default GameVariationFormField;