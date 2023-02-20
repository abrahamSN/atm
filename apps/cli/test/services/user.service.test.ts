import TransactionDataSource from "../../src/datasources/transaction.datasource";
import UserDataSource from "../../src/datasources/user.datasource";

import UserService from "../../src/services/user.service";

describe('User Service', () => {
    const expectedRes = {
        id: 1,
        username: 'test',
    };

    const expectResBalance = 100;

    const expectResAllTransaction = [
        {
            id: 1,
            type: 'deposit',
            amount: 100,
            user_id: 1,
        },
        {
            id: 2,
            type: 'withdraw',
            amount: 100,
            user_id: 1,
        },
    ];

    const expectResAllTransactionToId = [
        {
            id: 3,
            type: 'transfer',
            amount: 100,
            user_id: 2,
            to_id: 1,
        },
    ];


    it('should be return object of user while getUser', async () => {
        // arrange
        jest.spyOn(UserDataSource, 'getUserByUsername').mockResolvedValue(expectedRes);

        // act
        const actual = await UserService.getUserByUsername(expectedRes.username);

        // assert
        expect(actual).toEqual(expectedRes);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    it('should be return object of user while createUser', async () => {
        // arrange
        jest.spyOn(UserDataSource, 'createUser').mockResolvedValue(expectedRes);

        // act
        const actual = await UserService.createUser(expectedRes.username);

        // assert
        expect(actual).toEqual(expectedRes);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.username).toBe("string");
    });

    it('should be return number of balance while getBalance', async () => {
        // arrange
        jest.spyOn(UserDataSource, 'getUserByUsername').mockResolvedValue(expectedRes);
        jest.spyOn(TransactionDataSource, 'getAllTransactionByUserId').mockResolvedValue(expectResAllTransaction);
        jest.spyOn(TransactionDataSource, 'getAllTransactionByToId').mockResolvedValue(expectResAllTransactionToId);

        // act
        const actual = await UserService.getBalance();
        
        // assert
        expect(actual).toEqual(expectResBalance);
        expect(typeof actual).toBe("number");
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});

