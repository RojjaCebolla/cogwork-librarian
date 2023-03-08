@preproccesor typescript
@builtin "whitespace.ne"
@builtin "string.ne"

@{%
const { oracleFilters } = require('./oracleFilter')
%}

main -> filterStart {% id %}

filterStart ->
      _ {% () => oracleFilters.identity() %}
    | _ filter _ {% ([, filter]) => {
        return filter
    } %}

filter ->
      filter __ connector clause {% ([clause1, _, connectorFunc, clause2]) => {
        return connectorFunc(clause1, clause2)
      } %}
    | clause {% id %}

clause -> "-":? (
      "(" filter ")" {% ([_, f]) => [f] %}
    | condition
) {% ([negation, [inner]]) => {
    if (negation) {
        return oracleFilters.not(inner)
    }
    return inner
} %}

connector ->
      (null | "and"i __) {% () => oracleFilters.and %}
    | "or"i __           {% () => oracleFilters.or %}

condition -> (
    cmcCondition |
    colorCondition |
    colorIdentityCondition |
    manaCostCondition |
    nameCondition |
    nameRegexCondition |
    oracleCondition |
    oracleRegexCondition |
    fullOracleCondition |
    fullOracleRegexCondition |
    keywordCondition |
    typeCondition |
    typeRegexCondition |
    powerCondition |
    toughCondition |
    loyaltyCondition |
    layoutCondition |
    formatCondition |
    bannedCondition |
    restrictedCondition |
    isCondition |
    notCondition |
    inCondition |
    rarityCondition |
    setCondition |
    setTypeCondition |
    artistCondition |
    borderCondition |
    collectorNumberCondition
) {% ([[condition]]) => condition %}


cmcCondition -> ("manavalue"i | "mv"i | "cmc"i) anyOperator integerValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["cmc"],
        filterFunc: oracleFilters.defaultOperation('cmc', operator, value),
    }) %}

nameCondition -> ("name"i) (":" | "=") stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["name"],
        filterFunc: oracleFilters.textMatch('name', value)
    })%} |
    stringValue {% ([value]) => ({
        filtersUsed: ["name"],
        filterFunc: oracleFilters.textMatch('name', value),
    }) %}

nameRegexCondition -> ("name"i) (":" | "=") regexString
    {% ([_, [_op], value]) => ({
        filtersUsed: ["name"],
        filterFunc: oracleFilters.regexMatch('name', value)
    })%} |
    regexString {% ([value]) => ({
        filtersUsed: ["name"],
        filterFunc: oracleFilters.regexMatch('name', value),
    }) %}

colorCondition -> ("c"i | "color"i) anyOperator colorCombinationValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["color"],
        filterFunc: oracleFilters.colorMatch(operator, new Set(value)),
    }) %}

colorIdentityCondition -> ("ci"i | "commander"i | "identity"i | "id"i) anyOperator colorCombinationValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["identity"],
        filterFunc: oracleFilters.colorIdentityMatch(operator, new Set(value)),
    }) %}

manaCostCondition -> ("mana"i | "m"i) anyOperator manaCostValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["mana"],
        filterFunc: oracleFilters.manaCostMatch(operator, value),
    }) %}

oracleCondition -> ("oracle"i | "o"i | "text"i) (":" | "=") stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["oracle"],
        filterFunc: oracleFilters.noReminderTextMatch('oracle_text', value),
    }) %}

oracleRegexCondition -> ("oracle"i | "o"i | "text"i) (":" | "=") regexString
    {% ([_, [_op], value]) => ({
        filtersUsed: ["oracle"],
        filterFunc: oracleFilters.noReminderRegexMatch('oracle_text', value),
    }) %}

fullOracleCondition -> ("fo"i) (":" | "=") stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["full-oracle"],
        filterFunc: oracleFilters.textMatch('oracle_text', value),
    }) %}

