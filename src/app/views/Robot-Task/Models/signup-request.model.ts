export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    roles?: string[];
}
