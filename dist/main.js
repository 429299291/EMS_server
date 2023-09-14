"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const listenPort = 3000;
const logger = new common_1.Logger("main.ts");
const MiddleWareAll = (req, res, next) => {
    console.log('全局中间件');
    next();
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('EMS 云平台API')
        .setDescription('EMS web以及app API文档')
        .setVersion('1.0')
        .addTag('ems')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    app.useStaticAssets((0, path_1.join)(__dirname, '../files/images/avatar'), {});
    app.enableCors();
    app.use(MiddleWareAll);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix("api");
    logger.log(`listen:http://localhost:${listenPort}----------------`);
    await app.listen(listenPort);
}
bootstrap();
//# sourceMappingURL=main.js.map