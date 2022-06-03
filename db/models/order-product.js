const {Model, DataTypes, Sequelize}= require('sequelize')

const ORDER_PRODUCT_TABLE = 'order_products'

const {ORDER_TABLE}= require('./order.model')
const {PRODUCT_TABLE}= require('./product.model')

const OrderProductSchema= {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  amount:{
    allowNull:false,
    type:DataTypes.INTEGER
  },
  orderId:{
    field:'order_Id',
    allowNull:false,
    type: DataTypes.INTEGER,
    refernce:{
      model: ORDER_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:"SET NULL"
  },
  productId:{
    field:'product_Id',
    allowNull:false,
    type: DataTypes.INTEGER,
    refernce:{
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:"SET NULL"
  }
}
class OrderProduct extends Model{
  static associate(models){
    this.belongsTo(models.Category, {as:'category'})

  }
  static config(sequelize){
      return{
          sequelize,
          tableName: ORDER_PRODUCT_TABLE,
          modelName: 'OrderProduct',
          timestamps: false
      }
  }
}

module.exports= { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct}
