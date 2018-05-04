'use strict';

const R = require('ramda')

const db = {};  // we will populate this obj later via DB.init(db)

const utils = require('../utils')
const handlerUtils = require('./handlerUtils')



module.exports.hello = async (event, context) => {
    return {message: 'Go Serverless v1.0! Your function executed successfully!'}
};



// Last part of file - wrap all handlers to automatically JSON.stringify responses
module.exports = R.mapObjIndexed(handlerUtils.wrapHandler(db), module.exports);
