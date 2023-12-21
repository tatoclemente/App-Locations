const login = require("../../controlllers/login/loginController");

const loginHandler = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await login(email, password);

    const { message, token } = user;
    console.log("MESSGE: ", message);
    console.log("TOKEN: ", token);

    res.cookie('auth-token', user.token)
    res.status(200).json({
      message: user.message,
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message })
  }

}

module.exports = loginHandler;