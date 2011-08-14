function (newDoc, oldDoc, userCtx, secObj) {
    var $v = {
        forbidden: function (message) {
            throw ({
                forbidden: message
            });
        },
        unauthorized: function (message) {
            throw ({
                unauthorized: message
            });
        },
        assert: function (should, message) {
            if (!should) {
                throw ({
                    forbidden: message
                });
            }
        },
        isAdmin: function () {
            return userCtx.roles.indexOf('_admin') != -1
        },
        require: function () {
            for (var i = 0; i < arguments.length; i++) {
                var field = arguments[i];
                if (typeof newDoc[field] == "undefined") {
                    throw ({
                        forbidden: "The '" + field + "' field is required."
                    });
                }
            }
        },
        unchanged: function (field) {
            if (oldDoc && oldDoc[field] != newDoc[field]) {
                throw ({
                    forbidden: "You may not change the '" + field + "' field."
                });
            }
        },
    };

    if ($v.isAdmin()) {
        return true;
    }

    if (((oldDoc && (oldDoc.author == userCtx.name))) && newDoc._deleted) {
        return true;
    }

    $v.unchanged("type");
    $v.unchanged("author");
    $v.unchanged("created_at");

    if (!$v.isAdmin() && newDoc.author && newDoc.author != userCtx.name) {
        $v.unauthorized("Only " + newDoc.author + " may edit this document.");
    }

    if (newDoc.type == 'order') {
        $v.require("created_at", "author");
    }
}
