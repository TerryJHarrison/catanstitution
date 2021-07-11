import React from "react";
import {Button, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {burnToken} from "../../store/actions/cvr";
import {useFormModal} from "../../hooks/useFormModal";
import {useFormInput} from "../../hooks/useFormState";

const BurnTokenModal = ({burnToken}) => {
  const [isOpen, open, close] = useFormModal();
  const [amount, handleAmountChange] = useFormInput(0);

  const submit = () => {
    close();
    burnToken(amount);
  };

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Burn CVR</Button>}>
      <Modal.Header>Burn CVR</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Amount (whole CVR)</label>
            <Form.Input placeholder='1' name='amount' value={amount} onChange={handleAmountChange}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Burn</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  burnToken
}

export default connect(null, actionCreators)(BurnTokenModal);
