const raw = [
  [1, 'Look Away', 'Chicago'],
  [2, 'My Prerogative', 'Bobby Brown'],
  [3, 'Every Rose Has Its Thorn', 'Poison'],
  [4, 'Straight Up', 'Paula Abdul'],
  [5, 'Miss You Much', 'Janet Jackson'],
  [6, 'Cold Hearted', 'Paula Abdul'],
  [7, 'Wind Beneath My Wings', 'Bette Midler'],
  [8, "Girl You Know It's True", 'Milli Vanilli'],
  [9, 'Baby, I Love Your Way/Freebird Medley', 'Will to Power'],
  [10, 'Giving You the Best That I Got', 'Anita Baker'],
  [11, 'Right Here Waiting', 'Richard Marx'],
  [12, 'Waiting For a Star to Fall', 'Boy Meets Girl'],
  [13, 'Lost in Your Eyes', 'Debbie Gibson'],
  [14, "Don't Wanna Lose You", 'Gloria Estefan'],
  [15, 'Heaven', 'Warrant'],
  [16, "Girl I'm Gonna Miss You", 'Milli Vanilli'],
  [17, 'The Look', 'Roxette'],
  [18, 'She Drives Me Crazy', 'Fine Young Cannibals'],
  [19, 'On Our Own', 'Bobby Brown'],
  [20, 'Two Hearts', 'Phil Collins'],
  [21, 'Blame It on the Rain', 'Milli Vanilli'],
  [22, 'Listen to Your Heart', 'Roxette'],
  [23, "I'll Be There for You", 'Bon Jovi'],
  [24, "If You Don't Know Me by Now", 'Simply Red'],
  [25, 'Like a Prayer', 'Madonna'],
  [26, "I'll Be Loving You (Forever)", 'New Kids on the Block'],
  [27, 'How Can I Fall?', 'Breathe'],
  [28, "Baby Don't Forget My Number", 'Milli Vanilli'],
  [29, 'Toy Soldiers', 'Martika'],
  [30, 'Forever Your Girl', 'Paula Abdul'],
  [31, 'The Living Years', 'Mike + The Mechanics'],
  [32, 'Eternal Flame', 'The Bangles'],
  [33, 'Wild Thing', 'Tone Loc'],
  [34, 'When I See You Smile', 'Bad English'],
  [35, 'If I Could Turn Back Time', 'Cher'],
  [36, 'Buffalo Stance', 'Neneh Cherry'],
  [37, "When I'm with You", 'Sheriff'],
  [38, "Don't Rush Me", 'Taylor Dayne'],
  [39, 'Born to Be My Baby', 'Bon Jovi'],
  [40, 'Good Thing', 'Fine Young Cannibals'],
  [41, 'The Lover in Me', 'Sheena Easton'],
  [42, 'Bust a Move', 'Young MC'],
  [43, 'Once Bitten, Twice Shy', 'Great White'],
  [44, 'Batdance', 'Prince'],
  [45, 'Rock On', 'Michael Damian'],
  [46, 'Real Love', 'Jody Watley'],
  [47, 'Love Shack', "The B-52's"],
  [48, 'Every Little Step', 'Bobby Brown'],
  [49, "Hangin' Tough", 'New Kids on the Block'],
  [50, "My Heart Can't Tell You No", 'Rod Stewart'],
];

const parseRaw = () => {
  const result = {};
  return raw.map((x) => {
    return {
      billBoardRank1989: x[0],
      albumName: x[1],
      artistName: x[2],
    };
  });
};

const testData = parseRaw();
module.exports = testData;
