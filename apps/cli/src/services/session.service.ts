import SessionDataSource from '../datasources/session.datasource';

import UserService from './user.service';

export default class SessionService {
    public static async getSession() {
        const session = await SessionDataSource.getUserSession();
        return session;
    }

    public static async patchSession(username: string) {
        let data = {
            id: 0,
            username: '',
        }

        // get user data by username
        if (username !== '') {
            let dataUser = await UserService.getUserByUsername(username);

            // check if user is not null
            if (dataUser === undefined) {
                dataUser = await UserService.createUser(username);
            }

            data = {
                id: dataUser.id,
                username: dataUser.username,
            };
        }

        // patch session
        const session = await SessionDataSource.patchUserSession(data.id, data.username);
        return session;
    }
}