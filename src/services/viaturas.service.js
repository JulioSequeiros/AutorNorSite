import axios from "axios";

const API_URL = "https://gestao-viaturas-manutencao.vercel.app/api/viaturas";

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

const createORupdate = (id, modelo, ano, proprietarioId) => {
    if(id == null){
        return create(modelo, ano, proprietarioId);
    }
    else {
        return update(id, modelo, ano, proprietarioId);
    }
};

const create = (modelo, ano, proprietarioId) => {
    return axios.post(API_URL + "create", { modelo, ano, proprietarioId });
};

const update = (id, modelo, ano, proprietarioId) => {
    return axios.put(API_URL + "update", { id, modelo, ano, proprietarioId });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const ViaturasService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default ViaturasService;