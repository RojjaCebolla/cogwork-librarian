import { ObjectValues } from '../../../types'

export const keywords = {
  '!': '!',
  a: 'a', artist: 'artist',
  banned: 'banned',
  border: 'border',
  c: 'c', color: 'color',
  cn: 'cn', number: 'number',
  ci: 'ci', commander: 'commander', id: 'id', identity: 'identity',
  cmc: 'cmc', mv: 'mv', manavalue: 'manavalue',
  // tag and ctag are custom aliases for cube
  cube: 'cube', tag: 'tag', ctag: 'ctag',
  date: 'date', year: 'year',
  devotion: 'devotion', // !Devotion can only match single color or hybrid mana. No two-brid either
  direction: 'direction',
  e: 'e', edition: 'edition', s: 's', set: 'set',
  eur: 'eur',
  f: 'f', format: 'format',
  fo: 'fo',
  frame: 'frame',
  flavor: 'flavor', ft: 'ft',
  game: 'game',
  is: 'is', has: 'has',
  in: 'in',
  keyword: 'keyword', kw: 'kw',
  lang: 'lang', language: 'language',
  layout: 'layout',
  loy: 'loy', loyalty: 'loyalty',
  m: 'm', mana: 'mana',
  name: 'name',
  not: 'not',
  o: 'o', oracle: 'oracle',
  pow: 'pow', power: 'power',
  def: 'def', defense: 'defense',
  powtou: 'powtou', pt: 'pt',
  produces: 'produces',
  prints: 'prints',
  order: 'order',
  r: 'r', rarity: 'rarity',
  restricted: 'restricted',
  st: 'st',
  stamp: 'stamp',
  t: 't', type: 'type',
  text: 'text',
  tix: 'tix',
  tou: 'tou', toughness: 'toughness',
  usd: 'usd',
  unique: 'unique',
  watermark: 'watermark', wm: 'wm',
  // Requires tagging data
  function: 'function', oracletag: 'oracletag', otag: 'otag',
  art: 'art', arttag: 'arttag', atag: 'atag',
} as const

export const keywordsToImplement = {
  // https://discord.com/channels/291498816459243521/361685936179904513/1104796430830411777
  new: 'new', // rarity, flavor, art, artist, frame, language, game, paper, mtgo, arena, nonfoil, foil
  // its not: etched, masterpiece, promo, border, stamp
  prefer: 'prefer',
  // Requires set data
  b: 'b', block: 'block',
  // these affect scryfall's UI behavior. are they needed here?
  include: 'include', // maybe this one overrides a similar scryfall default?
  // display: 'display', is display needed?
  paperprints: 'paperprints',
} as const

const all = {
  ...keywords,
  ...keywordsToImplement,
} as const

export type FilterKeyword = ObjectValues<typeof all>

export enum FilterType {
  CmcInt,
  CmcOddEven,
  Name,
  NameExact,
  NameRegex,
  ColorSet,
  ColorInt,
  ColorIdentitySet,
  ColorIdentityInt,
  Mana,
  Oracle,
  OracleRegex,
  FullOracle,
  FullOracleRegex,
  Keyword,
  Type,
  TypeRegex,
  Power,
  Tough,
  PowTou,
  Loyalty,
  Defense,
  Layout,
  Format,
  Banned,
  Restricted,
  Is,
  Not,
  Prints,
  In,
  ProducesSet,
  ProducesInt,
  Devotion,
  Unique,
  Order,
  Direction,
  Rarity,
  Set,
  SetType,
  Artist,
  CollectorNumber,
  Border,
  Date,
  Price,
  Frame,
  Flavor,
  FlavorRegex,
  Game,
  Language,
  Stamp,
  Watermark,
  Cube,
  OracleTag,
  IllustrationTag
}