import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppBar from "../AppBar";
import "./index.css";

export async function loader({ params }) {
    const note = await axios
        .get(`http://localhost:8000/notes/${params.noteId}/`)
        .then((response) => response.data)
    return { note };
}

export default function Editar() {
    const navigate = useNavigate();
    const { note } = useLoaderData();
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const salvarNota = (event) => {
        event.preventDefault();

        const data = {
            "title": title,
            "content": content
        }

        axios
            .put(`http://localhost:8000/notes/${note.id}/`, data)
            .then(() => navigate("/"))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <AppBar />
            <main className="container">
                <form className="form-card" onSubmit={salvarNota}>
                    <input
                        className="form-card-title"
                        type="text"
                        name="titulo"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        className="autoresize"
                        name="detalhes"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                    <button className="btn" type="submit">Salvar</button>
                </form>
            </main>
        </>
    );
}
