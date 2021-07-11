import {Button, Form, Modal} from "semantic-ui-react";
import React from "react";
import {connect} from "react-redux";
import {recordThreePlayerGame} from "../../store/actions/keeper";
import {useFormModal} from "../../hooks/useFormModal";

const Record3PlayerGameModal = (
  {
    p1,
    p2,
    p3,
    p1Vp,
    p2Vp,
    p3Vp,
    variation,
    handleP1Change,
    handleP2Change,
    handleP3Change,
    handleP1VpChange,
    handleP2VpChange,
    handleP3VpChange,
    handleVariationChange,
    recordThreePlayerGame
  }) => {
  const [isOpen, open, close] = useFormModal();
  const submit = () => {
    close();
    recordThreePlayerGame({p1, p2, p3, p1Vp, p2Vp, p3Vp, variation})
  };
  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button compact icon="plus" color="green"/>}>
      <Modal.Header>Record Game</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Player 1 Address</label>
            <Form.Input placeholder='0x0123...' name='p1' value={p1} onChange={handleP1Change}/>
          </Form.Field>
          <Form.Field>
            <label>Player 2 Address</label>
            <Form.Input placeholder='0x0123...' name='p2' value={p2} onChange={handleP2Change}/>
          </Form.Field>
          <Form.Field>
            <label>Player 3 Address</label>
            <Form.Input placeholder='0x0123...' name='p3' value={p3} onChange={handleP3Change}/>
          </Form.Field>
          <Form.Field>
            <label>Player 1 VP</label>
            <Form.Input placeholder='10' name='p1Vp' value={p1Vp} onChange={handleP1VpChange}/>
          </Form.Field>
          <Form.Field>
            <label>Player 2 VP</label>
            <Form.Input placeholder='9' name='p2Vp' value={p2Vp} onChange={handleP2VpChange}/>
          </Form.Field>
          <Form.Field>
            <label>Player 3 VP</label>
            <Form.Input placeholder='9' name='p3Vp' value={p3Vp} onChange={handleP3VpChange}/>
          </Form.Field>
          <Form.Field>
            <label>Game Variation</label>
            <Form.Input placeholder='Base' name='variation' value={variation} onChange={handleVariationChange}/>
          </Form.Field>
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
  recordThreePlayerGame
}

export default connect(null, actionCreators)(Record3PlayerGameModal);
