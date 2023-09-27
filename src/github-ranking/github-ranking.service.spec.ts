import { Test, TestingModule } from '@nestjs/testing';
import { GithubRankingService } from './github-ranking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

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
});
