import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GithubRankingModule } from './github-ranking/github-ranking.module.ts.old';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './http-interceptor/logging.interceptor';
import { TimeoutInterceptor } from './http-interceptor/timeout.interceptor';
import { ErrorsInterceptor } from './http-interceptor/errors.interceptor';
import { HttpModule } from '@nestjs/axios';
import { GithubRankingController } from './github-ranking/github-ranking.controller';
import { GithubRankingService } from './github-ranking/github-ranking.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
      .forRoot(),
    HttpModule,
  ],
  controllers: [AppController, GithubRankingController],
  providers: [
      {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    //  {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor,
    // }
    //   ,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // }
    // ,
    AppService,
    GithubRankingService,
  ],
})
export class AppModule { }
