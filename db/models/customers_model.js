const {Model, DataTypes, Sequelize}= require('sequelize')
const {USER_TABLE}= require('./user.model')

const CUSTOMERS_TABLE ='customers'

const CustomerSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull:false,
    type:DataTypes.STRING
  },
  lastName:{
    allowNull:false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone:{
    allowNull:false,
    type:DataTypes.STRING
  },
  recoveryToken:{
    field:'recovery_token',
    allowNull:true,
    type:DataTypes.STRING
  },
  // Token:{
  //   field:'token',
  //   allowNull:true,
  //   type:DataTypes.STRING
  // },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'create_at',
    defaultValue: Sequelize.NOW
  },
  userId:{
    field:'user_id',
    allowNull:false,
    unique: true,
    type: DataTypes.INTEGER,
    refernce:{
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate:'CASCADE',
    onDelete:"SET NULL"
  }
}

class Customer extends Model{
 static associate(models){
   this.belongsTo(models.User, {as: 'user'})
   this.hasMany(models.Orders, {
     as: 'orders',
   foreignKey: 'customerId'})

 }
 static config(sequelize){
   return {
    sequelize,
    tableName: CUSTOMERS_TABLE,
    modelName: 'Customers',
    timestamps: false

   }
 }
}
module.exports= {CUSTOMERS_TABLE, CustomerSchema, Customer}

