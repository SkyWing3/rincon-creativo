export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    // Campos adicionales provenientes del modelo Laravel
    first_name?: string | null;
    f_last_name?: string | null;
    s_last_name?: string | null;
    phone?: string | null;
    departamento?: string | null;
    city?: string | null;
    address?: string | null;
    role?: string | null;
    photo_url?: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
};
