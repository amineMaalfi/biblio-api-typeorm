import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function translateValidationMessage(msg: string): string {
  const n = msg.toLowerCase();
  if (n.includes('should not exist') || n.includes('must not exist')) {
    return 'Propriété non autorisée dans la requête.';
  }
  if (n.includes('an instance of') || n.includes('must be a')) {
    return 'Type de donnée incorrect.';
  }
  return msg;
}

function collectValidationMessages(errors: ValidationError[]): string[] {
  const out: string[] = [];
  for (const e of errors) {
    if (e.constraints) {
      out.push(
        ...Object.values(e.constraints).map((m) => translateValidationMessage(m)),
      );
    }
    if (e.children?.length) {
      out.push(...collectValidationMessages(e.children));
    }
  }
  return out;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const msgs = collectValidationMessages(errors).filter(Boolean);
        return new BadRequestException(
          msgs.length ? msgs.join(' ') : 'Requête invalide.',
        );
      },
    }),
  );
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API Biblio (TypeORM) : http://localhost:${port}`);
}
bootstrap();
