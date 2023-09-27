export class Utils {
  static sortByKeys<T>(data: T[], fKey: string, sKey: string) {
    return data.sort((x: T, y: T) =>
      x[fKey] === y[fKey] ? y[sKey] - x[sKey] : x[fKey] - y[fKey],
    );
  }
  static removeDuplicateAndLimitByKey<T>(
    sortedData: T[],
    limit: number,
    key: string,
  ): T[] {
    const topRepo = [];
    for (const obj of sortedData) {
      if (topRepo.length >= limit) {
        break;
      }
      const foundRepo = topRepo.find((r) => r[key] === obj[key]);
      if (!foundRepo) {
        topRepo.push(obj);
      }
    }
    return topRepo;
  }
}
