import {Button, Form, Modal} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {recordTwoPlayerGame} from "../../store/actions/keeper";
import {useFormModal} from "../../hooks/useFormModal";
import GameVariationFormField from "./GameVariationFormField";
import PlayerAddressFormField from "./PlayerAddressFormField";
import PlayerVPFormField from "./PlayerVPFormField";

const Record2PlayerGameModal = ({
  p1,
  p2,
  p1Vp,
  p2Vp,
  variation,
  handleP1Change,
  handleP2Change,
  handleP1VpChange,
  handleP2VpChange,
  handleVariationChange,
  recordTwoPlayerGame
}) => {
  const [isOpen, open, close] = useFormModal();
  const submit = () => {
    close();
    recordTwoPlayerGame({p1, p2, p1Vp, p2Vp, variation});
  };
  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button compact icon="plus" color="green"/>}>
      <Modal.Header>Record Game</Modal.Header>
      <Modal.Content>
        <Form>
          <PlayerAddressFormField playerNum={1} value={p1} onChange={handleP1Change}/>
          <PlayerAddressFormField playerNum={2} value={p2} onChange={handleP2Change}/>
          <PlayerVPFormField playerNum={1} value={p1Vp} onChange={handleP1VpChange}/>
          <PlayerVPFormField playerNum={2} value={p2Vp} onChange={handleP2VpChange}/>
          <GameVariationFormField value={variation} onChange={handleVariationChange}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Record</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  recordTwoPlayerGame
};

export default connect(null, actionCreators)(Record2PlayerGameModal);
