import promise from 'bluebird';

const options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);

// 'postgres://user:user@host:port/database'
const connectString = 'postgres://user:user@localhost:5432/maintenance';

const db = pgp(connectString);

export default db;
// function getList(req, res, next) {
//     db.any("select * from users")
//         .then(function(data) {
//             res.status(200).json({ message: 'List of users'});
//         })
//         .catch((err) => {
//       return next(err);
//     });
// }

// function getOne(req, res, next){}

// module.exports = {
//     getList,
//     getOne
// }
