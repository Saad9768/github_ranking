export class Utils {
  /**
   *
   * @param data
   * @param fKey
   * @param sKey
   * @returns
   */
  static sortByKeys<T>(data: T[], fKey: string, sKey: string) {
    return data.sort((x: T, y: T) =>
      x[fKey] === y[fKey] ? y[sKey] - x[sKey] : x[fKey] - y[fKey],
    );
  }
  /**
   *
   * @param data
   * @param limit
   * @param key
   * @returns
   */
  static removeDuplicateAndLimitByKey<T>(
    data: T[],
    limit: number,
    key: string,
  ): T[] {
    const topRepo = [];
    for (const obj of data) {
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
