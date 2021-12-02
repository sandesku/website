import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import React from 'react';
import './exception.css';

export default function Exception(props) {
  const [isOpen, setIsOpen] = React.useState(true);

  const onClose = () => {
    setIsOpen(false);
    props.setException('');
  }

  return (
    <Modal open={isOpen} onClose={onClose} center>
        <p id = "message">{props.message}</p>
    </Modal>
  );
};