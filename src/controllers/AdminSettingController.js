import Controller from './Controller'
import Sequelize from 'sequelize'
export default class CategoryController extends Controller{
    getAllSettings(req,res){
        super.db.AdminSetting.findOne({where:{id:1}}).then(data=>{
              res.send({settings:data.dataValues,status:200})
        })
    }

    saveSettings(req,res){
        let input=req.body
        
        super.db.AdminSetting.update(input,{where:{id:1}}).then(data=>{
            res.send({settings:data.dataValues,status:200})
        })
    }
}