import React from "react";
import "./Chat.css";

class Chat extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      texto:"",
      fechaMsg: new Date(),
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  sendMessage() {
    this.props.chat.messages.push(
          {
            text: this.state.texto,
            date: this.state.fechaMsg,
            owner: this.props.currentUser._id
          }
    );

    fetch("/chats/"+this.props.chat._id, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify({
        name: this.props.chat.name,
        quest: this.props.chat.quest,
        users: this.props.chat.users,
        messages: this.props.chat.messages,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  }

  renderMsgs() {
    return this.props.chat.messages.map((msg,i) => <div key={i} className={msg.owner === this.props.currentUser._id ? "row right" : "row left"}>{msg.text}</div>);
  }

  render() {
    return (
    <div className="Chat">
    {this.props.chat !== null?
      <div className="container-fluid chat">
        <div className="row nombre-chat">{this.props.chat.name}</div>
        <div className="row mostrar-mensajes">
          <div className="col-md-12">
            {this.renderMsgs()}
          </div>
        </div>
        <div className="row enviar-mensaje">
          <div className="col-md-10">
            <textarea name="texto" cols="80" rows="1" placeholder="Escribe tu mensaje..." onChange={this.handleInputChange}></textarea>
          </div>
          <div className="col-md-2">
            <button className="btn-enviar" onClick={this.sendMessage}>Enviar</button>
          </div>
        </div>
      </div>
      : null }
    </div>
  );
  }

};

export default Chat;
