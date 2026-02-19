declare module 'express' {
  export interface Request {
    ip?: string;
    get(name: string): string | undefined;
    user?: {
      id: string;
      email?: string;
    };
  }
}
