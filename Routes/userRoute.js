const bcrypt = require("bcrypt")
const express = require("express")
const jwt = require("jsonwebtoken")
const UserRoutes = express.Router()
const { userModel } = require("../Model/model")

UserRoutes.post("/register", async (req, res) => {
  const { email, password, name} = req.body
  try {
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        res.send(error.message)
      } else {
        const user = new userModel({ name, email, password: hash })
        await user.save()
        res.send("New User done")
      }
    })

  } catch (error) {
    res.send({ error: error.message })
  }
})


UserRoutes.post("/login", async (req, res) => {
  const { email, password } = (req.body)
  try {
    const user = await userModel.find({ email })
    console.log(user)
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (error, result) => {
        if (result) {
          let token = jwt.sign({ user: user[0]._id }, "Backend")

          res.send({ "msg": "login successfull", "token": token })
        } else {
          res.send("Wrong data")
        }
      })
    }
  } catch (error) {
    res.send(error)
  }
})


module.exports = {
  UserRoutes
}