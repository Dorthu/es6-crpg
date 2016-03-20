var fs = require('fs');
module.exports = function(source) { 
    /*
        This is an unapologetic hack.  I *really* want a list of filenames
        and paths in the resources directory so THREE can load them later,
        and so I want webpack to be an object generator for a second.  It's
        probably not the *right* way to do it, but it does the right thing,
        and as far as I can tell there isn't really a *better* way past baking
        all my assets into the bundle (which I don't want to do so that I can
        reference them in dynamically-generated html and stuff.. oh just look,
        you'll see what this mess is for).
    */
    
    result = {};
    fs.readdirSync('resources').forEach(function(cdir) {
        if(cdir == 'overlay' || cdir =='inventory') ///list of dirs to no index
            return;
        result[cdir] = fs.readdirSync('resources/'+cdir);
    });

    return "module.exports="+JSON.stringify(result)+";"; 
}
