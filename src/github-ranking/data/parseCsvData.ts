export const parseCsvDataInput = `rank,item,repo_name,stars,forks,language,repo_url,username,issues,last_commit,description
1,top-100-stars,freeCodeCamp,296554,20629,JavaScript,https://github.com/freeCodeCamp/freeCodeCamp,freeCodeCamp,6572,2018-12-18T12:16:12Z,The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.
2,top-100-stars,bootstrap,129436,63583,CSS,https://github.com/twbs/bootstrap,twbs,326,2018-12-18T10:30:50Z,"The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web."
3,top-100-stars,vue,122454,17507,JavaScript,https://github.com/vuejs/vue,vuejs,233,2018-12-18T07:38:59Z,"🖖 A progressive, incrementally-adoptable JavaScript framework for building UI on the web."
4,top-100-stars,react,117818,21368,JavaScript,https://github.com/facebook/react,facebook,516,2018-12-18T01:58:28Z,"A declarative, efficient, and flexible JavaScript library for building user interfaces."`;
export const parseCsvDataOutput = [
  {
    rank: 1,
    item: 'top-100-stars',
    repo_name: 'freeCodeCamp',
    stars: 296554,
    forks: 20629,
    language: 'JavaScript',
    repo_url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    username: 'freeCodeCamp',
    issues: 6572,
    last_commit: '2018-12-18T12:16:12Z',
    description:
      'The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people.',
  },
  {
    rank: 3,
    item: 'top-100-stars',
    repo_name: 'vue',
    stars: 122454,
    forks: 17507,
    language: 'JavaScript',
    repo_url: 'https://github.com/vuejs/vue',
    username: 'vuejs',
    issues: 233,
    last_commit: '2018-12-18T07:38:59Z',
    description:
      '🖖 A progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
  },
  {
    rank: 4,
    item: 'top-100-stars',
    repo_name: 'react',
    stars: 117818,
    forks: 21368,
    language: 'JavaScript',
    repo_url: 'https://github.com/facebook/react',
    username: 'facebook',
    issues: 516,
    last_commit: '2018-12-18T01:58:28Z',
    description:
      'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
  },
];
