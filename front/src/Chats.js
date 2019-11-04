import React from "react";
import { Link } from "react-router-dom";
import { Chat } from 'react-chat-popup';
import "./Chat.css";

class Chats extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      currentChat: {}
    }

    this.renderChatsNames = this.renderChatsNames.bind(this);
    this.renderCurrentChat = this.renderCurrentChat.bind(this);
  }

  handleOpenChat () {

  }

  componentDidMount() {
    if(this.props.currentUser !== null)
    {
      fetch("/users/"+this.props.currentUser.mail+"/chats")
      .then(res => res.json())
      .then(data => this.setState({chats: data}))
      .catch();
    }
  }

  renderChatsNames() {

  }

  renderCurrentChat() {

  }

  render() {
    return (
      <div className="Chat">
        <footer className="fixed-bottom barra-chats">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                {this.renderChatsNames()}
              </div>
              <div className="col-md-8">
                {this.renderCurrentChat()}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

};

export default Chats;