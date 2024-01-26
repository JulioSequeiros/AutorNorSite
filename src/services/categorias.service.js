import axios from "axios";

const API_URL = "http://localhost:8081/api/categorias/";

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = (number) => {
    return axios.get(API_URL);
};


const getById = (number) => {
    return axios.get(API_URL + number);
};

const createORupdate = (id, nome, manutencoes) => {
    if(id == null){
        return create(nome, manutencoes);
    }
    else {
        return update(id, nome, manutencoes);
    }
};

const create = (nome, manutencoes) => {
    return axios.post(API_URL + "create", { nome, manutencoes });
};

const update = (id, nome, manutencoes) => {
    return axios.put(API_URL + "update", { id, nome, manutencoes });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const CategoriasService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default CategoriasService;