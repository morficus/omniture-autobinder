/**
 * A mock-object to try and mimic the s_code.js file that ships with Omniture
 */
window.s = {
    tl: function(){
        console.warn('triggering mock s.tl()');
        this._printOutput(arguments);
    },
    t: function(){
        console.warn('triggering mock s.t()');
        this._printOutput(arguments);
    },
    _printOutput: function(){
        console.log('with these arguments: ');
        console.log('this is what the "s" object looks like: ', s);
    }
}