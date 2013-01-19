var request = require('supertest')
	,	app = require(process.cwd() + '/app')
	,	async = require('async')
	, 	Book = require(process.cwd() + '/app/models/Book');

// testovaci data
var data = [
	{title: 'Prvni kniha', url: 'prvni-kniha', type: 'book'},
	{title: 'První video', url: 'prvni-video', type: 'movie'}
];

// vlozeni jednoho radku do databaze
function save(doc){
	return function(cb){
		var book = new Book();
		for (var field in doc){
			book[field] = doc[field];
		} 
		book.save(cb);
	}
}

describe('API books', function(){

	beforeEach(function(done) {
        Book.remove({}, function(err){
            if (err) return done(err);
            async.parallel([
                save(data[0]), save(data[1])
            ], done);
        }); 
    });

	describe('GET books', function(){
		it('vrati seznam vsech polozek v databazi', function(done){
			request(app)
				.get('/v1/api/books')
				.expect(200)
				.end(function(err, res){
					res.body.length.should.eql(2);
					done();
				});
		});
		it('zkontroluje Content-Type Json', function(done){
			request(app)
				.get('/v1/api/books/prvni-kniha')
				.expect(200)
				.end(function(err, res){
					res.should.be.json;
					done();
				});
		});
		it('zkontroluje strukturu vraceneho dokumentu', function(done){
			request(app)
				.get('/v1/api/books')
				.expect(200)
				.end(function(err, res){
					res.body[0].title.should.eql(data[0].title);
					res.body[0].url.should.eql(data[0].url);
					res.body[0].type.should.eql(data[0].type);
					done();
				});
		});
		it('vrati jen url', function(done){
			request(app)
				.get('/v1/api/books?fields=url')
				.expect(200)
				.end(function(err, res){
					res.body[0].url.should.eql(data[0].url);
					done();
				});
		});
		it('vrati kod 400, pokud pole neexistuje v dokumentu', function(done){
			request(app)
				.get('/v1/api/books?fields=abc')
				.expect(400, done);
		});
		it('vrati kod 406 pri pozadavku na jiny format nezli JSON', function(done){
			request(app)
				.get('/v1/api/books?fields=url')
				.set('Accept', 'application/xml')
				.expect(406, done);
		});
	});

	describe('GET /v1/api/books/:book', function(){
		it('vrati detail jedna stranky', function(done){
			request(app)
				.get('/v1/api/books/prvni-kniha')
				.expect(200)
				.end(function(err, res){
					res.body.url.should.eql(data[0].url);
					done();
				});
		});
		it('vrati kod 404, pokud stranka neexistuje', function(done){
			request(app)
				.get('/v1/api/books/treti-neexistujici-stranka')
				.expect(404, done);
		});
	});

	describe('POST /v1/api/books', function(){
		it('ulozi stranku do databaze a zkontroluje ulozeni', function(done){
			request(app)
				.post('/v1/api/books')
				.send(data[0])
				.expect(200)
				.end(function(err, res){
					Book.findOne(data[0], function(err, doc){
						doc.title.should.eql(data[0].title);
						doc.url.should.eql(data[0].url);
						doc.type.should.eql(data[0].type);
						done();
					});
				});
		});
		it('nevyrizeny test');
	});
	
});