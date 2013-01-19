var Book = require(process.cwd() + '/app/models/Book')
  , filters = {};
  
filters.url = require(process.cwd() + '/lib/filters/url');
removeDiacritics = require('diacritics').remove;

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
 * GET /books/:book
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
    book.url = filters.url(removeDiacritics(req.body.title));
    book.type = req.body.type;
    book.save(function(err, doc) {
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