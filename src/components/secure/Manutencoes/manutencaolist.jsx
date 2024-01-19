import React, { useState, useEffect } from 'react';
import ManutencoesService from "../../../services/manutencoes.service.js";
import { Link } from 'react-router-dom';


const ManutencoesList = () => {
    const [manutencoes, setManutencoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await ManutencoesService.getAll();
            setManutencoes(data.data);
        }

        fetchData();
    }, []);

    return (
        <main>
            <section className="py-4">
                <div className="d-flex justify-content">
                    <Link to={"/"} className="btn btn-secondary px-4 mx-2">
                        Voltar
                    </Link>

                    <Link to={"/manutencao"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">descricao</th>
                        <th scope="col">data</th>
                        <th scope="col">custo</th>
                        <th scope="col">viatura</th>
                        <th scope="col">categoria</th>
                    </tr>
                    </thead>

                    <tbody>
                    {manutencoes.map((manutencao) => (
                        <tr key={manutencao.id}>
                            <td>{manutencao.descricao}</td>
                            <td>{manutencao.data}</td>
                            <td>{manutencao.custo}</td>
                            <td>{manutencao.viatura.marca}</td>
                            <td>{manutencao.categoria.nome}</td>
                            <td>
                                <div className="d-flex justify-content">
                                    <Link to={`/viatura/${manutencao.id}`} className='btn btn-primary me-2'>Editar</Link>
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

export default ManutencoesList;