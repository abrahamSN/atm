import TransactionDataSource from "../../src/datasources/transaction.datasource";

import SessionService from "../../src/services/session.service";
import TransactionService from "../../src/services/transaction.service";
import UserService from "../../src/services/user.service";

describe("Transaction Service", () => {
    const expectedResUser = {
        id: 2,
        username: "test",
    };

    const expectedRes = {
        id: 1,
        type: "deposit",
        amount: 100,
        user_id: 1,
        to_id: 1,
    };

    const expectedResTransfer = {
        id: 1,
        type: "transfer",
        amount: 100,
        user_id: 1,
        to_id: 2,
    };

    const expectedResList = [
        expectedRes,
        expectedResTransfer,
    ];

    const expectedResListToId = [
        expectedResTransfer,
    ];

    const expectedResListEmpty: never[] = [];

    const expectedResTransferInsufficient = "Insufficient balance";
    
    const expectedResTransferAccountNotFound = "account is not found";

    it("should be return list of transaction while getAllTransactionByUserId", async () => {
        // arrange
        jest
            .spyOn(TransactionDataSource, "getAllTransactionByUserId")
            .mockResolvedValue(expectedResList);

        // act
        const actual = await TransactionService.getAllTransactionByUserId(
            expectedRes.user_id
        );

        // assert
        expect(actual).toEqual(expectedResList);
        expect(typeof actual[0].id).toBe("number");
        expect(typeof actual[0].type).toBe("string");
        expect(typeof actual[0].amount).toBe("number");
        expect(typeof actual[0].user_id).toBe("number");
        expect(typeof actual[0].to_id).toBe("number");
    });

    it("should be return list of transaction while getAllTransactionByToId", async () => {
        // arrange
        jest.spyOn(TransactionDataSource, "getAllTransactionByToId").mockResolvedValue(expectedResListToId);

        // act
        const actual = await TransactionService.getAllTransactionByToId(
            expectedResTransfer.to_id
        );

        // assert
        expect(actual).toEqual(expectedResListToId);
        expect(typeof actual[0].id).toBe("number");
        expect(typeof actual[0].type).toBe("string");
        expect(typeof actual[0].amount).toBe("number");
        expect(typeof actual[0].user_id).toBe("number");
        expect(typeof actual[0].to_id).toBe("number");
    });

    it("should be return empty list of transaction while getAllTransactionByUserId", async () => {
        // arrange
        jest
            .spyOn(TransactionDataSource, "getAllTransactionByUserId")
            .mockResolvedValue(expectedResListEmpty);

        // act
        const actual = await TransactionService.getAllTransactionByUserId(
            expectedRes.user_id
        );

        // assert
        expect(actual).toEqual(expectedResListEmpty);
    });

    it("should be return empty list of transaction while getAllTransactionByToId", async () => {
        // arrange
        jest
            .spyOn(TransactionDataSource, "getAllTransactionByToId")
            .mockResolvedValue(expectedResListEmpty);

        // act
        const actual = await TransactionService.getAllTransactionByToId(
            expectedRes.to_id
        );

        // assert
        expect(actual).toEqual(expectedResListEmpty);
    });

    it("should be return object of transaction while createTransaction", async () => {
        // arrange
        jest
            .spyOn(SessionService, "getSession")
            .mockResolvedValue({ id: 1 });
        jest.spyOn(UserService, "getBalance").mockResolvedValue(100);
        jest.spyOn(UserService, "getUserByUsername").mockResolvedValue(expectedResUser);
        jest
            .spyOn(TransactionDataSource, "createTransaction")
            .mockResolvedValue(expectedResTransfer);

        // act
        const actual = await TransactionService.createTransaction(
            expectedResTransfer.amount,
            expectedResTransfer.type,
            expectedResUser.username
        );

        // assert
        expect(actual).toEqual(expectedResTransfer);
        expect(typeof actual.id).toBe("number");
        expect(typeof actual.type).toBe("string");
        expect(typeof actual.amount).toBe("number");
        expect(typeof actual.user_id).toBe("number");
        expect(typeof actual.to_id).toBe("number");
    });

    it("shoud be return error while createTransaction with insufficient balance", async () => {
        // arrange
        jest
            .spyOn(SessionService, "getSession")
            .mockResolvedValue({ id: 1 });
        jest
            .spyOn(UserService, "getBalance")
            .mockResolvedValue(10);
        jest
            .spyOn(UserService, "getUserByUsername")
            .mockResolvedValue(expectedResUser);
        jest
            .spyOn(TransactionDataSource, "createTransaction")
            .mockResolvedValue(expectedResTransfer);

        // act
        const actual = await TransactionService.createTransaction(
            expectedResTransfer.amount,
            expectedResTransfer.type,
            expectedResUser.username
        );

        // assert
        expect(actual).toEqual(expectedResTransferInsufficient);
    });

    it("should be return error while createTransaction with unknown to_account", async () => {
        // arrange
        jest
            .spyOn(SessionService, "getSession")
            .mockResolvedValue({ id: 1 });
        jest
            .spyOn(UserService, "getBalance")
            .mockResolvedValue(100);
        jest
            .spyOn(UserService, "getUserByUsername")
            .mockResolvedValue(undefined);
        jest
            .spyOn(TransactionDataSource, "createTransaction")
            .mockResolvedValue(expectedResTransfer);
        
        // act
        const actual = await TransactionService.createTransaction(
            expectedResTransfer.amount,
            expectedResTransfer.type,
            expectedResUser.username
        );

        // assert
        expect(actual).toEqual(expectedResTransferAccountNotFound);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});