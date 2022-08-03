MONGODB1=mongo1-balance
MONGODB2=mongo2-balance
MONGODB3=mongo3-balance

echo "**********************************************" ${MONGODB1}

echo SETUP.sh time now: $(date +"%T")
mongosh --host ${MONGODB1}:27017 -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} <<EOF
var cfg = {
    "_id": "rs1",
    "protocolVersion": 1,
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "${MONGODB1}:27017",
            "priority": 1
        },
        {
            "_id": 1,
            "host": "${MONGODB2}:27017",
            "priority": 0
        },
        {
            "_id": 2,
            "host": "${MONGODB3}:27017",
            "priority": 0,
        }
    ]
};
rs.initiate(cfg, { force: true });
rs.secondaryOk();
db.getMongo().setReadPref('primary');
rs.reconfig(cfg);

db = db.getSiblingDB('${BALANCE_DB}');
db.createUser({
  user: 'balance',
  pwd: 'v7tD3CiprwaWpDe7VoSk43Ea',
  roles: [
    {
      role: 'readWrite',
      db: 'balance',
    },
  ],
});
use admin;
db.createUser(
  {
    user: 'mongodb_exporter',
    pwd: '4TWVDHzxuoEgvTr2dZzEcUdv',
    roles: [
        { role: 'clusterMonitor', db: 'admin' },
        { role: 'read', db: 'local' }
    ]
  }
);
quit();
EOF
