Omniture Autobinder
====

An automatic and mostly unobtrusive way to bind the proper UI element to the various artifacts necessary for collection data with Adobe's Omniture analytics tool.

This is mostly intended for single page applications (SPA's), tho traditional full-page-reload setups can also use this just with a bit more involvement.

What does it do
====

How to use it
====


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
        <td>evars that need to be set (if multiple are needed, separete them with a comma)</td>
    </tr>
    <tr>
        <td>data-omniture-prop="1,2,3"</td>
        <td>props that need to be set (if multiple are needed, separete them with a comma)</td>
    </tr>
    <tr>
        <td>data-omniture-event="1,2,3"</td>
        <td>events that need to be set (if multiple are needed, separete them with a comma)</td>
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


Legal stuff
===
Distributed under the [MIT License (MIT)](http://mutedsolutions.mit-license.org/)

Copyright (c) 2014 Maurice Williams

