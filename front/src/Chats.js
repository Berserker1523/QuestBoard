import React from "react";
import { Link } from "react-router-dom";
import { Chat } from 'react-chat-popup';
import "./Chat.css";

class Chats extends React.Component{

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  handleOpenChat = () => {

  }

  render() {
    return (
      <div className="Chat">
        <footer className="fixed-bottom barra-chats">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <button onClick={this.handleOpenChat}>
                  Chats
                </button>
              </div>
            </div>
          </div>
        </footer>
        <Chat handleNewUserMessage={this.handleNewUserMessage} />;
      </div>
    );
  }

};

export default Chats;