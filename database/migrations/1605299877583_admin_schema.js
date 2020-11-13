'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up() {
    this.create('admins', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name')
      table.timestamps()
    })
  }

  down() {
    this.drop('admins')
  }
}

module.exports = AdminSchema
