declare namespace Express {
    type CustomUser = import('../models/user.model').IUser;
    interface User extends CustomUser{}
}