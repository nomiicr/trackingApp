
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
var db = {};
const bcrypt = require('bcryptjs')
const { databaseConfig } = require("../config/config")


const sequelize = new Sequelize(databaseConfig.dbName, databaseConfig.dbUsername, databaseConfig.dbPass, {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  port: databaseConfig.port,
  operatorsAliases: false,
  logging: false

});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sync = function () {
  sequelize.sync({ alter: true, force: false }).then((res) => {
    console.log('SYNC DONE');
  }).catch((e) => {
    console.log('ERROR SYNC', e);
  });

  // sequelize.sync({ force: true }).then(() => {
  //   console.log("creating roles")
  //   db.role.bulkCreate([
  //     {
  //       "name": "Super Admin"
  //     }, {
  //       "name": "Admin"
  //     }, {
  //       "name": "Client"
  //     }, {
  //       "name": "Rider"
  //     }, {
  //       "name": "Salesman"
  //     }]).then(async () => {
  //       console.log("Creating super ADMIN")
  //       const passwordHash = await bcrypt.hash("admin", 10);
  //       db.admin.create({
  //         email: "admin@admin.com",
  //         password: passwordHash,
  //         roleId: 1,
  //         isEmailVerified: 1,
  //         isAllowed: 1
  //       })
  //     })
  // })

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;