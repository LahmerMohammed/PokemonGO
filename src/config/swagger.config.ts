import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const DocumentTitle = 'PökemonGo Searchbase API';
const ApiVersion = '1.0';
const ApiPath = 'docs';

const setupSwagger = (app: INestApplication<unknown>) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(DocumentTitle)
    .setVersion(ApiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(ApiPath, app, document);
};

export default setupSwagger;
