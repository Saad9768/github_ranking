import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { GithubRanking } from 'src/model/github-ranking-interface';

@Injectable()
export class GithubRankingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}
  /**
   *
   * @param date
   * @returns
   */
  async getGithubRankingData(date: Date): Promise<string> {
    const rankingUrl = this.config
      .get('GITHUB_RANKING_URL')
      .replace('[date]', date);
    const { data } = await this.httpService.axiosRef.get(rankingUrl);
    return data;
  }
  /**
   *
   * @param data
   * @param language
   * @returns
   */
  parseCsv(data: string, language: string): Promise<GithubRanking[]> {
    const csvStream = new Readable();
    csvStream.push(data);
    csvStream.push(null);
    const filteredRepos: GithubRanking[] = [];
    return new Promise((resolve, reject) => {
      csvStream
        .pipe(csvParser())
        .on('data', (row: GithubRanking) => {
          // Filter by language
          if (row.language.toLowerCase() === language.toLowerCase()) {
            // change the values to integer
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
}
