function isAuthenticated(req,res,next) {
  if (!req.user) {
    res.redirect("/login");
  } else {
    // then the user is logged in and can access protected route
    next();
  }
}


module.exports = isAuthenticated;