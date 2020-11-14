'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 500)
      table.decimal('available_quantity_stock', 12, 2)
      table.decimal('available_quantity_store', 12, 2)
      table.integer('product_type_id').unsigned().references('id').inTable('product_types')
      table.integer('enu', 255)
      table.string('due_date')
      table.string('observation', 1000)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
