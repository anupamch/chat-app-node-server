import Controller from './Controller'
import Sequelize from 'sequelize'
export default class OrderController extends Controller{

    getAllOrder(req,res){
        super.db.Order.findAll().then(data=>{
            res.send({orders:data.dataValues,status:200})
        })
    }

    getOrderDetails(req,res){
        let id = req.params.id
        super.db.Order.findAll({
                                where:{id:id},
                                include:[
                                          {
                                            model:super.db.OrderDetails,
                                            include:[{model:super.db.Product,
                                                      include:[{model:super.db.ProductCategory}]
                                                    }]
                                          },
                                         
                                        ]
                             })
                      .then(data=>{
                          res.send({orders:data.dataValues,status:200})
                      })
    }
}