define(['src/omniture-autobinder'], function(OmnitureAutobinder){
    describe('Omniture Autobind', function(){
        before(function(){
            //turn off the console output from the mock s_code.js file
            window.s._printOutput = function(){};
        });

        beforeEach(function(){
            sinon.spy(s, 't');
            sinon.spy(s, 'tl');
        });


        afterEach(function(){
            s.t.restore();
            s.tl.restore();
        });

        it('should bind an click-event to the "document" element', function(){
            //console.log(global.document.body);
            //expect(true).to.be.true;
        });
    });
});