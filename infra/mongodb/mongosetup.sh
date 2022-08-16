balance () {
mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.${SERVICE_DB}s.insertMany([
  {
    total: 100,
    userId: "62e370f465eec4910c2ba2e1",
    transactions: [
      {
        transactionId: "init",
        refillSum: 100,
        transactionTime: ISODate("2022-08-11T08:41:50.397Z"),
        _id: ObjectId("62e370f465eec4910c2ba2e1")
      }
    ]
  }
])
db.createUser({
  user: '$SERVICE_USER',
  pwd: '$SERVICE_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$SERVICE_DB',
    },
  ],
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
);
quit();
EOF
}

products () {
mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.$SERVICE_DB.insertMany([
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
  user: '$SERVICE_USER',
  pwd: '$SERVICE_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$SERVICE_DB',
    },
  ],
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
);
quit();
EOF
}

account () {
mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.${SERVICE_DB}s.insertMany([
  {
    "userId": "62ecda02aded95223f606777",
    "login": "first_user",
    "password": "$FIRST_USER_PASSWORD",
    _id: ObjectId("62ecda02aded95223f606777")
  }
]);
db.createUser({
  user: '$SERVICE_USER',
  pwd: '$SERVICE_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$SERVICE_DB',
    },
  ],
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
);
quit();
EOF
}

order () {
mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.createUser({
  user: '$SERVICE_USER',
  pwd: '$SERVICE_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$SERVICE_DB',
    },
  ],
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
);
quit();
EOF
}

echo "**********************************************" "$SERVICE_DB_URL"

echo SETUP.sh time now: "$(date +"%T")"
if [[ "$SERVICE_DB" == "balance" ]]; then
  balance
elif [[ "$SERVICE_DB" == "products" ]]; then
  products
elif [[ "$SERVICE_DB" == "account" ]]; then
  account
elif [[ "$SERVICE_DB" == "order" ]]; then
  order
fi