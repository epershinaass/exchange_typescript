
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
                transactionTime: {
                    $date: {
                        $numberLong: 1659072648876
                    }
                },

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659075273087
                    }
                },

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: {
                    $date: {
                        $numberLong: "1659088480057"
                    }
                },

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659325183184
                    }
                },
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
                transactionTime: {
                    $date: {
                        $numberLong: 1659072648876
                    }
                },

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659075273087
                    }
                },

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: {
                    $date: {
                        $numberLong: "1659088480057"
                    }
                },

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659325183184
                    }
                },
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
                transactionTime: {
                    $date: {
                        $numberLong: 1659072648876
                    }
                },

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659075273087
                    }
                },

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: {
                    $date: {
                        $numberLong: "1659088480057"
                    }
                },

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659325183184
                    }
                },
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


/*****************************Init Database for other microservices****************************************************/
/*...*/
db = db.getSiblingDB('products');
db.products.insertMany([
    {
        "userId": "62ecda02aded95223f606777",
        "products": [
          {
            "name": "magna",
            "quantity": 946
          },
          {
            "name": "labore Ut officia adipisicing",
            "quantity": 1327456
          },
          {
            "name": "non aliquip sint",
            "quantity": 43
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
/**********************************************************************************************************************/
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