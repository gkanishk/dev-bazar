export interface response {
    statusCode: number,
    response: Array<any>|Object|undefined,
    message: string
}

export interface products {
    name: string,
    desc: string,
    discount: number,
    price: number,
    quantity: number,
    attributes: Object| any,
    category: string
}

export interface userDetails {
    name: string,
    email: string,
    password: string,
}