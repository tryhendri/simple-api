const db = require("../helpers/database");
const User = db.User;
const Admin = db.Admin;
const bcrypt = require("bcryptjs");
const faker = require("faker");

async function createUser() {
    console.log(faker.internet.userName());
    userParam = {
        userName: faker.internet.userName(),
        accountNumber: faker.random.alphaNumeric(),
        emailAddress: faker.internet.email(),
        identityNumber: faker.random.uuid()
    };

    // validate
    if (await User.findOne({ userName: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    const user = new User(userParam);
    await user.save();
}

async function createAdmin() {
    adminParam = {
        username: "admin",
        password: "12345678",
        firstName: "testFirst",
        lastName: "testFirst"
    };

    const admin = new Admin(adminParam);

    // hash password
    if (adminParam.password) {
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    }

    await admin.save();
}

createAdmin();
createUser();