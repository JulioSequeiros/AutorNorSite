import axios from "axios";

const API_URL = "https://gestao-viaturas-manutencao.vercel.app/api/manutencoes/";

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = () => {
    return axios.get(API_URL);
}

const getById = (number) => {
    return axios.get(API_URL + number);
};

const createORupdate = (id, descricao, data, custo, viatura, viaturaId, categoria, categoriaId) => {
    if(id == null){
        return create(descricao, data, custo, viatura, viaturaId, categoria, categoriaId);
    }
    else {
        return update(id, descricao, data, custo, viatura, viaturaId, categoria, categoriaId);
    }
};

const create = (descricao, data, custo, viatura, viaturaId, categoria, categoriaId) => {
    return axios.post(API_URL + "create", { descricao, data, custo, viatura, viaturaId, categoria, categoriaId });
};

const update = (id, descricao, data, custo, viatura, viaturaId, categoria, categoriaId) => {
    return axios.put(API_URL + "update", { id, descricao, data, custo, viatura, viaturaId, categoria, categoriaId });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const ManutencoesService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default ManutencoesService;