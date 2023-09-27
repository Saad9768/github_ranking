import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingController } from './github-ranking.controller';
import { GithubRankingService } from './github-ranking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { correctInput, correctOutput } from './data/correctData';
import {
  moreLimitLessDataOutput,
  moreLimitLessDataInput,
} from './data/moreLimitLessResult';

describe('GithubRankingController', () => {
  let githubRankingController: GithubRankingController;
  let githubRankingService: GithubRankingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [GithubRankingController],
      providers: [GithubRankingService],
    }).compile();

    githubRankingController = module.get<GithubRankingController>(
      GithubRankingController,
    );
    githubRankingService =
      module.get<GithubRankingService>(GithubRankingService);
  });

  it('should be defined', () => {
    expect(githubRankingController).toBeDefined();
  });

  const createResult = async (input) => input;

  it('should return a correct output', async () => {
    const result = await createResult(correctInput);
    const language = 'TypeScript';
    const limit = 20;
    const date = new Date('2019-02-22');
    jest
      .spyOn(githubRankingService, 'getGithubRankingData')
      .mockImplementation(() => result);
    expect(
      await githubRankingController.getGithubRanking(language, limit, date),
    ).toEqual(correctOutput);
  });

  it('should return a correct output but with less limit', async () => {
    const result = await createResult(moreLimitLessDataInput);
    const language = 'TypeScript';
    const limit = 20;
    const date = new Date('2019-02-22');
    jest
      .spyOn(githubRankingService, 'getGithubRankingData')
      .mockImplementation(() => result);
    expect(
      await githubRankingController.getGithubRanking(language, limit, date),
    ).toEqual(moreLimitLessDataOutput);
  });

  it('should return a empty output', async () => {
    const result = await createResult(correctInput);
    const language = 'Javascript';
    const limit = 20;
    const date = new Date('2019-02-22');
    jest
      .spyOn(githubRankingService, 'getGithubRankingData')
      .mockImplementation(() => result);
    expect(
      await githubRankingController.getGithubRanking(language, limit, date),
    ).toEqual({ count: 0, records: [] });
  });

  it('should return a bad gateway 400 because limit is -20', async () => {
    const language = 'TypeScript';
    const limit = -20;
    const date = new Date('2019-02-22');
    try {
      await githubRankingController.getGithubRanking(language, limit, date);
      expect(githubRankingService.getGithubRankingData).toBeCalledTimes(0);
    } catch (exception) {
      expect(exception.response.statusCode).toEqual(400);
      expect(exception.response.message).toEqual(
        'Limit should be greater than zero',
      );
    }
  });

  it('should return a bad gateway 400 because date is from future', async () => {
    const language = 'TypeScript';
    const limit = 20;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    try {
      await githubRankingController.getGithubRanking(language, limit, date);
      expect(githubRankingService.getGithubRankingData).toBeCalledTimes(0);
    } catch (exception) {
      expect(exception.response.statusCode).toEqual(400);
      expect(exception.response.message).toEqual('InCorrect Date');
    }
  });

  it('should return a bad gateway 400 because date is incorrect', async () => {
    const language = 'TypeScript';
    const limit = 20;
    const date = new Date('2023-13-13');
    try {
      await githubRankingController.getGithubRanking(language, limit, date);
      expect(githubRankingService.getGithubRankingData).toBeCalledTimes(0);
    } catch (exception) {
      expect(exception.response.statusCode).toEqual(400);
      expect(exception.response.message).toEqual('InCorrect Date');
    }
  });
  it('should return a bad gateway 400 because language is empty', async () => {
    const language = '';
    const limit = 20;
    const date = new Date('2023-01-01');
    try {
      await githubRankingController.getGithubRanking(language, limit, date);
      expect(githubRankingService.getGithubRankingData).toBeCalledTimes(0);
    } catch (exception) {
      expect(exception.response.statusCode).toEqual(400);
      expect(exception.response.message).toEqual('InCorrect Language');
    }
  });
  it('should return a bad gateway 400 because limit is NaN', async () => {
    const language = '';
    const limit = NaN;
    const date = new Date('2023-01-01');
    try {
      await githubRankingController.getGithubRanking(language, limit, date);
      expect(githubRankingService.getGithubRankingData).toBeCalledTimes(0);
    } catch (exception) {
      expect(exception.response.statusCode).toEqual(400);
      expect(exception.response.message).toEqual(
        'Limit should be greater than zero',
      );
    }
  });
});
