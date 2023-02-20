import SessionDataSource from '../../src/datasources/session.datasource';

import SessionService from '../../src/services/session.service';
import UserService from '../../src/services/user.service';

describe('SessionService', () => {
    const expectedRes = {
        id: 1,
        username: 'test',
    };

    const expectedResDelete = {
        id: 0,
        username: '',
    };

    it('should be return object of session user while getSession', async () => {
        // arrange
        jest.spyOn(SessionDataSource, 'getUserSession').mockResolvedValue(expectedRes);

        // act
        const actual = await SessionService.getSession();

        // assert
        expect(actual).toEqual(expectedRes);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    it('should be return object of session user while patchSession with user exist', async () => {
        // arrange
        jest.spyOn(UserService, 'getUserByUsername').mockResolvedValue(expectedRes);
        jest.spyOn(SessionDataSource, 'patchUserSession').mockResolvedValue(expectedRes);

        // act
        const actual = await SessionService.patchSession(expectedRes.username);

        // assert
        expect(actual).toEqual(expectedRes);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    it('should be return object of session user while patchSession with user not exist', async () => {
        // arrange
        jest.spyOn(UserService, 'getUserByUsername').mockResolvedValue(undefined);
        jest.spyOn(UserService, 'createUser').mockResolvedValue(expectedRes);
        jest.spyOn(SessionDataSource, 'patchUserSession').mockResolvedValue(expectedRes);

        // act
        const actual = await SessionService.patchSession(expectedRes.username);

        // assert
        expect(actual).toEqual(expectedRes);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    it('should be return object of session user while deleteSession', async () => {
        // arrange
        jest.spyOn(SessionDataSource, 'patchUserSession').mockResolvedValue(expectedResDelete);
        
        // act
        const actual = await SessionService.patchSession('');

        // assert
        expect(actual).toEqual(expectedResDelete);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

});

