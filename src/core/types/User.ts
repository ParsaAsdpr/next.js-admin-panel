import Role from "./Role";

type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    roleId: number;
    createdAt: string;
    lastLogin: string;
    isActive: boolean;
}

export default User;