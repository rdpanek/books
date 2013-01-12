// testovaci data
var pages = {
    'obchodni-podminky': {
        'title': 'Obchodní podmínky',
        'content': 'Lorem ipsum set dolorem'
    },
    'doprava-a-platba': {
        'title': 'Obchodní podmínky',
        'content': 'Lorem ipsum set dolorem'
    },
    'kontakt': {
        'title': 'Kontakt',
        'content': 'Lorem ipsum set dolorem'
    }
};

// GET /pages
exports.index = function(req, res){
    res.json(pages);
};

// GET /pages/:page
exports.show = function(req, res){
    page = pages[req.params.page];
    if (page) {
        res.json(page);
    } else {
        res.send(404);
    }
};