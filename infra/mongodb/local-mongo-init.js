
/*****************************Init Database for balance****************************************************************/

db = db.getSiblingDB('balance');
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
db.createCollection('balances');

db.balances.insertMany([
    {
        total: 2150,
        userId: ObjectId("62e370f465eec4910c2ba2e1"),
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
/*****************************End init of Database for balance*********************************************************/


/*****************************Init Database for other microservices****************************************************/
/*...*/
/**********************************************************************************************************************/