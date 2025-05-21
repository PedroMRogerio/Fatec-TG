export interface IAddress{
    lat: number
    lng: number
}

export interface IFrete{
    id: string
    uid: string
    uidProv:string
    org: IAddress
    dst: IAddress
    date: Date
    plate: string
    type: string
    size: string
    price: number
    crtDate: Date
}