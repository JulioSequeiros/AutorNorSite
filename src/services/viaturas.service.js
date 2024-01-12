import axios from "axios";

const API_URL = "https://gestao-viaturas-manutencao.vercel.app/api/viaturas/";

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

const getByOwnerId = () => {
    return axios.get(API_URL + 'owner/' + localStorage.getItem('id'));
}

const getById = (number) => {
    return axios.get(API_URL + number);
};

const createORupdate = (id, modelo, marca, ano, proprietarioId) => {
    if(id == null){
        return create(modelo, ano, marca, proprietarioId);
    }
    else {
        return update(id, modelo, ano, marca, proprietarioId);
    }
};

const create = (modelo, ano, marca) => {
    return axios.post(API_URL + "create", { modelo, ano: Number(ano), marca, proprietarioId : localStorage.getItem('id') });
};

const update = (id, modelo, ano, marca) => {
    return axios.put(API_URL + "update", { id, modelo, marca, ano : Number(ano), proprietarioId : localStorage.getItem('id') });
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const ViaturasService = {
    getAll,
    getByOwnerId,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default ViaturasService;