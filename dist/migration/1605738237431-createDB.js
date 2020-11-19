"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDB1605738237431 = void 0;
class createDB1605738237431 {
    constructor() {
        this.name = 'createDB1605738237431';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `groups_indexes` DROP FOREIGN KEY `groups_indexes_ibfk_1`");
        await queryRunner.query("ALTER TABLE `groups_indexes` DROP FOREIGN KEY `groups_indexes_ibfk_2`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_f134dc2e9f632502979ba332c0` ON `Index` (`id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_d064bd160defed65823032ee54` ON `Group` (`id`)");
        await queryRunner.query("ALTER TABLE `groups_indexes` ADD CONSTRAINT `FK_06377fc04a7319586b131c6c807` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `groups_indexes` ADD CONSTRAINT `FK_a1f5ec883f1901843f7177da088` FOREIGN KEY (`index_id`) REFERENCES `Index`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `groups_indexes` DROP FOREIGN KEY `FK_a1f5ec883f1901843f7177da088`");
        await queryRunner.query("ALTER TABLE `groups_indexes` DROP FOREIGN KEY `FK_06377fc04a7319586b131c6c807`");
        await queryRunner.query("DROP INDEX `IDX_d064bd160defed65823032ee54` ON `Group`");
        await queryRunner.query("DROP INDEX `IDX_f134dc2e9f632502979ba332c0` ON `Index`");
        await queryRunner.query("ALTER TABLE `groups_indexes` ADD CONSTRAINT `groups_indexes_ibfk_2` FOREIGN KEY (`index_id`) REFERENCES `Index`(`index_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `groups_indexes` ADD CONSTRAINT `groups_indexes_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }
}
exports.createDB1605738237431 = createDB1605738237431;
//# sourceMappingURL=1605738237431-createDB.js.map