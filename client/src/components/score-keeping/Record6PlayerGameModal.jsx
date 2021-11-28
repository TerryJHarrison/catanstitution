import {Button, Form, Modal} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {recordSixPlayerGame} from "../../store/actions/keeper";
import {useFormModal} from "../../hooks/useFormModal";
import GameVariationFormField from "./GameVariationFormField";
import PlayerAddressFormField from "./PlayerAddressFormField";
import PlayerVPFormField from "./PlayerVPFormField";

const Record6PlayerGameModal = ({
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p1Vp,
  p2Vp,
  p3Vp,
  p4Vp,
  p5Vp,
  p6Vp,
  variation,
  handleP1Change,
  handleP2Change,
  handleP3Change,
  handleP4Change,
  handleP5Change,
  handleP6Change,
  handleP1VpChange,
  handleP2VpChange,
  handleP3VpChange,
  handleP4VpChange,
  handleP5VpChange,
  handleP6VpChange,
  handleVariationChange,
  recordSixPlayerGame
}) => {
  const [isOpen, open, close] = useFormModal();
  const submit = () => {
    close();
    recordSixPlayerGame({p1, p2, p3, p4, p5, p6, p1Vp, p2Vp, p3Vp, p4Vp, p5Vp, p6Vp, variation});
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
          <PlayerAddressFormField playerNum={5} value={p5} onChange={handleP5Change}/>
          <PlayerAddressFormField playerNum={6} value={p6} onChange={handleP6Change}/>
          <PlayerVPFormField playerNum={1} value={p1Vp} onChange={handleP1VpChange}/>
          <PlayerVPFormField playerNum={2} value={p2Vp} onChange={handleP2VpChange}/>
          <PlayerVPFormField playerNum={3} value={p3Vp} onChange={handleP3VpChange}/>
          <PlayerVPFormField playerNum={4} value={p4Vp} onChange={handleP4VpChange}/>
          <PlayerVPFormField playerNum={5} value={p5Vp} onChange={handleP5VpChange}/>
          <PlayerVPFormField playerNum={6} value={p6Vp} onChange={handleP6VpChange}/>
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
  recordSixPlayerGame
};

export default connect(null, actionCreators)(Record6PlayerGameModal);
