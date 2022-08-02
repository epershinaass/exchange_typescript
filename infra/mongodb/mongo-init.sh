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