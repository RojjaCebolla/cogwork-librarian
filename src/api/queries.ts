import { isValues } from './card'

export const displayQueries = [
  'o=/whenever ~ deals/',
  'o:/add {.}\\./',
  '-o:~',
  'cmc:1',
  'o:draw',
  'o:"draw a card"',
  'o:"elf" or o:"goblin"',
  '(o:"elf" or o:"goblin") -o:~',
  'o:"create a"',
  'pow=6',
  'tou=9',
  't=creature',
  't:merfolk',
  't="legendary creature"',
  't=/tribal .* elf/',
  'c=g',
  'c:g',
  'c<=w',
  'c>R',
  'c>=U',
  'c=ur',
  'c=urg',
  'c=urgwb',
  'c=witherbloom',
  'c<=savai',
  'c=c',
  'name=/^A-/',
  't:adventure',
  'o:/sacrifice a.*:/ t:artifact',
  'o:/sacrifice a.*:/ t:creature',
  'c=urgw', // reported upstream: https://github.com/dekkerglen/CubeCobra/issues/2337
  'is:modal -t:scheme',
  'is:filterland',
]

export const testQueries = [
  ...displayQueries,
  ...Object.values(isValues).map((it) => `is:${it}`),
  'layout:art_series',
  'o=draw',
  'o="draw a card"',
  'o:/elf/ OR o:/goblin/',
  "o:'elf' oR o:'goblin'",
  'o:"elf" Or o:"goblin"',
  'o:/{t}: add \{.}\./',
  'o:"CREATURE"',
  'pow>10',
  'pow<10',
  'power=6',
  'toughness=9',
  't=merfolk',
  't=CREATURE',
  '-layout:art_series',
  '-type=token',
  'pow=0 name:tarmogoyf',
  'keyword:flying',
  `fo:"put the rest on the bottom"`,
  'format:pioneer',
  'banned:modern',
  'restricted:vintage',
  'is:spell',
  'r:rare',
  'rarity:r',
  'set:m11',
  'edition:m12',
  'border:white cn:69',
  'not:promo',
  'date<=2015-08-18',
  'usd>5',
  'eur<1',
  'tix>10',
]

const unimplementedQueries = [
  't:plane', // this currently gets planeswalkers too, but scryfall only shows planes
  'pow>tou',
  'pt<=5',
  'is:frenchvanilla',
  'is:party',
  'is:historic',
  'include:extras', // this one seems to be processed separately?
  'in:rare',
  'number:69',
  'st:funny',
  'is:booster or is:planeswalker_deck',
  'is:league',
  'is:etched',
  'is:buyabox',
  'is:giftbox',
  'is:intro_pack',
  'is:gameday',
  'is:prerelease',
  'is:release',
  'is:fnm',
  'is:judge_gift',
  'is:arena_league',
  'is:player_rewards',
  'is:media_insert',
  'is:instore',
  'is:convention',
  'is:set_promo',
  'is:commander',
  'is:brawler',
  'is:companion',
  'has:watermark',
  'flavor:banana',
  'wm:orzhov',
  'is:reprint',
  'is:foil',
  'is:spotlight',
  'new:flavor',
  'has:indicator',
  'new:art',
  'new:artist',
  'border:white',
  'stamp:oval',
  'stamp:acorn',
  'stamp:triangle',
  'stamp:arena',
  '-in:mtgo f:legacy',
  'year=2020',
  'date>ori',
  'lang:any',
  'language:japanese',
  'in:ru',
  'new:language',
  'is:colorshifted',
]

const notGonnaImplementQueries = [
  'cube:april',
  'is:hires',
  'art|atag|arttag|function|otag|oracletag'
] // custom regex, display keywords

const brokenQueries = [
  // Both of these aren't handling all of the card faces properly
  "is:dfc c<=w",
  "is:dfc ci<=w",
  "is:token",
]
