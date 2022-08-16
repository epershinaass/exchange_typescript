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
        "name": "teapot",
        "quantity": 1,
        _id: ObjectId("62ecda02aded95223f606777")
      }
    ]
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