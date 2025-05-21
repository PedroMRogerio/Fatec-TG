export interface IUserClient{
    uid: string     //id firebase
    name: string
    email: string
    cpf: string
}

export interface IUserContext{
    uid: string     
    name: string
    email: string
    cpf: string
    cnh?: string
}