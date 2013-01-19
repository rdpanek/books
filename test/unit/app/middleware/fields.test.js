var fields = require(process.cwd() + '/app/middleware/fields')();

describe('middleware fields', function(){
   it('rozdeli parametr fields na samostatne polozky', function(){
       var req = { query: { fields: 'field1,field2,field3' } }
       fields(req, {}, function() {});
       req.katalog.fields.should.eql({
           field1: 1, field2: 1, field3: 1
       });
   })

   it('odstrani z vracenych polozek prazdne polozky', function(){
       var req = { query: { fields: 'field1, ,field2,field3,' } }
       fields(req, {}, function() {});
       req.katalog.fields.should.eql({
           field1: 1, field2: 1, field3: 1
       });
   })
});