(function(root, factory) {

    // Set up omniture-autobinder for either AMD or non-AMD environments
    if (typeof define === 'function' && define.amd) {
        define(['omniture-facade', 'underscore', 'jquery'], function(OmnitureFacade, _, $) {
            //this AMD module exports omniture-facade module, so that manual interaction with Omniture is still possible even when using the autobinding functionality
            return factory(root, OmnitureFacade, _, $);
        });

    } else {
        factory(root, root.OmnitureFacade, root._, (root.jQuery  || root.$));
    }

}(this, function(root, OmnitureFacade, _, $){

    /**
     * Pretty much just a collection of setters.
     * Helper functions to set various omniture properties
     */
    var AnalyticsPropertySetter = {
        download: function(text, $el){
            this._setLinkType('d', text, $el);
        },

        exit: function(text, $el){
            this._setLinkType('e', text, $el);
        },

        other: function(text, $el){
            this._setLinkType('o', text, $el);
        },

        _setLinkType: function(type, text, $el){
            var data = {};
            data.linkElement = $el.get(0);
            data.linkName = text;
            data.linkType = type;

            if(type === 'd'){
                //recordDownloadLink(data);
                OmnitureFacade.recordDownloadLink(data);
            }else if(type === 'e'){
                //recordExitLink(data);
                OmnitureFacade.recordExitLink(data);
            }else if(type === 'o'){
                //recordLocalLink(data);
                OmnitureFacade.recordLocalLink(data);
            }
        },

        video: function(){
            //TODO: still need to figure this one out...
        },

        pageView: function(){
            OmnitureFacade.recordPageView();
        },

        setSectionName: function(text){
            OmnitureFacade.setSectionName(text);
        },

        setPageName: function(text){
            OmnitureFacade.setPageName(text);
        },
        /**
         * Sets all eVar values based on the values passed in propArray
         * @param evarArray {Array} An array of numbers
         * @param evarText {String} Text used when recording the eVars (the same text is use for values in the array)
         */
        setEvars: function(evarArray, evarText){
            if (!_.isArray(evarArray)) {
                evarArray = [evarArray];
            }
            _.each(evarArray, function(evarNumber){
                var evarName = 'eVar' + evarNumber;
                s[evarName] = evarText;
            });
        },

        /**
         * Sets all prop values based on the values passed in propArray
         * @param propArray {Array} An array of numbers
         * @param propText {String} Text used when recording the props (the same text is use for values in the array)
         */
        setProps: function(propArray, propText){
            if (!_.isArray(propArray)) {
                propArray = [propArray];
            }

            var props = [];
            props.push('events'); //we always want to track events.

            _.each(propArray, function(propNumber){
                var propName = 'prop' + propNumber;
                s[propName] = propText;
                props.push(propName);
            });

            // make sure we don't clobber previously set tracking values
            var currentlyTrackedVars = s.linkTrackVars.split(',');
            if (currentlyTrackedVars.length === 0) {
                s.linkTrackVars = props.join(',');
            } else {
                //combine current and new, and only preserve the unique values
                props = _.union(currentlyTrackedVars, props);
                s.linkTrackVars = props.join(',');
            }
        },

        /**
         * Sets all event values based on the values passed in eventArray
         * @param eventArray An array of numbers
         * @param eventText Text used when recording the evets (the same text is use for values in the array)
         */
        setEvents: function(eventArray, eventText){
            if (!_.isArray(eventArray)) {
                eventArray = [eventArray];
            }

            s.events = '';
            var events = [];

            _.each(eventArray, function(eventNumber){
                var eventName = 'event' + eventNumber;
                s[eventName] = eventText;
            });

            // make sure we don't clobber previously set tracking values
            var currentlyTrackedEvents = s.events.split(',');
            if (currentlyTrackedEvents.length === 0) {
                s.events = events.join(',');
                s.linkTrackEvents = events.join(',');
            } else {
                //combine current and new, and only preserve the unique values
                events = _.union(currentlyTrackedEvents, events);
                s.events = events.join(',');
                s.linkTrackEvents = events.join(',');
            }
        }
    };

    /**
     * (Intended to always be used as a callback)
     * Inspects the element which triggered the event and determines what data needs to be sent over to Omniture
     * @param event Click event
     */
    var analyticsHandlerCallback = function(event){
        //extract all sorts of data from the target element
        var $target = $(event.target);


        //if the immediate target is not omniture-tagged, check if any of its parents are and re-define the target
        if($target.attr('data-omniture') === undefined){
            var newTarget = $target.parents('data-omniture')[0];
            //the original normal nor any of his parents are omniture-tagged... so we can just bail
            if(newTarget === undefined){
                return;
            }else{
                //otherwise wrap it in some jQuery-goodness
                $target = $(newTarget);
            }
        }

            //the text to be sent back to omniture
        var elementText = $target.data('omniture-text') || $target.text(),
            //the type of link, acceptable values are: download, other, exit, video, pageView, sectionName, channelName
            omniturePropertyType = $target.data('omniture'),
            pageName = $target.data('omniture-pagename'),
            sectionName = $target.data('omniture-channelname'),
            //a comma-seprated list of numbers. would indicate which eVar, prop or event to use (ie: eVar1)
            evars = $target.data('omniture-evar'),
            props = $target.data('omniture-prop'),
            events = $target.data('omniture-event');

        //the element has to AT LEAST have an property/link type OR some type of evar, prop or event. if it doesn't have
        //any of that... then there is nothing to send to Omniture
        if( _.isEmpty(omniturePropertyType) && ( _.isEmpty(evars) && _.isEmpty(props) && _.isEmpty(events)) ){
            return;
        }

        //remove any type of extraneous white spaces
        elementText = $.trim(elementText);

        //set custom variables, events and stuff...
        if(evars){
            evars = evars.toString();
            AnalyticsPropertySetter.setEvars(evars.split(','), elementText);
        }

        if(props){
            props = props.toString();
            AnalyticsPropertySetter.setProps(props.split(','), elementText);
        }

        if(events){
            events = events.toString();
            AnalyticsPropertySetter.setEvents(events.split(','), elementText);
        }


        if(sectionName){
            AnalyticsPropertySetter.setSectionName(sectionName);
        }

        if (pageName || omniturePropertyType === 'pageView') {
            AnalyticsPropertySetter.setPageName(pageName || elementText);
        }

        if(AnalyticsPropertySetter.hasOwnProperty(omniturePropertyType)){
            AnalyticsPropertySetter[omniturePropertyType](elementText, $target);
        }else{
            console.warn('Undefined Omniture action: ' + omniturePropertyType);
        }
    };

    //this page-view represents the user landing on the initial page.
    OmnitureFacade.recordPageView();

    //Binding do the ```document``` tag gives the benefit of being able to capture all clicks all the time, even if the
    //element is dynamically added after this fired. It's all thanks to the magic of event-bubbling.
    //We also want to throttle all the calls, in case the user goes on a crazy click-frenzy
    var throtteledCallback = _.throttle(analyticsHandlerCallback, 500);
    $(document).on('click', throtteledCallback);

    return OmnitureFacade;

}));
