/**
 * English editorial content for the /en/tax-calculator/[canton]/ pages — a
 * faithful English rendering of the German canton texts (src/lib/cantonContent.ts),
 * preserving each canton's individually-verified tax characteristics so the
 * pages satisfy the same SEO_SPEC §3.2 anti-doorway rules. Quantitative figures
 * are injected by the page template; `compare` and `portal` are reused from the
 * German editorial (language-neutral).
 */
export interface CantonEditorialEn {
  intro: string;
  faq: { q: string; a: string };
}

export const CANTON_CONTENT_EN: Record<string, CantonEditorialEn> = {
  ZH: {
    intro:
      'The canton of Zurich taxes income on a progressive bracket schedule, to which the canton and municipalities apply their multipliers. The city of Zurich sits well above the affluent lakeside municipalities: between the cheapest and the most expensive municipality in the canton lie several dozen multiplier points — for high incomes, where you live within the canton is worth thousands of francs. As Switzerland’s most populous canton with its largest labour market, Zurich remains mid-table for tax: noticeably more expensive than Central Switzerland, but cheaper than French-speaking Switzerland.',
    faq: {
      q: 'Why are taxes lower on Lake Zurich than in the city of Zurich?',
      a: 'Municipalities with high tax capacity per resident — such as Zumikon, Kilchberg or Rüschlikon — get by with low multipliers, because a few high-income households carry most of the revenue. The city of Zurich, by contrast, funds central-city services and therefore sits considerably higher.',
    },
  },
  BE: {
    intro:
      'Bern is among Switzerland’s most expensive cantons for income tax — and among those with the widest spread between municipalities: more than 300 Bernese municipalities apply multipliers that can more than double. The cantonal schedule itself is steeply progressive. Anyone living in the Bern agglomeration who compares with neighbouring Solothurn, or even with Central Switzerland, quickly sees four-figure differences per year at middle incomes.',
    faq: {
      q: 'How large are the differences between Bernese municipalities?',
      a: 'Considerable: the cheapest municipality has a multiplier below 90 percent, the most expensive above 200 percent. Within the canton of Bern, a move can thus more than halve the municipal tax — the calculator above shows the burden at the capital, Bern.',
    },
  },
  LU: {
    intro:
      'Lucerne has worked its way, through several tax reforms, into the cheaper half of Switzerland and is today the least expensive way to combine a “Central Swiss tax level” with a larger centre. The schedule is moderately progressive, the city of Lucerne sits above the cantonal average, many agglomeration municipalities below it. A clear gap remains to neighbours Zug and Schwyz — but against Bern or Zurich, a Lucerne address saves noticeably.',
    faq: {
      q: 'Is Lucerne comparable to Zug for tax?',
      a: 'No — Zug remains in a league of its own. But Lucerne positions itself as the cheapest “large” centre in Central Switzerland: lower than Zurich, Bern or Basel, while clearly above Zug, Schwyz and Nidwalden.',
    },
  },
  UR: {
    intro:
      'Uri is one of only two cantons to forgo a progressive schedule: taxable income is charged at a single proportional (“flat”) rate, to which the canton and municipalities apply their multipliers. That makes the calculation unusually transparent — and attractive for high incomes, because the marginal rate does not rise. Combined with low living costs, Uri regularly ranks among the cheapest cantons outside the well-known tax hubs.',
    faq: {
      q: 'What does Uri’s flat rate mean in practice?',
      a: 'Every franc of taxable income is charged the same — there are no progression brackets. Your average tax rate therefore equals your marginal rate. In Uri, tax accordingly grows linearly with income rather than more than proportionally.',
    },
  },
  SZ: {
    intro:
      'Schwyz has for decades been one of the top addresses for low income taxes and regularly ranks just behind Zug. One peculiarity: a separate official municipal schedule applies to the municipal tax — our calculator uses it exactly as the Federal Tax Administration (FTA) publishes it. Between the tax-favourable municipalities on the upper Lake Zurich and the other valleys there are substantial differences; the capital, Schwyz, itself is not among the canton’s cheapest corners.',
    faq: {
      q: 'Why does the canton of Schwyz use a separate municipal schedule?',
      a: 'In the Schwyz system, the municipal tax is not simply levied as a percentage of the cantonal tax, but via its own schedule curve to which the municipal multiplier is applied. Our calculator reproduces exactly this official structure — which many simple calculators ignore.',
    },
  },
  OW: {
    intro:
      'Obwalden was the pioneer of the flat-rate tax in Switzerland: instead of a progressive schedule, a uniform proportional rate of 1.8 percent applies as the simple tax, multiplied by the canton and municipal multipliers. This radical simplification turned the small Central Swiss canton overnight into one of the country’s cheapest tax locations — especially for high incomes, whose marginal rate does not rise here.',
    faq: {
      q: 'For whom is Obwalden’s flat schedule most worthwhile?',
      a: 'The higher the income, the greater the advantage over progressive cantons: while elsewhere the marginal rate rises with income, in Obwalden it stays constant. For low incomes the effect is smaller, since progressive schedules place little burden there anyway.',
    },
  },
  NW: {
    intro:
      'Nidwalden combines Central Swiss low-tax policy with immediate proximity to Lucerne: anyone living in the Stans area and working in the city combines short commutes with a tax burden that regularly ranks among the five cheapest cantons. The schedule is flat, and the differences between the eleven municipalities are comparatively small — unlike in Bern or Zurich, the choice of municipality plays only a secondary role here.',
    faq: {
      q: 'How much do Nidwalden’s municipalities differ?',
      a: 'Hardly at all — the spread of municipal multipliers is one of the narrowest in Switzerland. Choosing where to live within Nidwalden changes the tax bill only slightly; what matters is crossing the cantonal border.',
    },
  },
  GL: {
    intro:
      'Glarus flies under the tax radar: no low-tax marketing, but a solid position in the upper mid-table — clearly cheaper than the large centres, without Central Switzerland’s extreme values. Since its historic municipal merger, the canton consists of just three municipalities, so the tax landscape is very clear. For commuters into the Glarus region or towards Zurich, comparing with the neighbours can be worthwhile.',
    faq: {
      q: 'How many municipalities does the canton of Glarus have?',
      a: 'Just three: Glarus, Glarus Nord and Glarus Süd — the result of Switzerland’s most radical municipal merger. The multiplier differences between them are therefore minimal, which greatly simplifies the choice of where to live within the canton.',
    },
  },
  ZG: {
    intro:
      'Zug is the benchmark for Swiss income tax: in virtually every comparison — including our ranking across all 26 capitals — the canton comes first. This is made possible by a deliberately flat schedule, generous brackets and municipal multipliers that, even at the canton’s most expensive spot, remain below what the cheapest municipality charges elsewhere. The flip side is Switzerland’s highest housing costs — the tax saving is effectively redistributed into the rent.',
    faq: {
      q: 'Is moving to Zug worthwhile despite high rents?',
      a: 'It’s a calculation: the annual tax saving compared with your current home (calculator above) must exceed the extra cost of rent or purchase price. For high incomes the sums often work out; for middle incomes often not — precisely because Zug’s housing costs partly capitalise the tax advantage.',
    },
  },
  FR: {
    intro:
      'The bilingual canton of Fribourg calculates with a peculiarity: the schedule defines directly, for each income level, an effective tax rate that is linearly interpolated between the reference points — a continuous curve rather than discrete progression brackets. On balance, Fribourg lands in the more expensive third of Switzerland, clearly above the neighbouring Bernese plateau level for high incomes, but with family-friendly elements in the schedule’s structure.',
    faq: {
      q: 'What does an “interpolated schedule” mean in the canton of Fribourg?',
      a: 'The Fribourg schedule sets rates at reference points (for example at 10\'000, 20\'000, 30\'000 francs) and calculates the rate between them linearly. Your effective tax rate thus grows continuously with income — there are no jumps at bracket boundaries.',
    },
  },
  SO: {
    intro:
      'Solothurn sits between tax worlds: cheaper than neighbouring Bern, more expensive than Aargau, with which it competes for newcomers from the Zurich and Basel regions. The cantonal schedule is classically progressive; the municipal multipliers spread widely, so within the canton a close look pays off. For commuters towards Basel or Bern, Solothurn is often the compromise between affordable housing costs and a tolerable tax burden.',
    faq: {
      q: 'Is Solothurn attractive for commuters to Basel?',
      a: 'Often yes: the tax burden is lower than in Basel-Stadt, housing costs too — in return come commuting time and cost. Compare your concrete figures with the calculator above and the cantonal comparison.',
    },
  },
  BS: {
    intro:
      'Basel-Stadt is the special case among the cantons: just three municipalities — Basel, Riehen and Bettingen — form Switzerland’s smallest canton, and the city of Basel takes on much of what municipal taxes fund elsewhere. The cantonal share of the tax bill is correspondingly high. In the national comparison, Basel-Stadt is among the most expensive locations for income tax; the two rural municipalities of Riehen and Bettingen are noticeably cheaper than the core city.',
    faq: {
      q: 'Within Basel-Stadt, is it worth moving to Riehen or Bettingen?',
      a: 'For tax, yes: both rural municipalities levy noticeably lower municipal taxes than the city of Basel. As the canton has only three municipalities, that is also the only lever — only a move to Basel-Landschaft or Solothurn achieves larger effects.',
    },
  },
  BL: {
    intro:
      'Basel-Landschaft is the only canton to calculate income tax by means of a mathematical formula with a logarithm rather than a bracket table — the progression is therefore perfectly continuous. For taxpayers this means no schedule jumps, but also a calculation that can hardly be reproduced by hand. Our calculator evaluates the official formula exactly. In the ranking, Basel-Landschaft lands in the more expensive third, yet stays cheaper than the core city of Basel.',
    faq: {
      q: 'How does the Basel-Landschaft tax formula work?',
      a: 'The schedule defines the tax due as a continuous function of income (with a logarithmic term) — published by the FTA as an official formula, which our calculator evaluates unchanged. The advantage: the marginal burden rises continuously, without the threshold effects of classic bracket schedules.',
    },
  },
  SH: {
    intro:
      'Schaffhausen actively uses its border location: the northernmost canton has for years positioned itself, with moderate corporate and income taxes, against the expensive Zurich neighbourhood — and as an alternative for newcomers from Germany. The burden sits in the solid mid-table, clearly below the city-of-Zurich level. Within this compact canton the municipal multipliers spread only moderately, and the capital is a good guide for the whole region.',
    faq: {
      q: 'Is Schaffhausen cheaper than Zurich?',
      a: 'At comparable incomes, generally yes — especially against the city of Zurich the bill mostly falls in Schaffhausen’s favour. Against cheap Zurich lakeside municipalities the lead shrinks. The cantonal comparison shows your concrete difference.',
    },
  },
  AR: {
    intro:
      'Appenzell Ausserrhoden offers Eastern Swiss tax conditions a notch below St. Gallen: the schedule is simply built, the burden sits in the cheaper mid-table, and with Herisau the capital is at the same time the economic centre. Anyone working in the St. Gallen area often finds in Ausserrhoden the more attractive place to live for tax — even if Appenzell Innerrhoden is again clearly lower.',
    faq: {
      q: 'Ausserrhoden or Innerrhoden — where does one pay less?',
      a: 'Appenzell Innerrhoden is clearly cheaper and plays in the league of Zug and Schwyz. Ausserrhoden remains attractive for commuters to St. Gallen, however: better connected, a larger housing supply and still cheaper than the canton of St. Gallen itself.',
    },
  },
  AI: {
    intro:
      'Appenzell Innerrhoden is Switzerland’s smallest canton — and one of the cheapest: at middle and high incomes the half-canton regularly mingles in the leading group with Zug, Schwyz and Nidwalden. Just five districts (the Innerrhoden equivalent of municipalities) share the tax landscape, and the differences between them are moderate. Added to this is an administration of short distances, as only a canton of just over 16,000 residents can offer.',
    faq: {
      q: 'How can such a small canton afford such low taxes?',
      a: 'Lean structures, low central-city burdens and a deliberate location strategy: Innerrhoden funds no big-city infrastructure and keeps its schedule and multipliers consistently low to attract residents and businesses — which in turn broadens the tax base.',
    },
  },
  SG: {
    intro:
      'As Eastern Switzerland’s central canton, St. Gallen carries the typical burdens of a large catchment area — and sits mid-table for tax, noticeably above the two Appenzells, but below French-speaking values. The schedule is progressive, the spread of municipal multipliers considerable: from Lake Constance to the Sarganserland the burden varies clearly. For many, the city of St. Gallen remains the reference point — which is exactly what our calculator computes.',
    faq: {
      q: 'Where is it cheapest in the canton of St. Gallen?',
      a: 'Traditionally in tax-strong municipalities around the upper Lake Zurich and in the Rapperswil-Jona area; at the top end are peripheral municipalities with weak tax capacity. The difference can be worth several weeks of holiday — compare the capital above with the municipality of your choice.',
    },
  },
  GR: {
    intro:
      'Graubünden, the largest canton by area, has one of the most varied tax landscapes: around a hundred municipalities, from Chur to the tourism strongholds, apply very different multipliers. Overall the canton has moved, through reforms, into the cheaper half of Switzerland; some tax-strong tourism municipalities in the Engadine clearly undercut the capital. The calculation above applies to Chur — as a basis for comparison with your target municipality.',
    faq: {
      q: 'Are tourism resorts like St. Moritz expensive for tax?',
      a: 'Often the opposite: tax-strong tourism municipalities can afford low multipliers. In return, housing and living costs there are markedly higher — the overall housing + tax bill varies greatly by income.',
    },
  },
  AG: {
    intro:
      'Aargau lives, for tax, off its location between Zurich, Basel, Bern and Lucerne: a solid mid-table burden, but direct competition with four large regions — which disciplines the municipal multipliers. For commuters into the surrounding centres, the canton is among Switzerland’s most popular places to live, precisely because the combination of tax burden and housing costs often comes off better than in the central cantons themselves.',
    faq: {
      q: 'Is Aargau really cheaper than Zurich?',
      a: 'For most constellations, yes — both in the schedule and in typical municipal multipliers. The gap is smaller than to Central Switzerland, however. The concrete municipal comparison remains decisive, as both cantons spread widely internally.',
    },
  },
  TG: {
    intro:
      'Thurgau stays out of the tax headlines and does well by it: a burden in the cheaper mid-table, moderate spread between municipalities and stable multipliers over the years. For newcomers from the Zurich area or from Germany (near Konstanz), the canton on Lake Constance offers a calm, predictable tax environment — more expensive than Central Switzerland, but reliably cheaper than the central cantons.',
    faq: {
      q: 'How does Thurgau compare with Zurich and St. Gallen?',
      a: 'Against both, mostly favourably: the Thurgau schedule and typical multipliers sit below the city-of-Zurich level and slightly below St. Gallen values. The calculator above and the cantonal comparison show the difference for your income.',
    },
  },
  TI: {
    intro:
      'Ticino calculates by its own pattern: the Italian-speaking canton combines a steeply progressive schedule with comparatively high allowances at the lower end — low incomes fare well, high ones pay surcharges in the national comparison. Between Lugano, Bellinzona and the valley municipalities the municipal multipliers spread considerably. The calculation above applies to the capital, Bellinzona.',
    faq: {
      q: 'For whom is Ticino attractive for tax?',
      a: 'Rather for low to middle incomes, which benefit from the high entry allowances. For high incomes Ticino is among the more expensive cantons — those with flexibility compare with Central Switzerland or Graubünden.',
    },
  },
  VD: {
    intro:
      'Vaud is among Switzerland’s most expensive tax cantons — and one of the few with a family-quotient system: married couples and families divide their income, for determining the rate, by a divisor, which noticeably dampens the progression for families. Single people with good incomes, by contrast, carry one of the country’s highest burdens. Lausanne, as the capital, additionally sits above the cantonal average.',
    faq: {
      q: 'What does the Vaud family quotient achieve?',
      a: 'For determining the rate, income is divided by a quotient (married couples 1.8, plus supplements per child), the rate then applied to the full income. Families thus pay noticeably less than single people with the same household income — the effect is stronger than the married-couple schedule of many German-speaking cantons.',
    },
  },
  VS: {
    intro:
      'Valais taxes on two tiers, with a peculiarity that many calculators get wrong: the canton and the municipalities use separate official schedule curves — the municipal curve is flatter and caps earlier. Our calculator uses both curves exactly per FTA data. On the basis of taxable income, Valais is among the more expensive cantons; this is partly offset by generous deductions that lower the taxable income.',
    faq: {
      q: 'Why do Valais tax rates look high while the effective burden often is not?',
      a: 'Because Valais steers much through deductions: child, insurance and other deductions reduce the taxable income more strongly than in many other cantons. On the remaining taxable income, the rates are then comparatively high — and it is exactly this basis that our comparison calculates.',
    },
  },
  NE: {
    intro:
      'Neuchâtel has for years worn the label of a high-tax canton and is working against it with step-by-step rate cuts. The Jura-Arc canton still ranks in the leading group of burden for income tax — particularly for middle and high incomes. Between municipalities the differences are comparatively small, so within the canton little room for optimisation remains.',
    faq: {
      q: 'Why are taxes so high in Neuchâtel?',
      a: 'A narrow tax base, the burdens of industrial structural change and high social spending hit a small canton — keeping the schedule and multipliers high. The ongoing reforms lower the burden step by step, but the gap to the mid-table remains for now.',
    },
  },
  GE: {
    intro:
      'Geneva calculates the French way: on top of the cantonal base tax come “centimes additionnels” from the canton and the municipality — surcharges levied as a percentage of the base tax. In addition, a splitting dampens the progression for married couples. Overall, for single people with high incomes, Geneva is among the most expensive places in Switzerland; the municipal surcharges, by contrast, are moderate in the national comparison, because the canton levies the lion’s share.',
    faq: {
      q: 'What are Geneva’s “centimes additionnels”?',
      a: 'Surcharges on the cantonal base tax: the canton levies additional centimes per franc of base tax, the municipalities likewise — Cologny, for instance, far less than Avully. Our calculator reproduces this system via the official FTA multipliers.',
    },
  },
  JU: {
    intro:
      'Jura is Switzerland’s youngest canton — and one of the most expensive for income tax: high schedules and high municipal multipliers add up to a burden that only Neuchâtel regularly exceeds. A structural peculiarity: the canton runs separate schedules for single people, married couples and single parents, instead of working with a splitting. Delémont, as the capital, is representative of the cantonal level.',
    faq: {
      q: 'Are there cheap municipalities in Jura?',
      a: 'The spread exists, but the starting level is high: even cheap Jura municipalities sit above what is usual in the Plateau cantons. Anyone wanting to optimise for tax therefore compares rather with the neighbouring cantons of Bern, Solothurn or Basel-Landschaft.',
    },
  },
};
