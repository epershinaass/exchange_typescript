set -e

mongo_Balance () {
  mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD << EOF
  use $SERVICE_DB;
  db.createUser({
    user: '$SERVICE_USER',
    pwd: '$SERVICE_PASSWORD',
    roles: [{ role: 'readWrite', db: '$SERVICE_DB'}],
  });

  use admin;
  db.createUser(
    {
      user: 'mongodb_exporter',
      pwd: '$MONGODB_EXPORTER_PASSWORD',
      roles: [
          { role: 'clusterMonitor', db: 'admin' },
          { role: 'read', db: 'local' }
      ]
    }
  )
EOF
  mongo -u $SERVICE_USER -p $SERVICE_PASSWORD --authenticationDatabase $SERVICE_DB<< EOF
  use $SERVICE_DB;

  db.balances.insert({
                       "_id": ObjectId("62e36f4a65eec4910c2ba2e0"),
                       "total": 2150,
                       "userId": ObjectId("62e370f465eec4910c2ba2e1"),
                       "transactions": [
                         {
                           "transactionId": "ipsum in do",
                           "refillSum": 100,
                           "transactionTime": {
                             "$date": {
                               "$numberLong": "1659072648876"
                             }
                           },
                           "_id": ObjectId("62e3708890675efdf716f5a8")

                         },
                         {
                           "transactionId": "qwe123",
                           "refillSum": 25,
                           "transactionTime": {
                             "$date": {
                               "$numberLong": "1659075273087"
                             }
                           },
                           "_id": ObjectId("62e37ac990675efdf716f5ad")

                         },
                         {
                           "transactionId": "tempor ullamco laboris laborum culpa",
                           "refillSum": 2000,
                           "transactionTime": {
                             "$date": {
                               "$numberLong": "1659088480057"
                             }
                           },
                           "_id": {
                             "$oid": ObjectId("62e3ae6090675efdf716f5bd")
                           }
                         },
                         {
                           "transactionId": "magna ipsum",
                           "refillSum": 25,
                           "transactionTime": {
                             "$date": {
                               "$numberLong": "1659325183184"
                             }
                           },
                           "_id": ObjectId("62e74aff5f05e26a7a3c5929")
                           }

                       ]
                     });
EOF
}

mongo_Auth () {
  mongo << EOF
  use $SERVICE_DB;
  db.createUser({
    user: '$SERVICE_USER',
    pwd: '$SERVICE_PASSWORD',
    roles: [{ role: 'readWrite', db: '$SERVICE_DB'}],
  });
  db.createCollection('users')
  use admin;
    db.createUser(
      {
        user: 'mongodb_exporter',
        pwd: '$MONGODB_EXPORTER_PASSWORD',
        roles: [
            { role: 'clusterMonitor', db: 'admin' },
            { role: 'read', db: 'local' }
        ]
      }
    )
EOF
}

case $SERVICE_DB in

  balance)
    mongo_Balance
    ;;

  auth)
    mongo_Auth
    ;;
esac