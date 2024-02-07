const verifyToken = (req, res, next) => {
    const authtoken = req.headers?.authtoken;

    if( authtoken === process.env.ulugbekToken ||
        authtoken === process.env.dilyaToken){
         next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = {verifyToken};