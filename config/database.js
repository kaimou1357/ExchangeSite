var pg = require('pg')

var connectionString = 'postgres://postgres:adventure@localhost:5432/fitchexchange'

var client = new pg.Client(connectionString)

client.connect(function(err){
  if(err){
    return console.error("Could not connect to Postgres database")
  }
  var query = client.query(
    'CREATE TABLE IF NOT EXISTS posts(id SERIAL PRIMARY KEY, spread integer, inside_party text, outside_party text, odds_in integer, odds_out integer);')
  //Create users table.
  query.on('end', function(){
    console.log("Tables Created")
    client.end()
  })


});