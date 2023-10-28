export class User {
    public id: number | undefined = 0;
    public createdAt?: Date;
    public updatedAt?: Date;
    public login: string = '';
    email!: string;
    password!: string;
    name!: string;
    token!: string;
}