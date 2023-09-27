import { sortedInputed, sortedOuput } from './data/removeDuplicateAndLimitData';
import {
  inputSortFirstKeyData,
  inputSortSecondKeyData,
  outputSortFirstKeyData,
  outputSortSecondKeyData,
} from './data/sortData';
import { Utils } from './utils';
describe('Utils', () => {
  it('should be sort and limit correct values :: only first key considered', () => {
    expect(Utils.sortByKeys(inputSortFirstKeyData, 'rank', 'stars')).toEqual(
      outputSortFirstKeyData,
    );
  });
  it('should be sort and limit correct values :: second key also considered', () => {
    expect(Utils.sortByKeys(inputSortSecondKeyData, 'rank', 'stars')).toEqual(
      outputSortSecondKeyData,
    );
  });
  it('should filter and limit correct values', () => {
    expect(
      Utils.removeDuplicateAndLimitByKey(sortedInputed, 2, 'repo_url'),
    ).toEqual(sortedOuput);
  });
});
