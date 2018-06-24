const R = require('ramda');

const auth = (db) => ({
    user: (f) => async (event, context) => {
        const data = event.body

        const fail = msg => ({statusCode: 403, body: msg})

        if (data['s']) {
            //pass
        } else {
            if (!data.authToken) {
                return fail('no auth')
            } else {
                // implement authToken later
                return fail('authToken not yet implemented')
            }
        }

        if (R.is(String, data.s) && data.s === data.s.toString()) {
            if (data.s.length < 20 || data.s.length > 50) {
                return fail('bad auth')
            }
        } else {
            return fail('bad s param')
        }

        const user = await db.getUserFromS(data.s)

        if (user && user.s === data.s) {
            return await f(event, context, {user});
        }
        // default if above fails
        return fail('auth failed')
    }
})

module.exports = auth;
