const logOutController = {

    makeLogOut: async (req, res) => {

        //on rest les infos du user dans la session
        req.session.user = false;

        res.json(userLogOut);
        //on redirige sur la page d'accueil
    }
};


module.exports = logOutController;