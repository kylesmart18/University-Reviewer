var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var pgp = require('pg-promise')();

let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'university_reviews',
	user: 'postgres',
	password: 'pwd'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

//heroku things
//-------------
// const isProduction = process.env.NODE_ENV === 'production';
// dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
// let db = pgp(dbConfig);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.render('pages/main',{
		my_title:"Main Page"
	});
});

app.get('/main', function(req, res) {
	res.render('pages/main',{
		my_title:"Main Page"
	});
});


app.post('/main/getReview', function(req, res) {
	var id = req.body.db_id;
	var name = req.body.university;
	var review = req.body.review;
	var date = req.body.date;
	var query = "INSERT INTO reviews (id, university_name, review, review_date) VALUES('"+id+"','"+name+"','"+review+"','"+date+"');";
	db.any(query)
    .then(function (rows) {
        res.render('pages/main',{
            my_title: "Main Page",
            data: rows
        })

    })
    .catch(function (err) {
        // display error message in case an error
        console.log('error', err);
        res.render('pages/main',{
            my_title: "My Title Here",
            data: ''
        })
    })
});

app.get('/reviews', function(req, res) {
    var query = 'SELECT * FROM reviews;';
    db.any(query)
    .then(function (rows) {
        res.render('pages/reviews',{
            my_title: "Reviews Page",
            data: rows
        })

    })
    .catch(function (err) {
        // display error message in case an error
        console.log('error', err);
        res.render('pages/reviews',{
            my_title: "Reviews Page",
            data: ''
        })
    })
});

// app.listen(3000);
// console.log('3000 is the magic port');

// localhost:3000/main

// heroku things
// -------------
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});