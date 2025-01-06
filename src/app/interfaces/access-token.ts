export interface AccessToken {
    exp: number
    iat: number
    jti: string
    iss: string
    sub: string
    typ: string
    azp: string
    session_state: string
    scope: string
    sid: string
    name: string
    groups: string[]
    preferred_username: string
    given_name: string
    family_name: string
    authorities: string[]
}