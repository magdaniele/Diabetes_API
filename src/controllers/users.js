const createUser = async(req, res)=>{
    const {user, name, email, pass, pass2 } = req.body;
    return res.json();
}

const loginUser = async(req, res)=>{
    const {user, pass } = req.body;
    return res.json();
}

module.exports = {
    createUser,
    loginUser
}