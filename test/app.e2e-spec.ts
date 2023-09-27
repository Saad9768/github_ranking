import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UnHandledException } from './../src/filter/unhandled-exception.filter';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({
      logger: false,
    });
    app.useGlobalFilters(new UnHandledException());
    await app.init();
  });

  function validateReply({
    statusCode,
    body: { message, path, statusCode: bodyStatusCode },
  }) {
    const { url, message: expectedMessage } = this;
    expect(statusCode).toEqual(400);
    expect(message).toEqual(expectedMessage);
    expect(bodyStatusCode).toEqual(400);
    expect(bodyStatusCode).toEqual(statusCode);
    expect(path).toEqual(url);
  }

  it('/ (GET)', () => {
    const outputExpected = 'Welcome to GithubRepo Ranking Service';
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(outputExpected);
  });
  it('should return correct records for language, limit and date', () => {
    const language = 'Javascript';
    const limit = 2;
    const date = '2018-12-18';
    const url = `/github-ranking?limit=${limit}&date=${date}&language=${language}`;
    const expectedOutput = {
      count: 2,
      records: [
        {
          rank: 1,
          item: 'top-100-stars',
          repo_name: 'freeCodeCamp',
          stars: 296554,
          forks: 20629,
          language: 'JavaScript',
          repo_url: 'https://github.com/freeCodeCamp/freeCodeCamp',
          username: 'freeCodeCamp',
          issues: 6572,
          last_commit: '2018-12-18T12:16:12Z',
          description:
            'The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.',
        },
        {
          rank: 2,
          item: 'JavaScript',
          repo_name: 'vue',
          stars: 122454,
          forks: 17507,
          language: 'JavaScript',
          repo_url: 'https://github.com/vuejs/vue',
          username: 'vuejs',
          issues: 233,
          last_commit: '2018-12-18T07:38:59Z',
          description:
            '🖖 A progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
        },
      ],
    };
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect(expectedOutput);
  });
  it('should return Bad request as language is not send to endpoint', async () => {
    const limit = 2;
    const date = '2018-12-18';
    const url = `/github-ranking?limit=${limit}&date=${date}`;
    const message = 'InCorrect Language';
    return request(app.getHttpServer())
      .get(url)
      .expect(400)
      .expect(validateReply.bind({ url, message }));
  });
  it('should return Bad request as date is not send to endpoint', () => {
    const language = 'Javascript';
    const limit = 2;
    const url = `/github-ranking?limit=${limit}&language=${language}`;
    const message = 'InCorrect Date';
    return request(app.getHttpServer())
      .get(url)
      .expect(400)
      .expect(validateReply.bind({ url, message }));
  });

  it('should return Bad request as limit is not send to endpoint', () => {
    const language = 'Javascript';
    const date = '2018-12-18';
    const url = `/github-ranking?date=${date}&language=${language}`;
    const message = 'Limit should be greater than zero';
    return request(app.getHttpServer())
      .get(url)
      .expect(400)
      .expect(validateReply.bind({ url, message }));
  });
});
