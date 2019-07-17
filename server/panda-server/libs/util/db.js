const MongoClient = require('mongodb').MongoClient

const uri = 'mongodb+srv://toolset-one-writer:8VCq5AoybeRbqiU0@cluster0-w3h4y.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true
})

var db;

client.connect((err, database) => {
  db = database
})

exports.dbNew = async ({ collection, data }) => 
  new Promise((resolve, reject) =>
    db.db('db').collection(collection).insertOne(data).then(res =>
      resolve(res.ops[0])
    ).catch(reject)
  )

exports.dbFind = ({ collection, query }) =>
  new Promise((resolve, reject) =>
    db.db('db').collection(collection).find(query).toArray((err, docs) => {
      if(err) {
        reject(err)
      }
      
      resolve(docs)
    })
  )


/*
exports.dbFindOne = ({ model, query }, resolve, reject) =>
  Models[model].findOne(query,
    (err, val) => {
      console.log(err)
      !err ? resolve(val) : reject('DATABASE_ERROR_1')
    }
  );


exports.dbFind = ({ model, query }, resolve, reject) =>
  Models[model].find(query,
    (err, val) =>
    !err ? resolve(val) : reject('DATABASE_ERROR_2')
  );


exports.dbNew = (model, data) => new Models[model](data);


exports.dbSave = ({ entry }, resolve, reject) =>
  entry.save((err, val) =>
    !err ? resolve(val) : reject(err)
  )


exports.dbClear = model => Models[model].remove({}, (e) => { console.log('CLEARED', e) });
*/