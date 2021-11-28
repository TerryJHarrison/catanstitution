import React from 'react';
import {Card, Header, Icon, Table} from "semantic-ui-react";
import AddressLabel from "../AddressLabel";

const WinnerIcon = ({winner, player}) => {
  return winner === player ?
    <Icon name="winner"/> :
    null;
};

const GameCard2Player = ({game: {
  variation,
  winner,
  player_1,
  player_2,
  player_1_vp,
  player_2_vp
}}) => {
  return (
    <Card>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                {variation}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <WinnerIcon winner={winner} player={player_1}/>P1
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'><AddressLabel address={player_1}/></Header>
              </Table.Cell>
              <Table.Cell>
                {player_1_vp} VP
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <WinnerIcon winner={winner} player={player_2}/>P2
              </Table.Cell>
              <Table.Cell>
                <Header as='h4'><AddressLabel address={player_2}/></Header>
              </Table.Cell>
              <Table.Cell>
                {player_2_vp} VP
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </Card>
  );
}

export default GameCard2Player;
