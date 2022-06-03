const {Model, DataTypes, Sequelize}= require('sequelize')
//const nanoid = require('nanoid')

const USER_TABLE ='users'


const UserSchema={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role:{
    allowNull:false,
    type:DataTypes.STRING,
    defaultValue:'costumers'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    //field: 'update_at',
    defaultValue: Sequelize.NOW
  }
}
class User extends Model{
    static associate(){

    }

    static config(sequelize){
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}
module.exports= { USER_TABLE, UserSchema, User}