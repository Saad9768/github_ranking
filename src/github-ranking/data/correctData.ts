export const correctInput = `rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description
1,top-100-stars,freeCodeCamp,371207,33180,TypeScript,https://github.com/freeCodeCamp/freeCodeCamp,freeCodeCamp,202,2023-08-22T02:49:26Z,freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.`;

export const correctOutput = {
  count: 1,
  records: [
    {
      description:
        "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
      forks: 33180,
      issues: 202,
      item: 'top-100-stars',
      language: 'TypeScript',
      last_commit: '2023-08-22T02:49:26Z',
      rank: 1,
      repo_name: 'freeCodeCamp',
      repo_url: 'https://github.com/freeCodeCamp/freeCodeCamp',
      stars: 371207,
      username: 'freeCodeCamp',
    },
  ],
};
