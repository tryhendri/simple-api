const config = require("../../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../../helpers/database");
const Admin = db.Admin;

module.exports = {
    authenticate,
    getById,
    create
};

async function authenticate({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        const { hash, ...adminWithoutHash } = admin.toObject();
        const token = jwt.sign({ sub: admin.id }, config.secret);
        return {
            ...adminWithoutHash,
            token
        };
    }
}

async function getById(id) {
    return await Admin.findById(id).select("-hash");
}

async function create(adminParam) {
    console.log(adminParam);
    // validate
    if (await Admin.findOne({ username: adminParam.username })) {
        throw 'Username "' + adminParam.username + '" is already taken';
    }

    const admin = new Admin(adminParam);

    // hash password
    if (adminParam.password) {
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    }

    // save user
    await admin.save();
}
