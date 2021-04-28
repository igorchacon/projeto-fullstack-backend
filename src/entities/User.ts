export type Authentication = {
    id: string
};

export type User = {
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
};

export interface SignupInputDTO {
    name: string,
    email: string,
    nickname: string,
    password: string
}