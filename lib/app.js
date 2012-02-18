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
