module.exports = function() {
    return function(req, res, next){
        if (!req.katalog) req.katalog = {};
        req.katalog.fields = {};
        if (req.query.fields) {
            req.query.fields.split(',').forEach(function(field){
                if (field.trim() !== '') {
                    req.katalog.fields[field] = 1;    
                }
            });
        }
        next();
    }
};