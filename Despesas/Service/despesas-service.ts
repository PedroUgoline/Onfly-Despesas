import { entity } from '../Entities/entities';

export const getAllDespesas = async (userId) => {
    return await entity.Despesas.filter( item => item.userId === userId);
};
export const getDespesasByIdentifier = async (despesasIndentifier) => {
    return await entity.Despesas.filter( item => item.id === despesasIndentifier);
};
export const createDespesas = async ({ id, description, date, value, userId }) => {
    const despesasCreate = {
        id, description, date, value, userId
    };
    // Como não estou usando o banco, teria que ser inserido a mão no arquivo "entities.ts"
    entity.Despesas.push(despesasCreate);
    return despesasCreate;
};
export const updateDespesas = async ({ id, description, date, value }) => {
    const despesasUpdate =  {
        id, description, date, value
    };
    // Como não estou usando o banco, teria que ser alterado a mão no arquivo "entities.ts"
    const enitityNotChanged = entity.Despesas.filter(item => item.id === id)[0];
    enitityNotChanged.description = despesasUpdate.description;
    enitityNotChanged.date = despesasUpdate.date;
    enitityNotChanged.value = despesasUpdate.value;

    return despesasUpdate;
};
export const deleteDespesas = async (id) => {
    delete entity.Despesas.filter(item => item.id === id)[0];
};
export const verifyUserAndPassword = async (user, password) => {
    const verifyUser = entity.Users.filter(item => item.User === user);

    if(verifyUser.length < 1){
        return false;
    }

    if(password !== verifyUser[0].Password){
        return {
            status: false
        }
    }
    return {
        status: true
    }
};
export const verifyOwner = async (userId, id) => {
    const verify = entity.Despesas.filter(item => item.id === id)[0];
    if(verify.userId === userId){
        return true;
    }
    return false;
};