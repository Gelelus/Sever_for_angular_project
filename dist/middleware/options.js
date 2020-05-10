"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};
exports.default = options;
