const bcrypt = require('bcrypt')

const hashPass = (password) =>{
    return bcrypt.hashSync(password, 10)
}

const comparedPassword = (password, hashedPass) => {
    return bcrypt.compareSync(password,hashedPass)
}

module.exports = {hashPass , comparedPassword}