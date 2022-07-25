set -e

mongo_Balance () {
  mongo <<EOF
  use $SERVICE_DB;
  db.createUser({
    user: '$SERVICE_USER',
    pwd: '$SERVICE_PASSWORD',
    roles: [{ role: 'readWrite', db: '$SERVICE_DB'}],
  });
  db.createCollection('balance')
EOF
}

mongo_Auth () {
  mongo <<EOF
  use $SERVICE_DB;
  db.createUser({
    user: '$SERVICE_USER',
    pwd: '$SERVICE_PASSWORD',
    roles: [{ role: 'readWrite', db: '$SERVICE_DB'}],
  });
  db.createCollection('users')
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