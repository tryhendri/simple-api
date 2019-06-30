const config = require("../../../config.json");
const db = require("../../../helpers/database");
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    findByKeyName
};

async function getAll() {
    return await User.find();
}

async function getById(id, redis) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ userName: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    const user = new User(userParam);

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw "User not found";
    if (
        user.userName !== userParam.userName &&
        (await User.findOne({ userName: userParam.userName }))
    ) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function findByKeyName(args) {
    return await User.find(args);
}
