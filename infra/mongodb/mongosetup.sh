balance () {
mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.$SERVICE_DB.insertMany([
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
    "userId": "1",
    "products": [
      {
        "name": "init",
        "quantity": 1
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

echo "**********************************************" "$SERVICE_DB_URL"

echo SETUP.sh time now: "$(date +"%T")"
if [[ "$SERVICE_DB" == "balance" ]]; then
  balance
elif [[ "$SERVICE_DB" == "products" ]]; then
  products
fi