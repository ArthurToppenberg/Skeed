function validateSession(request){
    if(request.session.username != undefined){
        return true;
    }else{
        return false;
    }
}

module.exports = validateSession;