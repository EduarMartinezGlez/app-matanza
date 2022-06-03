const {Model, DataTypes, Sequelize}= require('sequelize')
const {CUSTOMER_TABLE} = require('./customers_model')
const ORDER_TABLE = 'orders'


const OrderSchema= {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
 customerId:{
  field:'customer_id',
    allowNull:false,
    unique: true,
    type: DataTypes.INTEGER,
    refernce:{
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:"SET NULL"
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  total:{
    type:DataTypes.VIRTUAL,
    get(){
      if(this.items.length>0){
        //console.log(this.items.lenght);
        return this.items.reduce((total, item)=>{
          return total+ (item.price * item?.OrderProduct?.amount)
        }, 0)
      }
    }
  }
}
class Order extends Model{
  static associate(models){
    this.belongsTo(models.Customers,{
      as: 'customer'
    })
    this.belongsToMany(models.Product,{
      as: 'items',
      through:models.OrderProduct,
      foreignKey: 'orderId',
      otherKey:'productId'
    })
  }

  static config(sequelize){
      return{
          sequelize,
          tableName: ORDER_TABLE,
          modelName: 'Orders',
          timestamps: false
      }
  }
}

module.exports= { ORDER_TABLE, OrderSchema, Order}


