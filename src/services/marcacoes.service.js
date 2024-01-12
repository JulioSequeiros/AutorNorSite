import axios from "axios";

const API_URL = "https://gestao-viaturas-manutencao.vercel.app/api/marcacoes";

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
};

const getById = (number) => {
    return axios.get(API_URL + number);
};

const createORupdate = (id, data, descricao, viatura, viaturaId) => {
    if(id == null){
        return create(data, descricao, viatura, viaturaId);
    }
    else {
        return update(id, data, descricao, viatura, viaturaId);
    }
};

const create = (data, descricao, viatura, viaturaId) => {
    return axios.post(API_URL + "create", { data, descricao, viatura, viaturaId });
};

const update = (id, data, descricao, viatura, viaturaId) => {
    return axios.put(API_URL + "update", { id, data, descricao, viatura, viaturaId });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const MarcacoesService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default MarcacoesService;