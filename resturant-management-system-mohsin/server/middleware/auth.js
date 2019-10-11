import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/users';
import {jwtSecret} from '../../config/settings.json'
const BCRYPT_SALT_ROUNDS = 12;



//////////////       SIGNUP

const SignupStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, ( req, email, password, done ) => { 
  
  console.log(req.body );

  User.findOne({
    email 
  }).then((user) => {
    if (user) {
      console.log('Email Already Used');
      return done({ message: 'Email already used' }, false);
    }

    

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
      .then((hashedPassword) => {

        var postObj = {} ;
        if(req.body.role === "rider") {
            postObj= { name:req.body.name, email:req.body.email, password: hashedPassword, role:req.body.role, contact:req.body.contact,   
                availabilityStatus:req.body.availabilityStatus,
                created:new Date()
            }  
        };
        if(req.body.role === "customer") {
            postObj={ name:req.body.name, email:req.body.email, password: hashedPassword, role:req.body.role, contact:req.body.contact, 
                shippingAddress:req.body.shippingAddress, 
                created:new Date() 
            }
        };
        if(req.body.role === "admin") {
            postObj={ name:req.body.name, email:req.body.email,  password: hashedPassword, role:req.body.role, contact:req.body.contact, created:new Date() }
        };

        User.create(postObj).then((newuser) => {
          // console.log('user created');
          return done(null, newuser);
        }).catch((err) => {
          done(err);
        });
      });
  }).catch((err) => {
    done(err);
  });
});







//////////////       LOGIN

const LoginStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, (req ,email ,password , done) => {
  console.log("Request in LOGIN STRATEGY ", req.body, email, password  )
  User.findOne({
    email:email
  }).then((user) => {
    if (user === null) {
      return done({ message: 'Invalid Email !' }, false);
    }
    bcrypt.compare(password, user.password).then((response) => {
      if (response !== true) {
        return done({ message: 'Passwords do not match !' }, false);
      }
      console.log('user found & authenticated');
      return done(null, user);
    });
  }).catch(err => done(err));
});






//////////////       JWT 

const JWTStrategy = new JWTstrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret
}, (email, done) => {
  User.findOne({ email })
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done({ message: 'User not found !' }, false);
      }
    })
    .catch(err => done(err));
});

passport.use('login', LoginStrategy);
passport.use('signup', SignupStrategy);
passport.use('jwt', JWTStrategy);
