Omniture Autobinder
====
[![Build Status](https://travis-ci.org/morficus/omniture-autobinder.svg?branch=master)](https://travis-ci.org/morficus/omniture-autobinder)
[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/e210c3c11e25a2e6857d939932a6065f "githalytics.com")](http://githalytics.com/morficus/omniture-autobinder)
[![Code Climate](https://codeclimate.com/github/morficus/omniture-autobinder.png)](https://codeclimate.com/github/morficus/omniture-autobinder)
<iframe src="//benschwarz.github.io/bower-badges/embed.html?pkgname=" width="160" height="32" allowtransparency="true" frameborder="0" scrolling="0"></iframe>

An automatic and mostly unobtrusive way to bind the proper UI element to the various artifacts necessary for collection data with Adobe's Omniture analytics tool.

This is mostly intended for single page applications (SPA's), tho traditional full-page-reload setups can also use this just with a bit more involvement.

What does it do
====
The goal is to make using Omniture drop-dead simple with minimal to your main application code but still keep things maintanable.

Takes away the headache of having to write custom event-bindings to send user interactions over to Omniture/SiteCatalyst.

Also provides a nifty easy-to-use wrapper (```omniture-facade.js```) around the vanilla s-object which eliminates the need to remember all the obscure s.t() and s.tl() parameters and what not.

How to use it
====

1. Add the scripts to your page
    - If you are using a module loader like [requireJS](http://requirejs.org) (which you really should), then just add ```omniture-autobinder``` in to your path as your dependency array.
    - If you are **NOT** using a module loader, then sure to add the ```omniture-facade.js``` to your page before ```omniture-autobinder.js```
2. Now you're ready to start tagging. Just add the proper data-* attributes to the element you are interested in and this plugin will do the rest.

Advanced usage
---
If you still find your self needing to manually trigger some stuff due to the plugin liminations listed below, you can manually interact with the Omniture wrapper:

- If using a module loader, just include ```omniture-facade``` as a dependnecy
- If you are **NOT** using a module loader, just inlcude ```omniture-facade.js``` in your page and reference it as ```OmnitureFacade``` from the global scope

Or if you rather interact directly with the s-object, you can still do so as well

Pro tip
---
When using a module loader with Omniture, don't forget to define it as a shim.

Avilable data-* attributes
====

<table>
    <tr>
        <th>data-* attribute</th>
        <th>Description</th>
    </tr>

    <tr>
        <td>data-omniture="download"</td>
        <td>record as a download-type link (click event)</td>
    </tr>
    <tr>
        <td>data-omniture="exit"</td>
        <td>record as a exit-type link (click event)</td>
    </tr>
    <tr>
        <td>data-omniture="other"</td>
        <td>record as a other-type link (click event)</td>
    </tr>
    <tr>
        <td>data-omniture="pageView"</td>
        <td>record as a full page view (load event)</td>
    </tr>
    <tr>
        <td>data-omniture-text="textToSave"</td>
        <td>text that will be recorded (if not set, will grab the content</td>
    </tr>
    <tr>
        <td>data-omniture-evar="1,2,3"</td>
        <td>evars that need to be set (if multiple are needed, separate them with a comma)</td>
    </tr>
    <tr>
        <td>data-omniture-prop="1,2,3"</td>
        <td>props that need to be set (if multiple are needed, separate them with a comma)</td>
    </tr>
    <tr>
        <td>data-omniture-event="1,2,3"</td>
        <td>events that need to be set (if multiple are needed, separate them with a comma)</td>
    </tr>
    <tr>
        <td>data-omniture-pagename="string"</td>
        <td>set the page name to this value</td>
    </tr>
    <tr>
        <td>data-omniture-channelname="string"</td>
        <td>set the channel value</td>
    </tr>

</table>

Current limitations
===

- Only auto-binds to click-events
- When settings multiple eVars or sProps from a single element, all eVars and sProps will receive the same text/display value
- Does nothing for videos

Legal stuff
===
Distributed under the [MIT License (MIT)](http://mutedsolutions.mit-license.org/)

Copyright (c) 2014 Maurice Williams

