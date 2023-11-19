export class User {
    public id: number | undefined;
    public createdAt?: Date;
    public updatedAt?: Date;
    public login: string = '';
    email!: string;
    password!: string;
    name!: string;
    token!: string;
    userid: number | undefined;
    user: string | undefined;
}