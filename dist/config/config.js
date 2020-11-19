"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = () => ({
    abi: JSON.parse(fs_1.readFileSync('./env/Contract.abi', 'utf-8'))
});
//# sourceMappingURL=config.js.map