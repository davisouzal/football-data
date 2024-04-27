export interface IError {
    message: string;
}

export interface IRestrictedError extends IError {
    status: number;
    message: string;
}