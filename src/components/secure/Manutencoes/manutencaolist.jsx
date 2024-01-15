import React, { useState, useEffect } from 'react';
import ManutencaoService from "../../../services/manutencoes.service";
import { Link } from 'react-router-dom';
import manutencao from "./manutencao";


const ManutencoesList = () => {
    const [manutencoes, setManutencoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await ManutencaoService.getAll();
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
                        <th scope="col">#</th>
                        <th scope="col">descricao</th>
                        <th scope="col">data</th>
                        <th scope="col">custo</th>
                        <th scope="col">viatura</th>
                        <th scope="col">viaturaId</th>
                        <th scope="col">categoria</th>
                        <th scope="col">categoriaId</th>
                    </tr>
                    </thead>

                    <tbody>
                    {manutencoes.map((manutencao, index) => (
                        <tr key={manutencao.id}>
                            <td >{index + 1}</td>
                            <td>{manutencao.descricao}</td>
                            <td>{manutencao.data}</td>
                            <td>{manutencao.custo}</td>
                            <td>{manutencao.viatura}</td>
                            <td>{manutencao.viaturaId}</td>
                            <td>{manutencao.categoria}</td>
                            <td>{manutencao.categoriaId}</td>
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