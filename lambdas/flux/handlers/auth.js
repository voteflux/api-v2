const R = require('ramda');

const auth = (db) => ({

    user: (f) => async (event, context) => {

        const fail = msg => ({statusCode: 403, body: msg})

        if (!event.s) {
            if (!event.authToken) {
                return fail('auth required')
            } else {
                // implement authToken later
                return fail('auth required')
            }
        }

        if (R.is(String, event.s) && event.s === event.s.toString()) {
            if (event.s.length < 20 || event.s.length > 50) {
                return fail('bad auth')
            }
        } else {
            return fail('bad auth')
        }

        const user = await db.getUserFromS(event.s)

        if (user && user.s === event.s) {
            return await f(event, context, {user});
        }
        return fail('bad auth')
    }

})

module.exports = auth;