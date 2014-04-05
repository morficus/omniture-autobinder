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
        pageName: '',
        sectionName: '',

        /**
         * Sets the section name and removes the page name
         * @param {String} section Section name
         */
        setSectionName: function (section) {
            this.sectionName = section;
            //since we are switching sections/channels, it is assumed that the page name must not stay the same
            this.setPageName('');
        },

        /**
         * Sets the page name
         * @param {String} pagename Page name
         */
        setPageName: function (pagename) {
            this.pageName = pagename;

        },

        /**
         * Sets a users unique identifier.
         * If this is not set, Omniture will generate a unique ID for them anyways.
         * @param {String} guid A string representing a users unique identifier.
         *
         */
        setGuid: function (guid) {
            //strip hyphens from the GUID, and set it as the visitor ID
            s.visitorID = guid.replace(/-/g, '');
            return true;
        },

        /**
         * Creates a normal page-view record.
         * Before calling this, you will want to make sure you have called setSectionName() and/or setPageName()
         */
        recordPageView: function () {

            s.channel = this.sectionName;

            if ( (this.sectionName !== '' && this.sectionName !== undefined) && (this.pageName !== '' && this.pageName !== undefined) ) {

                s.pageName = this.sectionName + ' | ' + this.pageName;
            } else {
                s.pageName = this.pageName;
            }
            s.t();
            this._cleanupVars();
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
                'linkEelement': 'a',
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
         * Deletes all evars, props and event data that was previously set
         * @private
         */
        _cleanupVars: function(){
            var count = 50;
            for(var i = 1; i <= count; i++){
                delete s['evar' + i];
                delete s['prop' + i];
                delete s['event' + i];
            }
        },

        _recordLink: function (linkData) {

            var defaultLinkData = {
                'linkEelement': '',
                'linkType': '',
                'linkName': '',
                'variableOverrides': null,
                'doneAction': '',
                'linkurl': ''
            };

            linkData = _.defaults(linkData, defaultLinkData);

            //ignore stuff that doesn't have all the necesary data
            if (linkData.linkType === '' || linkData.linkName === '') {
                return;
            }

            //only process URL's that are less than 8000 characters, else Omniture/SiteCatalyst will get pretty unhappy
            if (linkData.linkurl.length < 8000) {
                s.tl(linkData.linkElement, linkData.linkType, linkData.linkName);
            }
        }

    };

}));