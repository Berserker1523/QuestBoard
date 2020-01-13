import React, { useState, useEffect, useRef } from "react";
import "./Mision.css";
import { putAPI } from "./API/BasicAPI";

const Chat = props => {
  const [message, setMessage] = useState("");
  const messagesContainer = useRef(null);

  useEffect(() => {
    const element = messagesContainer.current;

    //100 is an average message height,
    //when a new message is rendered scroll top is not at the most bottom
    //even if previously it was
    const shouldScroll =
      element.scrollTop + element.clientHeight + 100 >= element.scrollHeight;
    if (shouldScroll) {
      element.scrollTop = element.scrollHeight;
    }
  }, [props.chat.messages.length]);

  const putChatMessage = () => {
    putAPI(`/chats/${props.chat._id}/new_message`, {
      message: {
        _id: props.user._id,
        name: props.user.name,
        date: new Date(),
        message: message
      }
    })
      .then(() => setMessage(""))
      .catch(err => console.error("No fue posible enviar el mensaje: " + err));
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      putChatMessage();
    }
  };

  const questNameWithoutSpaces = props.chat.quest_name.replace(/ /g, "");

  const setMessageNameColor = name => {
    if (name === props.user.name) {
      return "chat-username-user";
    } else if (
      props.quest.players.findIndex(player => player.name === name) < 0
    ) {
      return "chat-username-dismissed";
    } else {
      return "chat-username";
    }
  };

  const setDateFormat = someDate => {
    const today = new Date();
    const isToday =
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
    if (isToday) {
      return (
        ("0" + someDate.getHours()).slice(-2) +
        ":" +
        ("0" + someDate.getMinutes()).slice(-2)
      );
    } else {
      return (
        ("0" + someDate.getDate()).slice(-2) +
        "/" +
        ("0" + (someDate.getMonth() + 1)).slice(-2) +
        "/" +
        someDate.getFullYear() +
        " - " +
        ("0" + someDate.getHours()).slice(-2) +
        ":" +
        ("0" + someDate.getMinutes()).slice(-2)
      );
    }
  };

  const setChatMessages = () => {
    return props.chat.messages.map((msg, i) => (
      <div key={i} className="chat-msg">
        <div className="row">
          <div className="col">
            <p>
              <span className={setMessageNameColor(msg.name)}>
                {msg.name + " "}
              </span>

              <span className="msg-date">
                {setDateFormat(new Date(msg.date))}
              </span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="chat-text">{msg.message}</p>
          </div>
        </div>
      </div>
    ));
  };

  const chat = (
    <div
      className="modal fade"
      id={"modal" + questNameWithoutSpaces + "chat"}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={"ModalScrollable" + questNameWithoutSpaces + "chat"}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <h5
                    className="modal-title"
                    id={"ModalScrollable" + questNameWithoutSpaces + "chat"}
                  >
                    {props.chat.quest_name}
                  </h5>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" ref={messagesContainer}>
            <div className="container-fluid">{setChatMessages()}</div>
          </div>
          <div className="modal-footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <input
                    aria-label="Escribir mensaje"
                    className="chat-new-message"
                    name="message"
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Escribe algo..."
                    onKeyPress={onKeyPress}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-10"></div>
                <div className="col modal-btn-close">
                  <button
                    type="button"
                    className="btn btn-secondary miptobtn"
                    data-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-3">
      {chat}
      <button
        aria-label="Abrir chat"
        className="btn-chat"
        type="button"
        data-toggle="modal"
        data-target={"#modal" + questNameWithoutSpaces + "chat"}
        onClick={() =>
          setTimeout(() => {
            messagesContainer.current.scrollTop =
              messagesContainer.current.scrollHeight;
          }, 300)
        }
      ></button>
    </div>
  );
};

export default Chat;
