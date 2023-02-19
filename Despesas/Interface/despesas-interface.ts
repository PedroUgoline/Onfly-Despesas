import { Request } from "@hapi/hapi";

export interface UserLogin extends Request{
    headers: {
        user:string;
        password:string;
    }
}

export interface DespesasIdRequest extends UserLogin{
    params: {
        id:string;
    }
}

export interface CreateDespesasRequest extends UserLogin {
    payload:{
        id: string;
        description:string;
        date: Date;
        value:number;
    }
}
export interface UpdateDespesasRequest extends UserLogin {
    payload:{
        id: string;
        description:string;
        date: Date;
        value:number;
    }
}