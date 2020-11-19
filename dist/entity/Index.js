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
exports.Index = void 0;
const typeorm_1 = require("typeorm");
const GroupsIndexes_1 = require("./GroupsIndexes");
let Index = (() => {
    let Index = class Index {
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "index_id" }),
        __metadata("design:type", Number)
    ], Index.prototype, "indexId", void 0);
    __decorate([
        typeorm_1.Column("int", { name: "id", unique: true }),
        __metadata("design:type", Number)
    ], Index.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column("char", { name: "name", length: 64 }),
        __metadata("design:type", String)
    ], Index.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column("char", { name: "ethPriceInWei", length: 64 }),
        __metadata("design:type", String)
    ], Index.prototype, "ethPriceInWei", void 0);
    __decorate([
        typeorm_1.Column("char", { name: "usdPriceInCents", length: 64 }),
        __metadata("design:type", String)
    ], Index.prototype, "usdPriceInCents", void 0);
    __decorate([
        typeorm_1.Column("char", { name: "usdCapitalization", length: 64 }),
        __metadata("design:type", String)
    ], Index.prototype, "usdCapitalization", void 0);
    __decorate([
        typeorm_1.Column("char", { name: "percentageChange", length: 64 }),
        __metadata("design:type", String)
    ], Index.prototype, "percentageChange", void 0);
    __decorate([
        typeorm_1.OneToMany(() => GroupsIndexes_1.GroupsIndexes, (groupsIndexes) => groupsIndexes.index),
        __metadata("design:type", Array)
    ], Index.prototype, "groupsIndexes", void 0);
    Index = __decorate([
        typeorm_1.Index("id", ["id"], { unique: true }),
        typeorm_1.Entity("Index", { schema: "Pragma" })
    ], Index);
    return Index;
})();
exports.Index = Index;
//# sourceMappingURL=Index.js.map