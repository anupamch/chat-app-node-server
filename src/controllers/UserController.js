import Controller from './Controller'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
var Sequelize=require('sequelize')
export default class UserController extends Controller{

    getUser(req,res){
        var Op = Sequelize.Op
        var user_id = req.params.id
        super.db.User.findAll({where:{id:{[Op.ne]:user_id}}}).then(users=>{
            res.send({users:users,response:200});
       })
       
    }

    authenticate(req,res){
        let shasum = crypto.createHash('sha1');
        shasum.update(req.body.password);
        let password = shasum.digest('hex');
        let username = req.body.name;
        
        super.db.UserAuth.findOne({where:{'username':username,'password':password},include:[{model:super.db.User}]})
                           
                           .then(reponse=>{
                         //console.log(reponse)
                           
                           
                            if(reponse){
                                 let token = jwt.sign({id:reponse.dataValues.id}, "78947bhfn%sdfsdfAw@#234", {
                                    expiresIn: Math.floor(Date.now() / 1000)  // expires in 24 hour
                                });
                                    res.send({user:reponse.user.dataValues,token:token,auth:"1"}); 
                                }
                                else{
                                    res.send({auth:"0",status:200});
                                }
                   });
    }

    getRevicedMessage(req,res){
        var Op = Sequelize.Op
        let from=req.params.from
        let to=req.params.to
        super.db.Message.findAll({where:{[Op.or]:[{from:from,to:to},{from:to,to:from}]}}).then(data=>{
            res.send(data);
       })
                
    }

    getRevicedMessageCount(req,res){
        let to=req.params.to
        super.db.Message.findAll(
                          {
                            attributes:['from',[super.db.db.fn('COUNT', super.db.db.col('id')), 'mcount']],  
                            where:{to:to,is_read:0},
                            group:['messages.id']}).then(data=>{
                                    res.send(data);
                            })
    }

    saveMessage(req,res){
        let msg=req.body.msg
        let from =req.body.from
        let to=req.body.to
        super.db.Message.create({message:msg,from:from,to:to}).then(response=>{
             res.json('done')
        })
    }

    setMessageRead(req,res){
        let to = req.params.to
        let from = req.params.from
        super.db.Message.update({is_read:true},{where:{to:to,from:from,is_read:0}}).then(response=>{
            res.json('done')
       })      
    }

}