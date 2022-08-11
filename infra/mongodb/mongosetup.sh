USE="$SERVICE_DB"
echo "**********************************************" "$SERVICE_DB_URL"

echo SETUP.sh time now: "$(date +"%T")"
case ${USE} in

  "balance") mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');
db.$SERVICE_DB.insertMany([
  {
    total: 100,
    userId: "1",
    transactions: [
      {
        transactionId: "init",
        refillSum: 100,
        transactionTime: {
          $date: {
            $numberLong: 1659072648876
          }
        },
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
;;
  "products") mongosh --host "$SERVICE_DB_URL":27017 -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
db = db.getSiblingDB('$SERVICE_DB');

db.products.insertMany([
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

;;
esac