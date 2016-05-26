module.exports = function(req, res, next) {
  if(req.body && req.body.token){
    try {
      req.options.authPayload = AuthService.verify(req.body.token);
      return next();
    } catch(err){}
  }
  res.status(401);
  return res.json({status:'unauthorized'});
};
