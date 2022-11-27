export type loginUserType = {
    email: string
    password: string
}

export type registerUserType = {
    name:string
    email: string
    password: string
}

export type editUserType = {
    name? : string
    pic? : string
}


export type UserType = {
    _id: string,
    name: string,
    email: string,
    pic: string,
    token: string
    createdAt?: string
}