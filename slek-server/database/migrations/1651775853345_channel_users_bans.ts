import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserChannelRole } from 'Contracts/enum'


export default class ChannelUsersBans extends BaseSchema {
  protected tableName = 'channel_users_bans'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('sender_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('channel_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('channels')
        .onDelete('CASCADE')
      table.unique(['user_id', 'sender_id', 'channel_id'])

      table
      .enum('role', Object.values(UserChannelRole))
      .defaultTo(UserChannelRole.USER)
      .notNullable()


      table.timestamp('banned_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
