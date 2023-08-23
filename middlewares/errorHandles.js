const errorHandler = (err, req, res, next) => {
  console.log(err, "Server Error");
  switch (err.name) {
    case "NoName":
      res.status(400).json({ message: "Name is required" });
      break;
    case "NoPassword":
      res.status(400).json({ message: "Password is required" });
      break;
    case "NoCaptcha":
      res.status(400).json({ message: "Captcha is required" });
      break;
    case "NoUserId":
      res.status(400).json({ message: "User Id is required" });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeConstraintError":
      res.status(400).json({message: err.errors[0].message})
      break;
    case "InvalidUser":
      res.status(401).json({ message: "Invalid name/password" });
      break;
    case "InvalidToken":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "NotFoundUser":
      res.status(404).json({ message: "User Not Found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
