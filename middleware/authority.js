const SessionRepository = require('../orm/repository/sessionRepository');

function checkIfAllow(path) {
    return path.split('/')[1] === 'admin';
}

var checkAuthority = function () {
    return async (ctx, next) => {
        console.log(ctx.request.path);
        if(!checkIfAllow(ctx.request.path)) {
            await next();
        }
        else {
            var id = ctx.cookies.get('sessionId');
            let session = await SessionRepository.findOne({id: id});
            if(session == null) {
                ctx.redirect('/login');
            }
            else {
                await next();
            }
        }
    };
};

module.exports = checkAuthority;
