echo "**********************************************" ${SERVICE_DB_URL}

echo SETUP.sh time now: $(date +"%T")
mongosh --host ${SERVICE_DB_URL}:27017 -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} <<EOF

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
