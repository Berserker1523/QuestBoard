import React from "react";
import "./TableroMisiones.css";
import Mision from "./Mision.js";

class TableroMisiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      misiones: [],
      usuarioActual: this.props.currentUser,
      error: ""
    };

    this.renderMisiones = this.renderMisiones.bind(this);
  }

  renderMisiones() {
    return this.state.misiones.map((mision, i) =>
      mision.completed === false ? (
        <div className="col-md-4">
          <Mision info={mision} key={i} />
        </div>
      ) : (
        <div className="col-md-0"></div>
      )
    );
  }

  componentDidMount() {
    fetch("/quests")
      .then(res => res.json())
      .then(data => this.setState({ misiones: data }))
      .catch(err =>
        this.setState({
          error:
            "No fue posible obtener las misiones, por favor intentelo de nuevo"
        })
      );
  }

  render() {
    return (
      <div>
        <div className="TableroMisiones">
          <div className="container-fluid misiones">
            <div className="row">{this.renderMisiones()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableroMisiones;
