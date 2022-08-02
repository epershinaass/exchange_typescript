db = db.getSiblingDB('balance');

db.createCollection('balances');

db.balances.insertMany([
    {
        _id: "62e36f4a65eec4910c2ba2e0",
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
                _id: "62e3708890675efdf716f5a8"

            },
            {
                transactionId: "qwe123",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659075273087
                    }
                },
                _id: "62e37ac990675efdf716f5ad"

            },
            {
                transactionId: "tempor ullamco laboris laborum culpa",
                refillSum: 2000,
                transactionTime: {
                    $date: {
                        $numberLong: "1659088480057"
                    }
                },
                _id: "62e3ae6090675efdf716f5bd"

            },
            {
                transactionId: "magna ipsum",
                refillSum: 25,
                transactionTime: {
                    $date: {
                        $numberLong: 1659325183184
                    }
                },
                _id: "62e74aff5f05e26a7a3c5929"
            }

        ]
    }
]);