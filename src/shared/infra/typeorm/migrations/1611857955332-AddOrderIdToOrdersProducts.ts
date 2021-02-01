import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1611857955332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders_products',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'orders_products',
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'orders',
                name: 'OrdersProductsOrder',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            })
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
        await queryRunner.dropColumn('orders_products', 'order_id');
    }

}
