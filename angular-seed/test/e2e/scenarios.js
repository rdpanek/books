'use strict';

describe('Book', function() {

  describe('Vypis titulu', function() {

    beforeEach(function() {
      browser().navigateTo('../../index.html');
    });

    it('overi nadpis stranky', function(){
     expect(element('h3').text()).toBe('Databáze titulů');
    });

    describe('vypis knih', function(){
      
      it('kontrola, zdali je prepnuta zalozka \"Knihy\"', function(){
        expect(element('#book').text()).toBe('Knihy');
      });

      it('kontrola, zdali je vypsano vice zaznamu nez nula', function(){
          expect(repeater('.item').count()).toBeGreaterThan(0);
      });
    });

    describe('vypis filmu', function(){
      
      it('kliknuti na zalozku \"Filmy\" a zkontrolovani, ze je zalozka opravdu aktivni', function(){

        expect(element('#movie a').click());
        expect(element('#movie').text()).toBe('Filmy');
      });

      it('kontrola, zdali je vypsano vice zaznamu nez nula', function(){
          expect(repeater('.item').count()).toBeGreaterThan(0);
      });

    });

  });

  describe('Pridani nove knihy', function(){

    it('klikne na tlacitko \"Ulozit novy\"', function(){
      element('#new_title').click();
    });

    it('zkontroluje url stranky pro vytvareni noveho titulu', function(){
      expect( element('h1').text()).toBe('Nový titul');
    });

    it('vlozi testovaci knihu', function(){
      expect( input('book.title').enter('Testovaci kniha'));
      expect( select('book.type').option('Kniha'));
      expect( element('.btn-success').click());
    });

  });

  describe('Pridani noveho filmu', function(){

    it('klikne na tlacitko \"Ulozit novy\"', function(){
      element('#new_title').click();
    });

    it('zkontroluje url stranky pro vytvareni noveho titulu', function(){
      expect( element('h1').text()).toBe('Nový titul');
    });

    it('vlozi testovaci film', function(){
      expect( input('book.title').enter('Testovaci film'));
      expect( select('book.type').option('Film'));
      expect( element('.btn-success').click());
    });

  });

});
