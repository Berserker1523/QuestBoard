import React from "react";
import "./Chat.css";

const Chat = props => {
  return (
    <div className="Chat">
    {props.chat !== null?
      <div className="container-fluid chat">
        <div className="row nombre-chat">{props.chat.name}</div>
        <div className="row mostrar-mensajes">
          <p>{props.chat.messages}</p>
        </div>
        <div className="row enviar-mensaje">
          <div className="col-md-10">
            <textarea name="" id="" cols="80" rows="1" placeholder="Escribe tu mensaje..."></textarea>
          </div>
          <div className="col-md-2">
            <button className="btn-enviar">Enviar</button>
          </div>
        </div>
      </div>
      : null }
    </div>
  );
};

export default Chat;
