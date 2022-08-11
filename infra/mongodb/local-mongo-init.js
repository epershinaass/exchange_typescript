
/*****************************Init Database for balance****************************************************************/

db = db.getSiblingDB('balance');

db.balances.insertMany([
    {
        total: 2150,
        userId: "62e370f465eec4910c2ba2e1",
        transactions: [
            {
                transactionId: "ipsum in do",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            }

        ]
    },
    {
        total: 3333,
        userId: "62e370f465eec4910c2ba2e2",
        transactions: [
            {
                transactionId: "ipsum in do",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")
            }

        ]
    },
    {
        total: 4444,
        userId: "62e370f465eec4910c2ba2e3",
        transactions: [
            {
                transactionId: "ipsum in do",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")
            }
        ]
    }
]);

db.createUser({
    user: 'balance',
    pwd: 'balance',
    roles: [
        {
            role: 'readWrite',
            db: 'balance',
        },
    ],
});
/*****************************End init of Database for balance*********************************************************/


/*****************************Init Database for products****************************************************************/

db = db.getSiblingDB('products');
db.products.insertMany([
    {
        "userId": "62ecda02aded95223f606777",
        "products": [
        {
            "name": "magna",
            "quantity": 946,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        {
            "name": "labore Ut officia adipisicing",
            "quantity": 1327456,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        {
            "name": "non aliquip sint",
            "quantity": 43,
            _id: ObjectId("62ecda02aded95223f606777")
        }
        ]
    }
]);

db.createUser({
    user: 'products',
    pwd: 'products',
    roles: [
        {
            role: 'readWrite',
            db: 'products',
        },
    ],
});
/*****************************End init of Database for products*********************************************************/

/*****************************Init Database for account****************************************************************/

db = db.getSiblingDB('account');
db.accounts.insertMany([
    {
        "userId": "62ecda02aded95223f606777",
        "login": "vasya",
        "password": "secret",
        _id: ObjectId("62ecda02aded95223f606777")
    }
]);

db.createUser({
    user: 'account',
    pwd: 'account',
    roles: [
        {
            role: 'readWrite',
            db: 'account',
        },
    ],
});
/*****************************End init of Database for account*********************************************************/

/*****************************Init Database for other microservices****************************************************/
/*...*/
/**********************************************************************************************************************/
