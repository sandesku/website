import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import React from 'react';
import "./login.css";

export default function Login(props) {
    const [isOpen, setIsOpen] = React.useState(true);
    const [user, setUser] = React.useState({
          username:"username",
          password:"password"
    });

    const onClose = () => {
      setIsOpen(false);
      props.setUser(user);
    }

    const onChange = (e) => {
      setUser(values => ({...values, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
      e.preventDefault();
      onClose();
    }
  
    return (
      <Modal open={isOpen} onClose={onClose} center>
          <form id  = "login-form" onSubmit = {onSubmit}>
            <input id = "username" placeholder="username" type="text" name="username" onChange={onChange} required/>
            <input id = "password" placeholder="password" type="password" name="password" onChange={onChange} required/>
            <input id = "login" type="submit" value = 'Login'/>
          </form>
      </Modal>
    );
}