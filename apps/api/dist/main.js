"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const adapter = app.getHttpAdapter();
    const instance = adapter?.getInstance?.();
    if (instance?.set) {
        instance.set('json replacer', (_key, value) => typeof value === 'bigint' ? value.toString() : value);
    }
    const rawOrigins = process.env.CORS_ORIGIN;
    const credentials = (process.env.CORS_CREDENTIALS ?? 'false').toLowerCase() === 'true';
    const allowAllOrigins = !rawOrigins || rawOrigins.trim() === '' || rawOrigins.trim() === '*';
    const allowedOrigins = allowAllOrigins
        ? true
        : rawOrigins
            .split(',')
            .map((origin) => origin.trim())
            .filter(Boolean);
    app.enableCors({
        origin: allowAllOrigins && credentials ? (origin, callback) => callback(null, true) : allowedOrigins,
        credentials,
    });
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.listen(port);
    console.log('welcome to Plata-forma API');
}
bootstrap();
//# sourceMappingURL=main.js.map