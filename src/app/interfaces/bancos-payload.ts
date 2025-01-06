export interface BancosPayload {
    id?: number,
    status: Status,
    descricao: string,
    codigo: string
}

interface Status {
    id: string,
    descricao?: string
}