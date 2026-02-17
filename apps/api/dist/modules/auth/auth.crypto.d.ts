export declare function hashPassword(password: string): Promise<{
    hash: string;
    salt: string;
}>;
export declare function verifyPassword(password: string, salt: string, hash: string): Promise<boolean>;
