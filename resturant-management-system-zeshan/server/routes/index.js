
//import user from './user';
import express from 'express';
import path from 'path';
import './items'
import AuthRouter from './auth'
// import UsersRouter from './users'
import app from '../config/express'
app.use('/api/v1' , AuthRouter) ;
// app.use('/api/v1/users' , UsersRouter) ;
const distPath = path.join(__dirname, '../../dist/client');
app.use(express.static(distPath));
app.get('*', (_, res) => res.sendFile(path.join(distPath, 'index.html')));