var BookHoraa = require('horaa')(process.cwd() + '/app/models/Book');
var Book = require(process.cwd() + '/app/models/Book');

describe('model Book', function(){
	describe('metoda findOneByUrl', function(){
		it('zavola findOne() s podminkou pro vyber dokumentu podle url', function(){
			BookHoraa.hijack('findOne', function(cond){
				cond.should.eql({url: 'url-stranky'})
			});
			Book.findOneByUrl('url-stranky', function(){});
			BookHoraa.restore('findOne');
		});
	});
});