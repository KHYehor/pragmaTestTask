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
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const GroupsIndexes_1 = require("./GroupsIndexes");
let Group = class Group {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "group_id" }),
    __metadata("design:type", Number)
], Group.prototype, "groupId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "id", unique: true }),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("char", { name: "name", length: 64 }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => GroupsIndexes_1.GroupsIndexes, (groupsIndexes) => groupsIndexes.group),
    __metadata("design:type", Array)
], Group.prototype, "groupsIndexes", void 0);
Group = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("Group", { schema: "Pragma" })
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map