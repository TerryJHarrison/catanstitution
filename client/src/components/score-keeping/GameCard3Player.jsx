import React from 'react';
import {Card, Header, Icon, Table} from "semantic-ui-react";
import AddressLabel from "../AddressLabel";

const GameCard3Player = ({game}) => {
  return (
    <Card>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">{game.variation}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{game.winner === game.player_1 ? <Icon name="winner"/> : null}P1</Table.Cell>
              <Table.Cell>
                <Header as='h4'><AddressLabel address={game.player_1}/></Header>
              </Table.Cell>
              <Table.Cell>{game.player_1_vp} VP</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{game.winner === game.player_2 ? <Icon name="winner"/> : null}P2</Table.Cell>
              <Table.Cell>
                <Header as='h4'><AddressLabel address={game.player_2}/></Header>
              </Table.Cell>
              <Table.Cell>{game.player_2_vp} VP</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{game.winner === game.player_3 ? <Icon name="winner"/> : null}P3</Table.Cell>
              <Table.Cell>
                <Header as='h4'><AddressLabel address={game.player_3}/></Header>
              </Table.Cell>
              <Table.Cell>{game.player_3_vp} VP</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
    </Card>
  );
}

export default GameCard3Player;