fullOracleRegexCondition -> ("fo"i) (":" | "=") regexString
    {% ([_, [_op], value]) => ({
        filtersUsed: ["full-oracle"],
        filterFunc: oracleFilters.regexMatch('oracle_text', value),
    }) %}

keywordCondition -> "keyword"i (":" | "=") stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["full-oracle"],
        filterFunc: oracleFilters.keywordMatch(value),
    }) %}

typeCondition -> ("t"i | "type"i) (":" | "=") stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["type"],
        filterFunc: oracleFilters.textMatch('type_line', value),
    }) %}

typeRegexCondition -> ("t"i | "type"i) (":" | "=") regexString
    {% ([_, [_op], value]) => ({
        filtersUsed: ["type"],
        filterFunc: oracleFilters.regexMatch('type_line', value),
    }) %}

powerCondition -> ("pow"i | "power"i) anyOperator integerValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["pow"],
        filterFunc: oracleFilters.powTouOperation('power', operator, value),
    }) %}

toughCondition -> ("tou"i | "toughness"i) anyOperator integerValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["tou"],
        filterFunc: oracleFilters.powTouOperation('toughness', operator, value),
    }) %}

loyaltyCondition -> ("loy"i | "loyalty"i) anyOperator integerValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["loyalty"],
        filterFunc: oracleFilters.powTouOperation('loyalty', operator, value),
    }) %}

layoutCondition -> ("layout"i) equalityOperator stringValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["layout"],
        filterFunc: oracleFilters.defaultOperation('layout', operator, value),
    }) %}

formatCondition -> ("format"i | "f"i) equalityOperator formatValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["format"],
        filterFunc: oracleFilters.formatMatch('legal', value),
    }) %}

bannedCondition -> "banned"i equalityOperator formatValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["banned"],
        filterFunc: oracleFilters.formatMatch('banned', value),
    }) %}

restrictedCondition -> "restricted"i equalityOperator formatValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["restricted"],
        filterFunc: oracleFilters.formatMatch('restricted', value),
    }) %}

isCondition -> "is"i ":" isValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["is"],
        filterFunc: oracleFilters.isVal(value),
    }) %}

notCondition -> "not"i ":" isValue
    {% ([_, [_op], value]) => oracleFilters.not({
        filtersUsed: ["is"],
        filterFunc: oracleFilters.isVal(value),
    }) %}

inCondition -> "in"i ":" stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["in"],
        filterFunc: oracleFilters.inFilter(value),
    }) %}


# print-matters
# todo: oracleFilter defines the object structure that's returned
rarityCondition -> ("r"i | "rarity"i) anyOperator rarityValue
    {% ([_, [operator], value]) => ({
        filtersUsed: ["rarity"],
        filterFunc: oracleFilters.rarityFilter(operator, value),
        inverseFunc: oracleFilters.notRarityFilter(operator, value),
    }) %}

setCondition -> ("s"i | "set"i| "e"i | "edition"i) equalityOperator stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["set"],
        filterFunc: oracleFilters.setFilter(value),
        inverseFunc: oracleFilters.notSetFilter(value),
    }) %}

setTypeCondition -> "st"i equalityOperator stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["set-type"],
        filterFunc: oracleFilters.setTypeFilter(value),
        inverseFunc: oracleFilters.notSetTypeFilter(value),
    }) %}

artistCondition -> ("a"i | "artist"i) equalityOperator stringValue
    {% ([_, [_op], value]) => ({
        filtersUsed: ["artist"],
        filterFunc: oracleFilters.artistFilter(value),
        inverseFunc: oracleFilters.notArtistFilter(value),
    }) %}

collectorNumberCondition -> "cn"i anyOperator integerValue
    {% ([_, [operator], value]) => oracleFilters.collectorNumberFilter(operator, value) %}

borderCondition -> "border"i equalityOperator stringValue
    {% ([_, [_op], value]) => oracleFilters.borderFilter(value) %}

@include "./values.ne"