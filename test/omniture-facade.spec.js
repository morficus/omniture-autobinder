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
                expect(s.channel).to.be.equal('Main Section');
            });

        });

        describe('#setPageName', function(){
            it('should set the "pageName" attribute', function(){
                OmnitureFacade.setPageName('Landing Page');
                expect(OmnitureFacade.pageName).to.be.equal('Landing Page');
                expect(s.pageName).to.be.equal('Landing Page');
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
                sinon.spy(OmnitureFacade, '_cleanup');
                OmnitureFacade.recordPageView();
                expect(OmnitureFacade._cleanup.callCount).to.be.equal(1);
                OmnitureFacade._cleanup.restore();

            });
        });

        describe('#setGuid', function(){
            it('sets "s.visitorID" to the passed in value', function(){
                OmnitureFacade.setGuid('123abc');
                expect(s.visitorID).to.be.equal('123abc');
            });

            it('should strip any non-alphanumeric character in the given string', function(){
                OmnitureFacade.setGuid('1-2.3-a.b c+4=5//6');
                expect(s.visitorID).to.be.equal('123abc456');
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

            it('should call "s.tl" only once', function(done){
                OmnitureFacade._recordLink({'linkType': 'o', 'linkName': 'Name'});

                setTimeout(function () {
                    expect(s.tl.callCount).to.be.equal(1);
                    done();
                }, 500);
            });

            it('should cleanup after its self', function(done){
                OmnitureFacade._recordLink({'linkType': 'o', 'linkName': 'Name'});
                sinon.spy(OmnitureFacade, '_cleanup');

                setTimeout(function () {
                    expect(OmnitureFacade._cleanup.callCount).to.be.equal(1);
                    done();
                }, 500);
            });

            it('will not call "s.tl" if the minimum required attributes are not set', function(){
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

        describe('#_cleanup', function(){
            beforeEach(function(){
                var trackingValues = [],
                    trackEvents = [];

                for(var i = 0; i <= 50; i++){
                    s['eVar' + i] = 'value-' + i;
                    s['prop' + i] = 'value-' + i;
                    s['event' + i] = 'value-' + i;

                    trackingValues.push('eVar' + i);
                    trackingValues.push('prop' + i);
                    trackingValues.push('event' + i);

                    trackEvents.push('event' + i);
                }

                s.events = trackEvents.join(',');
                s.linkTrackEvents = trackEvents.join(',');
                s.linkTrackVars = trackingValues.join(',');
            });

            it('should delete ALL evars, up to 50', function(){
                OmnitureFacade._cleanup();
                for(var i = 0; i <= 50; i++) {
                    expect(s['eVar' + i]).to.be.undefined;
                }
            });

            it('should delete ALL props, up to 50', function(){
                OmnitureFacade._cleanup();
                for(var i = 0; i <= 50; i++) {
                    expect(s['prop' + i]).to.be.undefined;
                }
            });

            it('should delete ALL events, up to 50', function(){
                OmnitureFacade._cleanup();
                for(var i = 0; i <= 50; i++) {
                    expect(s['event' + i]).to.be.undefined;
                }
            });

            it('should clear out all event data', function(){
                OmnitureFacade._cleanup();
                expect(s.events).to.equal('');
                expect(s.linkTrackEvents).to.equal('');
            });

            it('should clear out all var tracking data', function(){
                OmnitureFacade._cleanup();
                expect(s.linkTrackVars).to.equal('');
            });
        });

    });

});
