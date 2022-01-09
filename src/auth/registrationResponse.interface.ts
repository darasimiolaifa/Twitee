export interface RegistrationResponse {
    user: User;
    token: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    created_at: Date;
}
