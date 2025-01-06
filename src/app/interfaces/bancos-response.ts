export interface BancosResponse {
    content: Content[]
    pageable: Pageable
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: Sort
    numberOfElements: number
    first: boolean
    empty: boolean
}

interface Content {
    id: number
    status: Status
    descricao: string
    codigo: string
}

interface Status {
    id: string
    descricao: string
}

interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    paged: boolean
    unpaged: boolean
}

interface Sort {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}
