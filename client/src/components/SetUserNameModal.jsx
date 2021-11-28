import React from "react";
import {Button, Form, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {setUserName} from "../store/actions/names";
import {useFormModal} from "../hooks/useFormModal";
import {useFormState} from "../hooks/useFormState";

const SetUserNameModal = ({setUserName, names, address}) => {
  const [isOpen, open, close] = useFormModal();
  const [name, handleNameChange] = useFormState(names[address]);

  const submit = () => {
    close();
    setUserName(name);
  };

  return (
    <Modal onClose={close} onOpen={open} open={isOpen} trigger={<Button>Update user name</Button>}>
      <Modal.Header>Update user name</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>User Name</label>
            <Form.Input placeholder={name} name='name' value={name} onChange={handleNameChange}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={close}>Cancel</Button>
        <Button onClick={submit} color="green">Update</Button>
      </Modal.Actions>
    </Modal>
  )
};

const actionCreators = {
  setUserName
}

const mapStateToProps = state => ({
  names: state.names.names,
  address: state.web3.accounts[0]
});

export default connect(mapStateToProps, actionCreators)(SetUserNameModal);
