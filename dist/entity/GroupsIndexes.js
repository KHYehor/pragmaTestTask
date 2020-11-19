"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsIndexes = void 0;
const typeorm_1 = require("typeorm");
const Group_1 = require("./Group");
const Index_1 = require("./Index");
let GroupsIndexes = (() => {
    let GroupsIndexes = class GroupsIndexes {
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
        __metadata("design:type", Number)
    ], GroupsIndexes.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("int", { name: "group_id" }),
        __metadata("design:type", Number)
    ], GroupsIndexes.prototype, "groupId", void 0);
    __decorate([
        typeorm_1.Column("int", { name: "index_id" }),
        __metadata("design:type", Number)
    ], GroupsIndexes.prototype, "indexId", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Group_1.Group, (group) => group.groupsIndexes, {
            onDelete: "CASCADE",
            onUpdate: "NO ACTION",
        }),
        typeorm_1.JoinColumn([{ name: "group_id", referencedColumnName: "id" }]),
        __metadata("design:type", Group_1.Group)
    ], GroupsIndexes.prototype, "group", void 0);
    __decorate([
        typeorm_1.ManyToOne(() => Index_1.Index, (index) => index.groupsIndexes, {
            onDelete: "CASCADE",
            onUpdate: "NO ACTION",
        }),
        typeorm_1.JoinColumn([{ name: "index_id", referencedColumnName: "id" }]),
        __metadata("design:type", Index_1.Index)
    ], GroupsIndexes.prototype, "index", void 0);
    GroupsIndexes = __decorate([
        typeorm_1.Index("group_id", ["groupId"], {}),
        typeorm_1.Index("index_id", ["indexId"], {}),
        typeorm_1.Entity("groups_indexes", { schema: "Pragma" })
    ], GroupsIndexes);
    return GroupsIndexes;
})();
exports.GroupsIndexes = GroupsIndexes;
//# sourceMappingURL=GroupsIndexes.js.map