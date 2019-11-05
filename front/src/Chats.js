import React from "react";
import { Link } from "react-router-dom";
import "./Chats.css";
import Chat from "./Chat.js";

class Chats extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      currentChat: null,
      currentChatId: "",
    }

    this.renderChatsNames = this.renderChatsNames.bind(this);
    this.renderCurrentChat = this.renderCurrentChat.bind(this);
    this.setCurrent = this.setCurrent.bind(this);
  }

  componentDidMount() {
    if(this.props.currentUser !== null)
    {
      fetch("/users/"+this.props.currentUser.mail+"/chats")
      .then(res => res.json())
      .then(data => this.setState({chats: data}))
      .catch();
    }

    console.log(this.state.chats);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.currentChatId !== prevState.currentChatId) {
      if(this.state.currentChatId !== "")
      {
        this.props.GetCurrentChat(this.state.currentChatId);
      }
    }
  }

  renderChatsNames() {
    return this.state.chats.map(
        (chat, i) => (<div className="row nombre-lista" key={i}><button type="button" className="btn-nombre" value={chat._id} onClick={this.setCurrent}>{chat.name}</button></div>)
      );
  }

  setCurrent (event) {
    event.preventDefault()
    this.setState({currentChatId: event.currentTarget.value});
  }

  renderCurrentChat() {
    return <Chat chat={this.props.currentChat} currentUser={this.props.currentUser} />;
  }

  render() {
    return (
      <div className="Chat">
        <div className="container-fluid chats">
          <div className="row">
            <div className="col-md-3 nombres">
              {this.renderChatsNames()}
            </div>
            <div className="col-md-9 chat-actual">
              {this.renderCurrentChat()}
            </div>
          </div>
        </div>
      </div>
    );
  }

};

//No es claro cómo usar el chat. No pude crear o usar ninguno.

export default Chats;