// lib/app.js
exports.views = {
    makes: {
        map: function(doc) {
            emit(doc.make,null);
        }
    },
    byCollection: {
        map: function(doc) {
            if (doc.collection) {
                emit(doc.collection, doc);
            }
        }
    }
};

/*
exports.rewrites = [
    {from:'/blawks/_design/one/*',to:'*'},
    {from:'/blawks/*',to:'../../*'},
    {from:'',to:'index.html'}, {from:'*',to:'*'} ];
    */

exports.rewrites = [
    {from:'/toimawb/_design/one/*',to:'*'},
    {from:'/toimawb/*',to:'../../*'},
    {from:'',to:'index.html'}, {from:'*',to:'*'} ];
