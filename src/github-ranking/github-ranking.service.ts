import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { GithubRankingInterface } from 'src/model/github-ranking-interface';

@Injectable()
export class GithubRankingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getGithubRankingData(date: Date): Promise<string> {
    const rankingUrl = this.config
      .get('GITHUB_RANKING_URL')
      .replace('[date]', date);
    const { data } = await this.httpService.axiosRef.get(rankingUrl);
    return data;
  }

  parseCsv(data: string, language: string): Promise<GithubRankingInterface[]> {
    const csvStream = new Readable();
    csvStream.push(data);
    csvStream.push(null);
    const filteredRepos: GithubRankingInterface[] = [];
    return new Promise((resolve, reject) => {
      csvStream
        .pipe(csvParser())
        .on('data', (row: GithubRankingInterface) => {
          // Filter by language
          if (row.language.toLowerCase() === language.toLowerCase()) {
            for (const el of ['rank', 'stars', 'forks', 'issues']) {
              row[el] = !isNaN(row[el]) ? parseInt(row[el]) : row[el];
            }
            filteredRepos.push(row);
          }
        })
        .on('end', () => {
          resolve(filteredRepos);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  selectOnlyTopRatedRepo(sortedOutput: GithubRankingInterface[], limit: number) {
    const topRepo = [];
    for (const obj of sortedOutput) {
      if (topRepo.length >= limit) {
        break;
      }
      const { repo_url } = obj;
      const foundRepo = topRepo.find((r) => r.repo_url === repo_url);
      if (!foundRepo) {
        topRepo.push(obj);
      }
    }
    return topRepo;
  }
}
