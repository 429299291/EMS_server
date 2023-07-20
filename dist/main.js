"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const MiddleWareAll = (req, res, next) => {
    console.log('全局中间件');
    next();
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '../files/images/avatar'), {});
    app.use(MiddleWareAll);
    app.enableCors();
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map