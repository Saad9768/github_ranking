import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { GithubRankingService } from './github-ranking.service';
import { Utils } from '../util/utils';
@Controller('github-ranking')
export class GithubRankingController {
  constructor(private readonly githubRankingService: GithubRankingService) {}
  @Get()
  async getGithubRanking(
    @Query('language') language: string,
    @Query('limit') limit: number,
    @Query('date') date: Date,
  ) {
    this.validateInput(limit, language, date);
    const data = await this.githubRankingService.getGithubRankingData(date);
    const csvDataOutput = await this.githubRankingService.parseCsv(
      data,
      language,
    );
    const sortedData = Utils.sortByKeys(csvDataOutput, 'rank', 'stars');
    const finalOutput = Utils.removeDuplicateAndLimitByKey(
      sortedData,
      limit,
      'repo_url',
    );
    return { count: finalOutput.length, records: finalOutput };
  }

  validateInput(limit: number, language: string, date: Date) {
    if (!limit || limit < 0) {
      throw new BadRequestException('Limit should be greater than zero');
    }
    const validDate = isFinite(+(date instanceof Date ? date : new Date(date)));
    if (!validDate || new Date(date) > new Date()) {
      throw new BadRequestException('InCorrect Date');
    }
    if (!language) {
      throw new BadRequestException('InCorrect Language');
    }
  }
}
