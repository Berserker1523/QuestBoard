import React from "react";
import "./Mision.css";
import { useState } from "react";

const Juego = props => {
  const [showInput, setShowInput] = useState(false);
  const [summonerName, setSummonerName] = useState("");

  const setButtons = () => {
    if (
      props.currentUser &&
      props.currentUser.ownGames.findIndex(game => game === props.info._id) >= 0
    ) {
      return null;
    } else if (showInput) {
      return (
        <button className="btn-unirse" onClick={() => joinPlayer()}>
          Obtener datos
        </button>
      );
    } else {
      return (
        <button
          className="btn-mas-info"
          onClick={() => setShowInput(!showInput)}
        >
          Unirse al juego
        </button>
      );
    }
  };

  const handleSummonerInput = event => {
    setSummonerName(event.target.value);
  };

  const joinPlayer = () => {
    props.currentUser.ownGames.push(props.info._id);
    fetch("/users/" + props.currentUser._id, {
      method: "PUT",
      body: JSON.stringify({
        name: props.currentUser.name,
        mail: props.currentUser.mail,
        password: props.currentUser.password,
        age: props.currentUser.age,
        avatar: props.currentUser.avatar,
        country: props.currentUser.country,
        ownQuests: props.currentUser.ownQuests,
        activeQuests: props.currentUser.activeQuests,
        completedQuests: props.currentUser.completedQuests,
        ownGames: props.currentUser.ownGames
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      fetch(
        `/user_game/lol/user/${props.currentUser._id}/summoner/${summonerName}`,
        {
          method: "POST"
        }
      ).then(() => {
        fetch("/users/" + props.currentUser.mail)
          .then(res => res.json())
          .then(response => {
            props.setUser(response);
          });
      });
    });
  };

  return (
    <div className="Mision">
      <div className="container-fluid mision">
        <div className="row">
          <div className="col-10 nombre">{props.info.name}</div>
          <div className="col-2 logo">
            <img src={props.info.platform} alt="platform logo"></img>
          </div>
        </div>
        <div className="row juego-descripcion">
          <p>{props.info.description}</p>
        </div>

        {showInput &&
        !(
          props.currentUser.ownGames.findIndex(
            game => game === props.info._id
          ) >= 0
        ) ? (
          <div className="row input-juego">
            <div className="col">
              <label htmlFor="" className="label-juego">
                Ingrese su nombre de invocador
                <br />
                <input
                  type="text"
                  name="name"
                  value={summonerName}
                  onChange={handleSummonerInput}
                  size="35"
                />
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row botones">
          <div className="col juego-btn">{setButtons()}</div>
        </div>
      </div>
    </div>
  );
};

export default Juego;
