export interface User {
    username: string;
    email: string;
    password: string;
    admin: boolean;
}

export interface UserDto {
    id: number;
    username: string;
    email: string;
    admin: boolean;
}

export interface AuthResponse {
    msg: string;
    token?: string;
    username?: string;
    error?: string;
}