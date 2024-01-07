import React, { useState, useEffect } from 'react';
import MarcacaoService from "../../../services/marcacoes.service";
import { Link } from 'react-router-dom';
import marcacao from "./marcacao";


const MarcacoesList = () => {
    const [marcacoes, setMarcacoes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await MarcacaoService.getAll();
            setMarcacoes(data.data);
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

                    <Link to={"/marcacao"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">data</th>
                        <th scope="col">descricao</th>
                        <th scope="col">viatura</th>
                        <th scope="col">viaturaId</th>
                    </tr>
                    </thead>

                    <tbody>
                    {marcacoes.map((marcacao, index) => (
                        <tr key={marcacao.id}>
                            <td >{index + 1}</td>
                            <td>{marcacao.data}</td>
                            <td>{marcacao.descricao}</td>
                            <td>{marcacao.viatura}</td>
                            <td>{marcacao.viaturaId}</td>
                            <td>
                                <div className="d-flex justify-content">
                                    <Link to={`/viatura/${marcacao.id}`} className='btn btn-primary me-2'>Editar</Link>
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