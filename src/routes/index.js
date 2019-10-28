import express from 'express';

import verifyToken from '../middleware/verify_token'
import UserController from '../controllers/UserController';


//import connection from '../bin/db/connection';
var router = express.Router();
const userOp=new UserController();

/* GET api listing. */
router.use(function(req, res, next) {
  //cors();
  
  var protocol=req.protocol+"://";
  var host=req.hostname;
  

  //res.header('Access-Control-Allow-Origin', protocol+host+':4200');
  res.header('Access-Control-Allow-Origin', "*");
        
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization,X-Custom-Header,x-access-token');
  res.header('Access-Control-Allow-Credentials', true);
  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
router.post('/api/authenticate',userOp.authenticate);
router.get('/*',verifyToken);
router.post('/*',verifyToken);
router.get('/api/users/:id',userOp.getUser);
router.post('/api/saveMessage',userOp.saveMessage);
router.get('/api/getMessageCount/:to',userOp.getRevicedMessageCount);
router.get('/api/setMessageRead/:to',userOp.setMessageRead);
router.get('/api/getMessage/:from/:to',userOp.getRevicedMessage);
router.get('/api/changeReadStatus/:from/:to',userOp.setMessageRead);

export default router;
