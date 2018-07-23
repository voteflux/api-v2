'use strict';

const R = require('ramda')

const db = {};  // we will populate this obj later via DB.init(db)

const utils = require('../utils')
const handlerUtils = require('./handlerUtils')

const auth = require('./auth')(db);

const { Roles } = require('../roles')


module.exports.getRoleAudit = auth.role(Roles.ADMIN, async (event, context, {user}) => {
    const roleAuditRaw = await db.getRoleAudit()
    // wipe `s` param
    const roleAudit = R.map(role => ({ ...role, users: R.map(u => ({...u, s: '', password: ''}), role.users) }), roleAuditRaw)
    return {
        roleAudit,
        status: 'okay'
    }
});


// Last part of file - wrap all handlers to automatically JSON.stringify responses
module.exports = R.mapObjIndexed(handlerUtils.wrapHandler(db), module.exports);
