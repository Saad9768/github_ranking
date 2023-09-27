import {
    BadRequestException,
    Controller,
    Get,
    HttpException,
    Logger,
    Query,
} from '@nestjs/common';
import { GithubRankingService } from './github-ranking.service';
import { GithubRankingInterface } from 'src/model/github-ranking-interface';
import { AxiosError } from 'axios';
import { Utils } from '../util';

@Controller('github-ranking')
export class GithubRankingController {
    constructor(private readonly githubRankingService: GithubRankingService) { }
    private readonly logger = new Logger(GithubRankingController.name);
    @Get()
    async getGithubRanking(
        @Query('language') language: string,
        @Query('limit') limit: number,
        @Query('date') date: Date,
    ) {
        if (limit < 0) {
            throw new BadRequestException('Limit should be greater than zero');
        }
        const validDate = isFinite(+(date instanceof Date ? date : new Date(date)));
        if (!validDate || new Date(date) > new Date()) {
            throw new BadRequestException('InCorrect Date');
        }
        if (!language) {
            throw new BadRequestException('InCorrect Language');
        }
        try {
            const data = await this.githubRankingService.getGithubRankingData(date);
            const csvDataOutput: GithubRankingInterface[] =
                await this.githubRankingService.parseCsv(data, language);
            const sortedOutput = Utils.sortByKeys(csvDataOutput, 'rank', 'stars');
            const finalOutput = this.githubRankingService.selectOnlyTopRatedRepo(
                sortedOutput,
                limit,
            );
            return { count: finalOutput.length, records: finalOutput };
        } catch (err) {
            const status =
                err instanceof AxiosError
                    ? err?.response?.status
                    : err?.response?.statusCode
                        ? err.response.statusCode
                        : 500;
            this.logger.error('Error ::  ', err);
            throw new HttpException(err?.message, status);
        }
    }
}
