// Define a User type for better type safety
export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
    customToken: string; // The token returned by your backend
}

// Define a custom Token type to extend NextAuth's default token
export interface CustomToken {
    name?: string;
    email?: string;
    picture?: string;
    sub?: string;
    accessToken?: string; // Custom access token
}
