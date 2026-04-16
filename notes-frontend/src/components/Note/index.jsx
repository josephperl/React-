import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

const colors = ["#ead3a7", "#9de0f5", "#ef89ba", "#fae890", "#abe9c1"];

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Note(props) {
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState("");

  useEffect(() => {
    setRotation(randomInt(-5, 5));
    setColor(colors[randomInt(0, colors.length - 1)]);
  }, []);

  const style = {
    transform: `rotate(${rotation}deg)`,
    backgroundColor: color,
  };

  const deletarNote = () => {
    axios
      .delete(`http://localhost:8000/notes/${props.id}/`)
      .then(() => props.loadNotes())
      .catch((error) => console.log(error));
  }

  return (
    <div className="card" style={style}>
      <h3 className="card-title">{props.title}</h3>
      <Link to={`edit/${props.id}`}>✏️</Link>
      <div className="card-content">{props.children}</div>
      <button className="btn" onClick={deletarNote}>Deletar</button>
    </div>
  );
}
