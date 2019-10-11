import jwt from 'jsonwebtoken';
import passport from 'passport';
import express from 'express';
import '../middleware';
const Router = express.Router();
import { jwtSecret } from '../../config/settings.json';


Router.route('/login').post( (req, res) => {
  console.log("login route is called");
  console.log("Request Body ",req.body)
  passport.authenticate('login', { session: false }, (err, user, info) => {
    console.log('LLLLLLLogin: ', { err, user, info });

    if (err || !user) {
      return res.status(400).send(err && err.message);
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).send(err && err.message);
      }
      console.log("//////111111111////////");
      const token = jwt.sign(user.email, jwtSecret);
      console.log("//////2222222222////////",token);
      return res.json({ user, token });
    });
  })(req, res);
});
Router.get('/findUser', (req, res) => {
  console.log("in find user");
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log('Find User: ', { err, user, info });

    if (err || !user) {
      return res.status(400).send(err && err.message);
    }

    return res.json({ user });

  })(req, res);
});
   
Router.post('/register', (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    // console.log('Request Body : ', req.body );
    // console.log('Register: ', { err, user, info });

    if (err || !user) {
      return res.status(400).send(err && err.message);
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).send(err && err.message);
      }

      console.log("//////     111111111   ////////");
      console.log('User: ', user);
      const token = jwt.sign(user.email, jwtSecret);
      console.log("//////     222222222   ////////", token);
      return res.json({ user, token });
    });
  })(req, res, next);
});






export default Router;