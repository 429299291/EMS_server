"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const MiddleWareAll = (req, res, next) => {
    console.log('全局中间件');
    next();
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(MiddleWareAll);
    app.enableCors();
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map