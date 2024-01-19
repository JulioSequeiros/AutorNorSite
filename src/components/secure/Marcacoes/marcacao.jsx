import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import marcacoesService from "../../../services/marcacoes.service.js";
import categoriasService from "../../../services/categorias.service.js";

const Marcacao = () => {
    const navigate = useNavigate();


    const params = useParams();
    const [id, setId] = useState(null);
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [viatura, setViatura] = useState("");
    const [viaturaId, setViaturaId] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    const [cat, setCat] = useState([]);

    useEffect(() => {
        async function fetchCat() {
            const response = await categoriasService.getAll();
            setCat(response.data);
        }
        fetchCat();

        setViaturaId(params.id);
        return;


        if (!params.id) {
            return;
        }

        async function fetchData() {
            const response = await marcacoesService.getById(params.id);

            setId(response.data.id);
            setData(response.data.data);
            setDescricao(response.data.descricao);
            setViatura(response.data.viatura.viatura);
            setViaturaId(response.data.viatura.viaturaId);
        }

        fetchData();
    }, []);


    const form = useRef();
    const checkBtn = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            marcacoesService.createORupdate(id, data, descricao, viatura, viaturaId, categoriaId).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setId(response.data.id);
                    setData(response.data.data);
                    setDescricao(response.data.descricao);
                    setViatura(response.data.viatura.viatura);
                    setViaturaId(response.data.viatura.viaturaId);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();

        marcacoesService.deleteUser(id).then(
            (response) => {
                navigate('/marcacoes-list');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    É obrigatório!
                </div>
            );
        }
    };

    const validLength = (value) => {
        if (value.length < 3 || value.length > 50) {
            return (
                <div className="invalid-feedback d-block">
                    O nome deve ter entre 3 e 20 caracteres!
                </div>
            );
        }
    };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Faz a Marcação</h1>

                                <div className="form-group">
                                    <label>Data da Marcação</label>
                                    <Input
                                        type="datetime-local"
                                        className="form-control"
                                        name="name"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Descricao</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="number"
                                        value={descricao}
                                        onChange={(e) => setDescricao(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Categoria</label>

                                    <select name="categoriaId" id="categoriaId"
                                            onChange={(e) => setCategoriaId(e.target.value)}
                                    >
                                        {cat.map((categoria) => (
                                            <option value={categoria.id}>{categoria.nome}</option>

                                        ))}
                                    </select>


                                </div>

                                <div className="form-group">
                                <button className="btn btn-success mt-2">Registar</button>

                                    {id && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/marcacoes-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Guardado com sucesso!
                                </div>
                            )}


                            {message && successful !== null && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Marcacao;