import React, { useState, useEffect } from 'react';
import MarcacoesService from "../../../services/marcacoes.service";
import { Link } from 'react-router-dom';
import marcacao from "./marcacao.jsx";
import moment from "moment";
import Randomizer from '../../shared/Randomizer.jsx';
import numberGenerator from "../../shared/NumberGenerator.jsx";
import viatura from "../Viaturas/viatura.jsx";
import NumberGenerator from "../../shared/NumberGenerator.jsx";


const MarcacoesList = () => {
    const [marcacoes, setMarcacoes] = useState([]);

    const texts = [
        'Manutenção',
        'Inspeção',
        'Revesião',
    ];

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
                        <th scope="col">Tipo de Manutenção</th>
                        <th scope="col">Preco</th>
                    </tr>
                    </thead>

                    <tbody>
                    {marcacoes.map((marcacao) => (
                        <tr key={marcacao.id}>
                            <td>{formattedTime}</td>
                            <td>{marcacao.descricao}</td>
                            <td>{marcacao.viatura.marca}</td>
                            <td>{marcacao.viatura.modelo}</td>
                            <td><Randomizer texts={texts} /></td>
                            <td><NumberGenerator /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default MarcacoesList;