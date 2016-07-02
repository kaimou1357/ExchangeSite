var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var pg = require('pg')
var config = {
  user: 'postgres', //env var: PGUSER
  database: 'fitchexchange', //env var: PGDATABASE
  password: 'adventure', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config)

app.use(express.static('public'));
app.use(bodyParser.json())

app.post('/api/posts', function(req, res){
	pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('INSERT INTO posts(spread, inside_party, outside_party, odds_in, odds_out) VALUES ($1, $2, $3, $4, $5);', [req.body.spread, req.body.inside_party, req.body.outside_party, req.body.odds_in, req.body.odds_out], function(err, result){
				done()
				if(err){
					console.error("Error running query")
				}

				res.json({"Success": "True"})
			})
		})
})
app.get('/api/posts', function(req, res){
	pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('SELECT * from posts;', function(err, result){
				done()
				if(err){
					console.error("Error running query")
				}
				console.log('Quotes REQUESTED')
				res.json(result.rows)
			})
		})
})

app.put('/api/posts/:quoteid', function(req, res){
	var quoteid = req.params.quoteid
	var name = req.body.name
	pool.connect(function(err, client, done){
			if (err){
				return console.log("Failed to connect to database")
			}

			client.query('SELECT * from posts WHERE id =  $1;', [quoteid], function(err, result){
				done()
				if(err){
					console.error("Error running query")
				}
				if(result.rows[0].outside_party){
					client.query('UPDATE posts SET inside_party = $1 WHERE id = $2', [name, quoteid], function(err, result){
						done()
						if(err){
							console.error("Error inserting name into post.")
						}
						res.json({"Success"  : "True"})
					})
				}
				else{
					client.query('UPDATE posts SET outside_party = $1 WHERE id = $2;', [name, quoteid], function(err, result){
						done()
						if(err){
							console.error("Error inserting name into post.")
						}
						res.json({"Success"  : "True"})
					})
				}

			})
		})
})

app.get('*', function(req, res){
	res.sendFile(__dirname + "/public/index.html")
	console.log('Loaded Index')
})

app.listen(3000, function(){

})