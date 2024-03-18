import React from 'react';

import { Button, Header, Icon, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from 'semantic-ui-react'


function ModalWindow(params){

    let info = {
        header: params.header,
        description: params.description,
    }


    const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <ModalHeader>{info.header}</ModalHeader>
      <ModalContent image>
        <ModalDescription>
          <p>
            {info.description}
          </p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button
          content="Ok"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>);
  
}

export default ModalWindow;