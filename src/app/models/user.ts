export class User {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public classRow?: string;
    email!: string;
    password!: string;
    name!: string;
    token!: string;
    role!: string;
    last_login!: Date;
}