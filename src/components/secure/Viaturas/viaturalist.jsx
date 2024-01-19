import React, { useState, useEffect } from 'react';
import ViaturaService from "../../../services/viaturas.service";
import { Link } from 'react-router-dom';


const ViaturasList = () => {
    const [viaturas, setViaturas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await ViaturaService.getByOwnerId();
            setViaturas(data.data);
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

                    <Link to={"/viatura"} className="btn btn-success px-4 mx-2">
                        Registar Viatura
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th>
                        <th scope="col">ano</th>
                        <th scope="col">Proprietario</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {viaturas.map((viatura) => (
                        <tr key={viatura.id}>
                            <td>{viatura.marca}</td>
                            <td>{viatura.modelo}</td>
                            <td>{viatura.ano}</td>
                            <td>{viatura.proprietario?.name}</td>
                            <td>
                                <div className="d-flex justify-content">
                                    <Link to={`/viatura/${viatura.id}`} className='btn btn-primary me-2'>Editar</Link>
                                    <Link to={`/manutencao/${viatura.id}`} className='btn btn-primary me-2'>Marcar</Link>
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

export default ViaturasList;