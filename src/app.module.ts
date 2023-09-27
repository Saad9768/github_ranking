import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './http-interceptor/logging.interceptor';
import { HttpModule } from '@nestjs/axios';
import { GithubRankingController } from './github-ranking/github-ranking.controller';
import { GithubRankingService } from './github-ranking/github-ranking.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, GithubRankingController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
    GithubRankingService,
  ],
})
export class AppModule {}
