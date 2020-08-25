import Knex from "knex";

export async function up(knex: Knex) {
    knex.schema.createTable('points_itens', table => {
        table.increments('id').primary();
        table.integer('points_id').notNullable().references('id').inTable('points');
        table.integer('itens_id').notNullable().references('id').inTable('items');

    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('points_itens');
}
