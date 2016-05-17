module.exports = function(req, res, next) {
  if(req.headers.token){
    try {
      req.options.authPayload = AuthService.verify(req.headers.token);
      return next();
    } catch(err){}
  }
  res.status(401);
  return res.json({status:'unauthorized'});
};
