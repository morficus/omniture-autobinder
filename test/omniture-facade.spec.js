define(['omniture-facade'], function(OmnitureFacade){
    describe('Omniture Facade', function(){

        before(function(){

        });

        beforeEach(function(){
            OmnitureFacade.pageName = '';
            OmnitureFacade.sectionName = '';
            sinon.spy(s, 't');
            sinon.spy(s, 'tl');
        });

        before(function(){

        });

        afterEach(function(){
            s.t.restore();
            s.tl.restore();
        });

        describe('#setSectionName', function(){
            it('should set the "setctionName" attribute', function(){
                OmnitureFacade.setSectionName('Main Section');
                expect(OmnitureFacade.sectionName).to.be.equal('Main Section');
            });

        });

        describe('#setPageName', function(){
            it('should set the "pageName" attribute', function(){
                OmnitureFacade.setPageName('Landing Page');
                expect(OmnitureFacade.pageName).to.be.equal('Landing Page');
            });
        });

        describe('#recordPageView', function(){

            it('should trigger a "PageView" type event', function(){
                OmnitureFacade.recordPageView();
                expect(s.t.callCount).to.be.equal(1);
            });

            it('should set the s.pageName property if there is one set', function(){
                OmnitureFacade.pageName = 'Main Page';
                OmnitureFacade.recordPageView();

                expect(s.pageName).to.be.equal('Main Page');
            });

            it('should set the s.channel property if there is a "section" set', function(){
                OmnitureFacade.sectionName = 'Main';
                OmnitureFacade.recordPageView();

                expect(s.channel).to.be.equal('Main');
            });

            it('should combine the "pageName" and "sectionName" into the s.pageName attribute, delimited by a pipe', function(){
                OmnitureFacade.pageName = 'Main Page';
                OmnitureFacade.sectionName = 'Main';
                OmnitureFacade.recordPageView();
                expect(s.pageName).to.be.equal('Main | Main Page');
            });

            it('should call the private clean-up method once', function(){
                sinon.spy(OmnitureFacade, '_cleanupVars');
                OmnitureFacade.recordPageView();
                expect(OmnitureFacade._cleanupVars.callCount).to.be.equal(1);
                OmnitureFacade._cleanupVars.restore();

            });
        });

        describe('#setGuid', function(){
            it('sets "s.visitorID" to the passed in value', function(){
                OmnitureFacade.setGuid('123abc');
                expect(s.visitorID).to.be.equal('123abc');
            });

            it('should strip any dashes in the given string', function(){
                OmnitureFacade.setGuid('1-2-3-a-b-c');
                expect(s.visitorID).to.be.equal('123abc');
            });
        });

        describe('#recordLocalLink', function(){
            beforeEach(function(){
                sinon.spy(OmnitureFacade, '_recordLink');
            });
            afterEach(function(){
                OmnitureFacade._recordLink.restore();
            });

            it('calls "_recordLink" only once', function(){
                OmnitureFacade.recordLocalLink({});
                expect(OmnitureFacade._recordLink.callCount).to.be.equal(1);
            });

            xit('if given an empty object, should call "_recordLink" with default data', function(){
                //TODO: need to find a why to do a deep-comparison of the passed object
            });
        });

        describe('#recordExitLink', function(){
            beforeEach(function(){
                sinon.spy(OmnitureFacade, '_recordLink');
            });
            afterEach(function(){
                OmnitureFacade._recordLink.restore();
            });

            it('calls "_recordLink" only once', function(){
                OmnitureFacade.recordExitLink({});
                expect(OmnitureFacade._recordLink.callCount).to.be.equal(1);
            });

            xit('if given an empty object, should call "_recordLink" with default data', function(){
                //TODO: need to find a why to do a deep-comparison of the passed object
            });
        });

        describe('#recordDownloadLink', function(){
            beforeEach(function(){
                sinon.spy(OmnitureFacade, '_recordLink');
            });
            afterEach(function(){
                OmnitureFacade._recordLink.restore();
            });

            it('calls "_recordLink" only once', function(){
                OmnitureFacade.recordDownloadLink({});
                expect(OmnitureFacade._recordLink.callCount).to.be.equal(1);
            });

            xit('if given an empty object, should call "_recordLink" with default data', function(){
                //TODO: need to find a why to do a deep-comparison of the passed object
            });
        });

        describe('#_recordLink',function(){

            it('should call "s.tl" only once', function(){
                OmnitureFacade._recordLink({'linkType': 'o', 'linkName': 'Name'});
                expect(s.tl.callCount).to.be.equal(1);
            });

            it('will not call "s.tl" if the minimum requiered attributes are not set', function(){
                OmnitureFacade._recordLink({});
                expect(s.tl.callCount).to.be.equal(0);
            });

            it('will not call "s.tl" if the linkUrl is over 8000 length', function(){
                var linkData = {
                    linkurl: '',
                    linkType: 'o',
                    linkName: 'Name'
                };

                for(var i = 0; i <= 8001; i++){
                    linkData.linkurl += 'x';
                }

                OmnitureFacade._recordLink(linkData);
                expect(s.tl.callCount).to.be.equal(0);
            });

        });

        describe('#_cleanupVars', function(){
            beforeEach(function(){
                for(var i = 0; i <= 50; i++){
                    s['evar' + i] = 'value-' + i;
                    s['prop' + i] = 'value-' + i;
                    s['event' + i] = 'value-' + i;
                }
            });

            it('should delete ALL evars, up to 50', function(){
                OmnitureFacade._cleanupVars();
                for(var i = 0; i <= 50; i++) {
                    expect(s['evar' + i]).to.be.undefined;
                }
            });

            it('should delete ALL props, up to 50', function(){
                OmnitureFacade._cleanupVars();
                for(var i = 0; i <= 50; i++) {
                    expect(s['prop' + i]).to.be.undefined;
                }
            });

            it('should delete ALL events, up to 50', function(){
                OmnitureFacade._cleanupVars();
                for(var i = 0; i <= 50; i++) {
                    expect(s['event' + i]).to.be.undefined;
                }
            });
        });

    });

});
