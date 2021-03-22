const userSessionMW = (request, response, next) => {
    if (!request.session.user) { //on n'a pas encore de propriété user dans la session
        request.session.user = false;
    }
    //en stockant les infos de session d'un utilisateur dans l'object locals, on rend ces infos disponibles dans toutes les vues
    response.locals.user = request.session.user;
    next();
}

module.exports = userSessionMW;