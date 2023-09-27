import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingService } from './github-ranking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { parseCsvDataInput, parseCsvDataOutput } from './data/parseCsvData';

describe('GithubRankingService', () => {
  let service: GithubRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [GithubRankingService],
    }).compile();

    service = module.get<GithubRankingService>(GithubRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be parsecsvData correctly', async () => {
    expect(await service.parseCsv(parseCsvDataInput, 'Javascript')).toEqual(parseCsvDataOutput);
  });
  it('should be parsecsvData correctly but return an empty array because typescript is not present in the data',
    async () => {
      expect(await service.parseCsv(parseCsvDataInput, 'Typescript')).toEqual([]);
    });
});
