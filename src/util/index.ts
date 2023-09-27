export class Utils {
  static sortByKeys<T>(data: T[], fKey: string, sKey: string) {
    return data.sort((x: T, y: T) =>
      x[fKey] === y[fKey] ? x[sKey] - y[sKey] : x[fKey] - y[fKey],
    );
  }
}
