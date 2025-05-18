export interface IAddress{
    lat: number
    lng: number
}

export interface IFrete{
    id: string
    userId: string
    org: IAddress
    dst: IAddress
    date: Date
    price: number
    crtDate: Date
}