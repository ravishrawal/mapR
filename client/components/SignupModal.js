import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function SignupModal(){
    return (
      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content>
          <h1>mapR Logo</h1>
          <Modal.Description>
            <form></form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
}

export default SignupModal
