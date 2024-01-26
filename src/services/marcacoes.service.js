import axios from "axios";

const API_URL = "http://localhost:8081/api/marcacoes/";

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

const createORupdate = (id, data, descricao, viatura, viaturaId, categoriaId) => {
    if(id == null){
        return create(data, descricao, viatura, viaturaId, categoriaId);
    }
    else {
        return update(id, data, descricao, viatura, viaturaId, categoriaId);
    }
};

const create = (data, descricao, viatura, viaturaId, categoriaId) => {
    return axios.post(API_URL + "create", { data, descricao, viaturaid: Number(viaturaId), categoriaId: Number(categoriaId) });
};

const update = (id, data, descricao, viatura, viaturaId, categoriaId) => {
    return axios.put(API_URL + "update", { id, data, descricao, viatura, viaturaid: Number(viaturaId), categoriaId: Number(categoriaId) });
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