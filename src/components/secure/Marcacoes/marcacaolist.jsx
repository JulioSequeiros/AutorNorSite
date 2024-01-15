import React, { useState, useEffect } from 'react';
import MarcacoesService from "../../../services/marcacoes.service";
import { Link } from 'react-router-dom';
import marcacao from "./marcacao.jsx";
import moment from "moment";


const MarcacoesList = () => {
    const [marcacoes, setMarcacoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await MarcacoesService.getAll();
            setMarcacoes(data.data);
        }

        fetchData();
    }, []);

    let formattedTime = moment(marcacao.data).format('DD/MM/YYYY HH:mm');

    return (
        <main>
            <section className="py-4">
                <div className="d-flex justify-content">
                    <Link to={"/"} className="btn btn-secondary px-4 mx-2">
                        Voltar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">data</th>
                        <th scope="col">descricao</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Modelo</th>
                    </tr>
                    </thead>

                    <tbody>
                    {marcacoes.map((marcacao) => (
                        <tr key={marcacao.id}>
                            <td>{formattedTime}</td>
                            <td>{marcacao.descricao}</td>
                            <td>{marcacao.viatura.marca}</td>
                            <td>{marcacao.viatura.modelo}</td>
                            <td>
                                <div className="d-flex justify-content">Estado da Manutenção
                                    <Link to={`/manutencao-list/${viatura.id}`} className='btn btn-primary me-2'>Marcar</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default MarcacoesList;