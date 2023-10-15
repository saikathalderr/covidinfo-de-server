'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const routes_1 = __importDefault(require('./routes'));
const express_1 = __importDefault(require('express'));
const morgan_1 = __importDefault(require('morgan'));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static('public'));
app.use(routes_1.default);
app.listen(PORT, () => {
    const message = `Server is running on http://localhost:${PORT}`;
    console.log(message);
});
