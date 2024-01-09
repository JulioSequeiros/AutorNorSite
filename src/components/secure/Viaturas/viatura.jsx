import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import ViaturaService from "../../../services/viaturas.service";

const Viatura = () => {
    const navigate = useNavigate();

    const params = useParams();
    const [id, setId] = useState(null);
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [ano, setAno] = useState("");
    const [proprietarioId, setProprietarioId] = useState("");
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!params.number) {
            return;
        }

        async function fetchData() {
            const response = await ViaturaService.getById(params.number);

            setId(response.data.id);
            setModelo(response.data.modelo);
            setAno(response.data.ano);
            setMarca(response.data.marca);
            setProprietarioId(response.data.proprietarioId);
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
            ViaturaService.createORupdate(id, modelo, marca, ano, proprietarioId).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setId(response.data.id);
                    setModelo(response.data.modelo);
                    setMarca(response.data.marca);
                    setAno(response.data.ano);
                    setProprietarioId(response.data.proprietarioId);
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

        ViaturaService.deleteUser(id).then(
            (response) => {
                navigate('/viaturas-list');
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
                                <h1 className="h3 mb-3 fw-normal">Registar</h1>

                                <div className="form-group">
                                    <label>Marca</label>
                                    <Input
                                        type="texto"
                                        className="form-control"
                                        name="marca"
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Modelo</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="modelo"
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Ano</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="number"
                                        value={ano}
                                        onChange={(e) => setAno(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>


                                <div className="form-group">
                                    <button className="btn btn-success mt-2">Registar</button>

                                    {id && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/viaturas-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Gravado com sucesso!
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
                            <CheckButton style={{display: "none"}} ref={checkBtn}/>
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Viatura;