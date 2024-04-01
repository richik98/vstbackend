import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as https from 'https';
import * as fs from 'fs';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync("/etc/letsencrypt/live/diamon-drush.io/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/diamon-drush.io/fullchain.pem")
    }
  });

  const config = new DocumentBuilder()
    .setTitle('BassHead Plugin Validation API')
    .setDescription('Fuck yourself')
    .setVersion('1.0')
    .addTag('VST')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);




  //await app.listen(3000);
  await app.listen(443);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
