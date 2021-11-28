import {Button, Form, Modal} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {recordFourPlayerGame} from "../../store/actions/keeper";
import {useFormModal} from "../../hooks/useFormModal";
import GameVariationFormField from "./GameVariationFormField";
import PlayerAddressFormField from "./PlayerAddressFormField";
import PlayerVPFormField from "./PlayerVPFormField";

const Record4PlayerGameModal = (
  {
    p1,
    p2,
    p3,
    p4,
    p1Vp,
    p2Vp,
    p3Vp,
    p4Vp,
    variation,
    handleP1Change,
    handleP2Change,
    handleP3Change,
    handleP4Change,
    handleP1VpChange,
    handleP2VpChange,
    handleP3VpChange,
    handleP4VpChange,
    handleVariationChange,
    recordFourPlayerGame
  }) => {
  const [isOpen, open, close] = useFormModal();
  const submit = () => {
    close();
    recordFourPlayerGame({p1, p2, p3, p4, p1Vp, p2Vp, p3Vp, p4Vp, variation});
  };
  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button compact icon="plus" color="green"/>}>
      <Modal.Header>Record Game</Modal.Header>
      <Modal.Content>
        <Form>
          <PlayerAddressFormField playerNum={1} value={p1} onChange={handleP1Change}/>
          <PlayerAddressFormField playerNum={2} value={p2} onChange={handleP2Change}/>
          <PlayerAddressFormField playerNum={3} value={p3} onChange={handleP3Change}/>
          <PlayerAddressFormField playerNum={4} value={p4} onChange={handleP4Change}/>
          <PlayerVPFormField playerNum={1} value={p1Vp} onChange={handleP1VpChange}/>
          <PlayerVPFormField playerNum={2} value={p2Vp} onChange={handleP2VpChange}/>
          <PlayerVPFormField playerNum={3} value={p3Vp} onChange={handleP3VpChange}/>
          <PlayerVPFormField playerNum={4} value={p4Vp} onChange={handleP4VpChange}/>
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
  recordFourPlayerGame
};

export default connect(null, actionCreators)(Record4PlayerGameModal);
