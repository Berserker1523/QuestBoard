import React from "react";
import { Link } from "react-router-dom";
import "./Mision.css";

class Mision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.info,
    }
  }

  render() {
    /*console.log("Usuario componente Inicio: " + this.props.currentUser);*/
    return (
      <div className="Mision">
        {this.state.info}
      </div>
    );
  }
}

export default Mision;