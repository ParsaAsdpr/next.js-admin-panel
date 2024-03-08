import User from "./User";

type UsersResponseType = {
    page: number;
    limit: number;
    totalUsers: number;
    totalPages: number;
    users: User[];
}

export default UsersResponseType;