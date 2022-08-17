
/*****************************Init Database for balance****************************************************************/

db = db.getSiblingDB('balance');

db.balances.insertMany([
    {
        total: 2150,
        frozen: 500,
        userId: "62e370f465eec4910c2ba2e1",
        transactions: [
            {
                transactionId: "ipsum in do",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "qwe123",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")

            },
            {
                transactionId: "magna ipsum",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            }

        ]
    },
    {
        total: 3333,
        frozen: 500,
        userId: "62e370f465eec4910c2ba2e2",
        transactions: [
            {
                transactionId: "ipsum in do",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "qwe123",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "magna ipsum",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")
            }

        ]
    },
    {
        total: 4444,
        frozen: 500,
        userId: "62e370f465eec4910c2ba2e3",
        transactions: [
            {
                transactionId: "ipsum in do",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "qwe123",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "magna ipsum",
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
            "productId": "62f205e225c56cb7b3157888",
            "quantity": 1,
            _id: ObjectId("62ecda02aded95223f606777")
        }
        ]
    }
]);

db.catalogs.insertMany([
    {
        "name": "BTC",
        "productId": "62f205e225c56cb7b3157888",
        _id: ObjectId("62ecda02aded95223f606777")
    },
    {
        "name": "ETH",
        "productId": "62f205e225c56cb7b3157881",
        _id: ObjectId("62ecda02aded95223f606711")
    },
    {
        "name": "XMR",
        "productId": "62f205e225c56cb7b3157882",
        _id: ObjectId("62ecda02aded95223f606712")
    },
    {
        "name": "USDT",
        "productId": "62f205e225c56cb7b3157883",
        _id: ObjectId("62ecda02aded95223f606713")
    },
    {
        "name": "ADA",
        "productId": "62f205e225c56cb7b3157884",
        _id: ObjectId("62ecda02aded95223f606714")
    },
    {
        "name": "ZEC",
        "productId": "62f205e225c56cb7b3157885",
        _id: ObjectId("62ecda02aded95223f606715")
    },
    {
        "name": "DOT",
        "productId": "62f205e225c56cb7b3157886",
        _id: ObjectId("62ecda02aded95223f606716")
    },
    {
        "name": "AVAX",
        "productId": "62f205e225c56cb7b3157887",
        _id: ObjectId("62ecda02aded95223f606717")
    },
    {
        "name": "UNI",
        "productId": "62f205e225c56cb7b3157811",
        _id: ObjectId("62ecda02aded95223f606718")
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

/*****************************Init Database for order****************************************************************/
db = db.getSiblingDB('order');
db.createUser({
    user: 'order',
    pwd: 'order',
    roles: [
        {
            role: 'readWrite',
            db: 'order',
        },
    ],
});
/*****************************End init of Database for order*********************************************************/

/*****************************Init Database for other microservices****************************************************/
/*...*/
/**********************************************************************************************************************/