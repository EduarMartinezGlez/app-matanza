const boom = require('@hapi/boom');
const {models} = require('./../lib/sequelize')
class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Orders.create(data)
    return newOrder;
  }

  async addItem(data) {
    const newItems = await models.OrderProduct.create(data)
    return newItems;
  }
  async findByUSer(userId) {
    const orders =await models.Orders.findAll({
      where:{
        '$customer.user.id$':userId
      },
      include:[{
          association: 'customer',
          include: ['user']
      }]
    })
    return orders;
  }
  async find() {
    const order =await models.Orders.findByPk(id)
    return [];
  }

  async findOne(id) {
    const order = await models.Orders.findByPk(id,{
      include:[{
        association:'customer',
        include:['user']
    },
    'items'
  ],
    })
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
