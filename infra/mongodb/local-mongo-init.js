
/*****************************Init Database for balance****************************************************************/

db = db.getSiblingDB('balance');

db.balances.insertMany([
    {
        total: 2150,
        frozen: 500,
        userId: "62e370f465eec4910c2ba2e1",
        transactions: [
            {
                transactionId: "62e660f465eec4910c2ba2e1",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "62e370f465vvc4910c2ba2e1",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            },
            {
                transactionId: "62e370f465eec4910r4ba2e1",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")

            },
            {
                transactionId: "11e370f465eec4910c2ba2e1",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e1")
            }

        ]
    },
    {
        total: 3333,
        frozen: 500,
        userId: "62ecda02aded95223f606888",
        transactions: [
            {
                transactionId: "62e370f465eec4910c2ba3er",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "62e370f465eec4910c2ba211",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "62e370f465eec4910c2baeee",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")

            },
            {
                transactionId: "62e370f465eec4910c2ba2pp",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e2")
            }

        ]
    },
    {
        total: 4444,
        frozen: 500,
        userId: "62ecda02aded95223f606444",
        transactions: [
            {
                transactionId: "62e370f465eec4910c2bacce",
                refillSum: 100,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "62e370f465eec4910c2barer",
                refillSum: 25,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "62e370f465eec4df0c2ba2e1",
                refillSum: 2000,
                transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
                _id: ObjectId("62e370f465eec4910c2ba2e3")

            },
            {
                transactionId: "62vb70f465eec4910c2ba2e1",
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
        "userId": "62e370f465eec4910c2ba2e1",
        "products": [
        {
            "productId": "62f205e225c56cb7b3157888",
            "quantity": 3,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        {
            "productId": "62f205e225c56cb7b3157882",
            "quantity": 1,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        ],
        "frozenProducts": [
            {
                "productId": "62f205e225c56cb7b3157888",
                "quantity": 1,
                _id: ObjectId("62ecda02aded95223f606777")
            }
        ]
    },
    {
        "userId": "62ecda02aded95223f606888",
        "products": [
        {
            "productId": "62f205e225c56cb7b3157811",
            "quantity": 10,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        {
            "productId": "62f205e225c56cb7b3157886",
            "quantity": 50,
            _id: ObjectId("62ecda02aded95223f606777")
        }
        ],
        "frozenProducts": [
            {
                "productId": "62f205e225c56cb7b3157886",
                "quantity": 10,
                _id: ObjectId("62ecda02aded95223f606777")
            }
        ]
    },
    {
        "userId": "62ecda02aded95223f606444",
        "products": [
        {
            "productId": "62f205e225c56cb7b3157884",
            "quantity": 100,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        {
            "productId": "62f205e225c56cb7b3157883",
            "quantity": 14,
            _id: ObjectId("62ecda02aded95223f606777")
        },
        ],
        "frozenProducts": []
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

db.orders.insertMany([
    {
        _id: ObjectId("63036ea40d5405a603a10726"),
        "isFrozen": false,
        "orderId": "630364440d5405a603a10726",
        "userId": "62e370f465eec4910c2ba2e1",
        "productId": "62f205e225c56cb7b3157888",
        "quantity": 1,
        "cost": 765,
        "orderType": 1,
        "isFullSize": true,
      },
      {
        _id: ObjectId("63036ea40d5405a603a10722"),
        "isFrozen": false,
        "orderId": "630364440d5405a603a10727",
        "userId": "62ecda02aded95223f606888",
        "productId": "62f205e225c56cb7b3157888",
        "quantity": 1,
        "cost": 765,
        "orderType": 0,
        "isFullSize": true,
      },
      {
        _id: ObjectId("63036ea40d5405a603a10720"),
        "isFrozen": false,
        "orderId": "630364440d5405a603a10272",
        "userId": "62ecda02aded95223f606444",
        "productId": "62f205e225c56cb7b3157884",
        "quantity": 10,
        "cost": 600,
        "orderType": 1,
        "isFullSize": true,
      },
      {
        _id: ObjectId("63036ea40d5405a603a10799"),
        "isFrozen": false,
        "orderId": "630364440d5405a603a10200",
        "userId": "62ecda02aded95223f606888",
        "productId": "62f205e225c56cb7b3157886",
        "quantity": 20,
        "cost": 300,
        "orderType": 1,
        "isFullSize": true,
      }
]);


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