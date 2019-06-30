const expressJwt = require("express-jwt");
const config = require("../config.json");
const adminService = require("../api/v1/auth/auth.service");

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            "/api/v1/auth/authenticate",
            "/api/v1/auth/register"
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await adminService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
