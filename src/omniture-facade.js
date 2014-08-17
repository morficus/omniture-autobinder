(function(root, factory) {

    // Set up omniture-autobinder for either AMD or non-AMD environments
    if (typeof define === 'function' && define.amd) {

        define(['omniture', 'underscore'], function(){
            return factory(root, s, _);
        });

    } else {
        root.OmnitureFacade = factory(root, root.s, root._);
    }

}(this, function(root, s, _){

    return {

        /** @property */
        pageName: '',

        /** @property {String} Omniture/SiteCatalyst calls this "Channel"*/
        sectionName: '',

        /**
         * Sets the section name and removes the page name
         * @param {String} section Section name
         */
        setSectionName: function (section) {
            this.sectionName = section;
            s.channel = section;
            //since we are switching sections/channels, it is assumed that the page name must not stay the same
            this.setPageName('');
        },

        /**
         * Sets the page name
         * @param {String} pagename Page name
         */
        setPageName: function (pagename) {
            this.pageName = pagename;
            s.pageName = pagename;
        },

        /**
         * Sets a users unique identifier.
         * If this is not set, Omniture will generate a unique ID for them anyways.
         * @param {String} guid A string representing a users unique identifier.
         *
         */
        setGuid: function (guid) {
            // string out all non-alphanumeric characters (including white space)
            s.visitorID = guid.replace(/\W+/g, '');
        },

        /**
         * Creates a normal page-view record.
         * Before calling this, you will want to make sure you have called setSectionName() and/or setPageName()
         */
        recordPageView: function () {

            s.channel = this.sectionName;

            // include the section name as a prefix of the page name, only if one is set
            if ( !_.isEmpty(this.sectionName) && !_.isEmpty(this.pageName) ) {
                s.pageName = this.sectionName + ' | ' + this.pageName;
            } else {
                s.pageName = this.pageName;
            }
            s.t();
            this._cleanup();
        },

        /**
         * Records a local link (aka: a jump link, with in the same page or section)
         * @param  {Object} linkData Details about the link that was clicked
         *                           linkData.linkName = the text to uniquely identify this link
         *                           linkData.linkType = the type of omniture-link (defaults to other-link)
         *                           linkData.linkElement = type of element linked (defaults to an anchor-tag)
         */
        recordLocalLink: function (linkData) {
            var defaultLinkData = {
                'linkElement': 'a',
                'linkType': 'o',
                'linkName': '',
                'variableOverrides': null,
                'doneAction': ''
            };

            linkData = _.defaults(linkData, defaultLinkData);

            this._recordLink(linkData);
        },

        /**
         * Records a sites exit link
         * @param  {Object} linkData Details about the link that was clicked
         *                           linkData.linkName = the text to uniquely identify this link
         *                           linkData.linkType = the type of omniture-link (defaults to exit-link)
         *                           linkData.linkElement = type of element linked (defaults to an anchor-tag)
         */
        recordExitLink: function (linkData) {
            var defaultLinkData = {
                'linkElement': 'a',
                'linkType': 'e',
                'linkName': '',
                'variableOverrides': null,
                'doneAction': ''
            };

            linkData = _.defaults(linkData, defaultLinkData);

            this._recordLink(linkData);
        },

        /**
         * Records a sites exit link
         * @param  {Object} linkData Details about the link that was clicked
         *                           linkData.linkName = the text to uniquely identify this link
         *                           linkData.linkType = the type of omniture-link (defaults to exit-link)
         *                           linkData.linkElement = type of element linked (defaults to an anchor-tag)
         */
        recordDownloadLink: function (linkData) {
            var defaultLinkData = {
                'linkElement': 'a',
                'linkType': 'd',
                'linkName': '',
                'variableOverrides': null,
                'doneAction': ''
            };

            linkData = _.defaults(linkData, defaultLinkData);

            this._recordLink(linkData);
        },

        /**
         * Deletes all evars, props and event data that were previously set
         * @private
         */
        _cleanup: function () {
            var variables = s.linkTrackVars.split(',');

            _.each(variables, function (v) {
                delete s[v];
            });
            s.events = '';
            s.linkTrackEvents = '';
            s.linkTrackVars = '';
        },

        /**
         * Actually triggers the network call to Omniture
         * @param linkData {Object} Details about the link that was clicked
         * @private
         */
        _recordLink: function (linkData) {

            var defaultLinkData = {
                'linkElement': '',
                'linkType': '',
                'linkName': '',
                'variableOverrides': null,
                'doneAction': '',
                'linkUrl': ''
            };

            linkData = _.defaults(linkData, defaultLinkData);

            //ignore stuff that doesn't have all the necessary data
            if (linkData.linkType === '' || linkData.linkName === '') {
                return;
            }

            //only process URL's that are less than 8000 characters, else Omniture will get pretty unhappy
            if (linkData.linkUrl.length < 8000) {
                var that = this;
                //w/o the 500ms delay, "mailto:" links cause the request to get canceled.
                setTimeout(function () {
                    s.tl(linkData.linkElement, linkData.linkType, linkData.linkName);
                    that._cleanup();
                }, 500);

            }

            return;
        }

    };

}));
