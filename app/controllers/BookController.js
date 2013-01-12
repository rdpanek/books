var Book = require(process.cwd() + '/app/models/Book')
  , filters = {};
  
filters.url = require(process.cwd() + '/lib/filters/url');

/**
 * GET /books
 */
exports.index = function(req, res, next){
    if (!Book.inSchema(req.katalog.fields)) {
        return next(400);
    }
    Book.find({}, req.katalog.fields, function(err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
};

/**
 * GET /pages/:page
 */
exports.show = function(req, res, next){
    res.send(req.book);
};   

/**
 * POST /books
 * 
 * @todo
 */
exports.create = function(req, res, next){
    var book = new Book();
    book.title = req.body.title;
    book.url = filters.url(req.body.title);
    book.purchased = req.body.purchased;
    book.save(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};

/**
 * PUT /pages/:page
 * 
 */
exports.update = function(req, res, next){
    req.book.title = req.body.title;
    req.book.purchased = req.body.purchased;
    req.book.save(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};

/**
 * DELETE /pages/:page
 * 
 */
exports.destroy = function(req, res, next){
    req.book.remove(function(err, doc) {
        if (err) return next(err);
        res.json(doc);
    });
};