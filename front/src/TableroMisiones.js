import React /*, { useEffect }*/ from "react";
import "./TableroMisiones.css";
import Mision from "./Mision.js";
//import main from "./space-cowboy";

const TableroMisiones = props => {
  /*useEffect(() => {
    //main();
  }, []);*/

  const renderMisiones = () => {
    return props.quests.map((quest, i) => {
      const questChatIndex = props.chats.findIndex(
        chat => chat.quest_id === quest._id
      );
      const questChat = questChatIndex >= 0 ? props.chats[questChatIndex] : 0;
      return quest.completed === false && quest.owner._id !== props.user._id ? (
        <div className="col-md-4" key={i}>
          <Mision info={quest} user={props.user} chat={questChat} />
        </div>
      ) : null;
    });
  };

  return (
    <div className="TableroMisiones">
      <div className="container-fluid misiones">
        {/*<canvas id="space-cowboy"></canvas>*/}
        {props.user && props.user.ownGames.length >= 1 ? (
          <div className="row">{renderMisiones()}</div>
        ) : (
          <div className="row">
            <div className="col">
              <h2 className="error">
                Agrega un juego para poder ver sus misiones!
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableroMisiones;
