const User = require("../model/user.js");

module.exports.randerSignUp = (req, res) => {
    res.render("user/signup.ejs");
}
module.exports.signUp =  async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registredUser = await User.register(newUser, password);
        req.login(registredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WonderLust");
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signUp");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = (req, res) => {
    // console.log("Login successful! User:", req.user);
    req.flash("success", "Login Successful");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    return res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) =>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    })
    req.flash("success", "you are loggedOut");
    res.redirect("/listings");
}