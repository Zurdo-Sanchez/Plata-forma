import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapter = app.getHttpAdapter();
  const instance = adapter?.getInstance?.();
  if (instance?.set) {
    instance.set('json replacer', (_key: string, value: unknown) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
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
  // eslint-disable-next-line no-console
  console.log('welcome to Plata-forma API');
}

bootstrap();
