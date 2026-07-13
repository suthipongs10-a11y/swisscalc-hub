/**
 * English editorial for /en/withholding-tax-calculator/[canton]/ — a faithful
 * English rendering of the German QST canton texts (src/lib/cantonQstContent.ts),
 * preserving each canton's real withholding profile (anti-doorway, SEO_SPEC §3.2).
 */
export interface CantonQstEditorialEn {
  intro: string;
  faq: { q: string; a: string };
}

export const CANTON_QST_CONTENT_EN: Record<string, CantonQstEditorialEn> = {
  ZH: {
    intro:
      'As Switzerland’s largest labour market and most important expat location, Zurich draws particularly many employees taxed at source. The canton calculates under the monthly model: the gross salary of each individual month is decisive. The Zurich tariffs come with and without church tax — without a denomination, choose the variant without (N).',
    faq: {
      q: 'How does the 13th month’s salary affect withholding tax in Zurich?',
      a: 'In Zurich’s monthly model the 13th month’s salary is added to the month it is paid, which raises the rate that month. Over the year this largely evens out; for an exact annual statement you can request a subsequent ordinary assessment.',
    },
  },
  BE: {
    intro:
      'Bern taxes employees at source under the monthly model and publishes the tariffs with and without church tax. As one of the eight cantons bound by the special agreement with France (tariff SF), Bern has a particular rule for certain cross-border commuters. The burden — like the ordinary income tax — sits in the more expensive range, because the withholding tariffs already include the cantonal tax.',
    faq: {
      q: 'What does the special agreement with France mean for Bernese cross-border commuters?',
      a: 'For cross-border commuters from France covered by the special agreement, withholding tax follows the SF tariff. The calculator above covers the ordinary tariffs A/B/C/H; for cross-border status the cantonal leaflets apply.',
    },
  },
  LU: {
    intro:
      'Lucerne combines a moderate tax level with the monthly model for withholding tax. As the tariffs already include cantonal and municipal tax, Lucerne’s more favourable position also shows in lower withholding rates than in the expensive central cantons. The tariffs come with and without church tax.',
    faq: {
      q: 'Is withholding tax in Lucerne lower than in Zurich or Bern?',
      a: 'Generally yes: as Lucerne is cheaper for ordinary tax and this feeds into the tariff, Lucerne withholding rates are, at a comparable salary, usually lower than in the city of Zurich or the canton of Bern.',
    },
  },
  UR: {
    intro:
      'Uri is among the most tax-favourable cantons — and this shows in withholding tax too, which already includes cantonal and municipal tax. The canton calculates under the monthly model and publishes the tariffs with and without church tax. For people resident in the canton, withholding tax is therefore comparatively moderate.',
    faq: {
      q: 'Do people taxed at source in Uri benefit from the low tax level?',
      a: 'Yes. As the cantonal and municipal tax is included in the tariff, Uri’s low tax level feeds straight into the monthly deduction — at the same gross salary the burden is lower than in most other cantons.',
    },
  },
  SZ: {
    intro:
      'Schwyz is among the cheapest tax cantons and a popular residence for well-earning newcomers from the Zurich area. For withholding tax the monthly model applies; the tariffs include cantonal and municipal tax and come with and without church tax. Schwyz withholding rates are accordingly among the lowest in Switzerland.',
    faq: {
      q: 'Why is withholding tax so low in Schwyz?',
      a: 'The tariff reflects the whole income-tax burden — canton, municipality and Confederation. As Schwyz is very cheap for ordinary tax, withholding rates are, at a comparable salary, markedly lower than in Geneva or Bern, for example.',
    },
  },
  OW: {
    intro:
      'Obwalden taxes income at a single flat rate — this favourable structure feeds, via the ordinary tax, into the withholding tariffs. The canton calculates under the monthly model and publishes the tariffs with and without church tax. The withholding burden is therefore low and comparatively even across incomes.',
    faq: {
      q: 'Does Obwalden’s flat schedule affect withholding tax?',
      a: 'Indirectly yes: as the flat-rate cantonal schedule is low and flat and feeds into the withholding tariff, withholding tax in Obwalden rises less steeply with the salary than in strongly progressive cantons.',
    },
  },
  NW: {
    intro:
      'Nidwalden combines Central Swiss low-tax policy with proximity to Lucerne, making it an attractive canton of residence for specialists and managers. For withholding tax the monthly model applies, the tariffs come with and without church tax. Like the ordinary tax, withholding tax here is low.',
    faq: {
      q: 'Is Nidwalden worthwhile as a residence for specialists taxed at source?',
      a: 'For tax, yes: Nidwalden’s low income tax is included in the tariff, so the monthly deduction is, at the same salary, lower than in most cantons — at a short distance from the Lucerne economic area.',
    },
  },
  GL: {
    intro:
      'Glarus calculates withholding tax under the monthly model and offers the tariffs with and without church tax. The canton sits in the upper mid-table for tax level, which translates into moderate rates. For residents of the Glarus region and commuters, the monthly deduction is thus well predictable.',
    faq: {
      q: 'Under which model is withholding tax calculated in the canton of Glarus?',
      a: 'Under the monthly model: the gross salary of the month is decisive. The tariff includes cantonal, municipal and federal tax; Glarus publishes both the variant with and without church tax.',
    },
  },
  ZG: {
    intro:
      'Zug is Switzerland’s most tax-favourable canton and home to numerous international companies — hence a high share of specialists taxed at source. The canton calculates under the monthly model, the tariffs come with and without church tax. Zug withholding rates are among the lowest in the country, because the favourable cantonal schedule feeds into the withholding tariff.',
    faq: {
      q: 'Why do international firms move to Zug over withholding tax?',
      a: 'It is not withholding tax itself but the generally low tax level that is the reason — and because this feeds into the tariff, employees taxed at source benefit too: at the same gross salary the monthly deduction in Zug is lower than almost anywhere else.',
    },
  },
  FR: {
    intro:
      'The bilingual canton of Fribourg calculates withholding tax — unlike most German-speaking cantons — under the annual model: the rate is based on the projected annual income, which smooths a 13th month and bonuses over the year. The tariffs come with and without church tax. Fribourg thus combines a French-speaking calculation model with German-speaking administrative practice.',
    faq: {
      q: 'What does the annual model mean for withholding tax in Fribourg?',
      a: 'In the annual model the expected annual income is used to set the rate. Irregular salaries, a 13th month or bonuses therefore do not cause rate jumps in individual months as in the monthly model — the burden is spread more evenly.',
    },
  },
  SO: {
    intro:
      'Solothurn taxes employees at source under the monthly model and publishes the tariffs with and without church tax. As one of the eight cantons bound by the special agreement with France (tariff SF), a particular rule applies to certain cross-border commuters. For commuters towards the Basel and Bern areas, Solothurn is a middle way for tax — this shows in withholding tax too.',
    faq: {
      q: 'Does a special tariff apply to cross-border commuters in the canton of Solothurn?',
      a: 'For cross-border commuters from France under the special agreement the SF tariff applies. For all other employees taxed at source, the ordinary tariffs A/B/C/H apply, which the calculator above reproduces.',
    },
  },
  BS: {
    intro:
      'With its pharma and life-sciences industry, Basel-Stadt is an international labour market with a high share of specialists taxed at source, many of them cross-border commuters from Germany and France. The canton calculates under the monthly model and is one of the eight cantons bound by the special agreement with France (tariff SF). The tariffs come with and without church tax.',
    faq: {
      q: 'How are cross-border commuters to Basel-Stadt treated for withholding tax?',
      a: 'For commuters from Germany the cross-border tariffs apply, for those from France the special agreement (tariff SF). Anyone living and working in the canton is taxed under the ordinary tariffs A/B/C/H — exactly what the tool above calculates.',
    },
  },
  BL: {
    intro:
      'Basel-Landschaft shares the tri-national labour market of the Basel region and has many cross-border commuters. The canton calculates withholding tax under the monthly model, publishes the tariffs with and without church tax, and is one of the eight cantons bound by the special agreement with France (tariff SF). For newcomers from nearby abroad, the monthly deduction is thus clearly regulated.',
    faq: {
      q: 'Does withholding tax in Basel-Landschaft differ from Basel-Stadt?',
      a: 'The calculation model (monthly) and the basic structure are the same, but the rates differ because Basel-Landschaft has its own cantonal tariffs. The calculator above uses the Basel-Landschaft tariffs; for the city, choose the canton of Basel-Stadt.',
    },
  },
  SH: {
    intro:
      'Schaffhausen actively uses its border location with Germany and employs many cross-border commuters. For withholding tax the monthly model applies, the tariffs come with and without church tax. Schaffhausen’s moderate tax level — clearly below the city of Zurich — is reflected in comparatively favourable rates.',
    faq: {
      q: 'Is withholding tax in Schaffhausen relevant for cross-border commuters?',
      a: 'Cross-border commuters from Germany are treated under the cross-border tariffs. For people taxed at source resident in the canton, the ordinary tariffs A/B/C/H apply — here Schaffhausen’s moderate tax level works favourably on the deduction.',
    },
  },
  AR: {
    intro:
      'Appenzell Ausserrhoden taxes employees at source under the monthly model and publishes the tariffs with and without church tax. As a favourable Eastern Swiss canton of residence — a notch below St. Gallen — Ausserrhoden offers a moderate deduction to commuters into the St. Gallen area.',
    faq: {
      q: 'For whom is withholding tax in Appenzell Ausserrhoden relevant?',
      a: 'For foreign employees without a C settlement permit resident in the canton. As Ausserrhoden taxes more cheaply than St. Gallen and this is included in the tariff, the monthly deduction is moderate.',
    },
  },
  AI: {
    intro:
      'Appenzell Innerrhoden is Switzerland’s smallest and one of its most tax-favourable cantons. For withholding tax the monthly model applies, the tariffs come with and without church tax. As the low cantonal schedule feeds into the withholding tariff, withholding tax here is among the lowest in the country.',
    faq: {
      q: 'How low is withholding tax in Appenzell Innerrhoden?',
      a: 'Very low by comparison: as Innerrhoden is among the cheapest cantons for ordinary income tax and this feeds into the tariff, the monthly deduction is, at the same salary, noticeably lower than in the central cantons.',
    },
  },
  SG: {
    intro:
      'St. Gallen, the Eastern Swiss central canton, has a broad labour market and therefore a notable share of people taxed at source. The canton calculates under the monthly model and publishes the tariffs with and without church tax. The tax level sits mid-table — above the two Appenzells, but below French-speaking values.',
    faq: {
      q: 'Under which model does St. Gallen calculate withholding tax?',
      a: 'Under the monthly model: the monthly gross salary is decisive. The tariff includes cantonal, municipal and federal tax and comes with and without church tax.',
    },
  },
  GR: {
    intro:
      'Graubünden employs many seasonal and cross-border workers in tourism and construction — also from Italy. The canton calculates withholding tax under the monthly model and is one of only three cantons (with Ticino and Valais) with special tariffs for cross-border commuters from Italy. The ordinary tariffs come with and without church tax.',
    faq: {
      q: 'Are there special tariffs in Graubünden for cross-border commuters from Italy?',
      a: 'Yes. Graubünden publishes — like Ticino and Valais — additional tariff codes for cross-border commuters from Italy taxed under the CH-IT cross-border agreement. The calculator above covers the ordinary tariffs A/B/C/H.',
    },
  },
  AG: {
    intro:
      'Aargau lies between Zurich, Basel, Bern and Lucerne and is a popular canton of residence and commuting. For withholding tax the monthly model applies, the tariffs come with and without church tax. Aargau’s solid mid-table tax level translates into moderate, well-predictable rates.',
    faq: {
      q: 'Is withholding tax in Aargau cheaper than in the neighbouring cantons?',
      a: 'Against the central cantons — the city of Zurich or Basel-Stadt — generally yes; against Central Switzerland, no. As the tariff includes the cantonal tax, the Aargau burden sits in the same mid-table as the ordinary tax.',
    },
  },
  TG: {
    intro:
      'Thurgau on Lake Constance attracts newcomers from the Zurich area and from Germany and employs cross-border commuters. For withholding tax the monthly model applies, the tariffs come with and without church tax. The favourable mid-table tax level ensures comparatively moderate rates.',
    faq: {
      q: 'How is withholding tax handled in Thurgau for newcomers from Germany?',
      a: 'Anyone living in Thurgau and taxed at source falls under the ordinary tariffs A/B/C/H. Cross-border commuters from Germany fall under the cross-border tariffs. The moderate Thurgau tax level works favourably on the deduction.',
    },
  },
  TI: {
    intro:
      'Ticino is the Italian-speaking canton with a very high share of cross-border commuters from Italy. Withholding tax is calculated under the annual model, and Ticino publishes — like Graubünden and Valais — special tariffs for Italian cross-border commuters. Church tax is not levied at source; the tariff has no denominational variant.',
    faq: {
      q: 'Why is withholding tax in Ticino especially important for cross-border commuters?',
      a: 'Because Ticino has one of the largest shares of cross-border commuters in Switzerland. For commuters from Italy, special tariffs apply under the CH-IT cross-border agreement; anyone resident in the canton is taxed under the ordinary tariffs A/B/C/H, under the annual model.',
    },
  },
  VD: {
    intro:
      'The canton of Vaud, with the centre of Lausanne, has many people taxed at source and cross-border commuters from France. The canton calculates under the annual model and is one of the eight cantons bound by the special agreement with France (tariff SF). Church tax is not levied at source — the tariff has no denominational variant.',
    faq: {
      q: 'Under which model does Vaud calculate withholding tax?',
      a: 'Under the annual model: the rate is based on the projected annual income, which smooths irregular salaries and a 13th month. Church tax is not included in the Vaud withholding tariff.',
    },
  },
  VS: {
    intro:
      'Valais, a tourism and border canton, combines several peculiarities: it calculates under the annual model, publishes special tariffs for cross-border commuters from Italy, and is at the same time one of the cantons bound by the special agreement with France (tariff SF). Church tax is not levied at source.',
    faq: {
      q: 'Why is withholding tax in Valais especially many-layered?',
      a: 'Because Valais lies on two language and national borders: it has both cross-border tariffs for Italy and the special agreement with France. Anyone resident in the canton is taxed under the ordinary tariffs A/B/C/H, under the annual model; the calculator above reproduces these.',
    },
  },
  NE: {
    intro:
      'Neuchâtel in the Jura Arc is among the high-tax cantons — which, via the ordinary tax, feeds into withholding tax too. The canton calculates under the monthly model and is one of the eight cantons bound by the special agreement with France (tariff SF). Church tax is not levied at source.',
    faq: {
      q: 'Is withholding tax in Neuchâtel above the Swiss average?',
      a: 'Tending to yes: as Neuchâtel is among the more expensive cantons for ordinary income tax and this is included in the tariff, the monthly deduction is, at a comparable salary, higher than in favourable cantons.',
    },
  },
  GE: {
    intro:
      'Geneva has one of the highest shares of people taxed at source in Switzerland — international organisations, a large cross-border share and a high proportion of foreign residents shape the labour market. The canton calculates under the annual model, which smooths irregular salaries. Church tax is not levied at source; the tariff has no denominational variant.',
    faq: {
      q: 'Why does Geneva calculate withholding tax under the annual model?',
      a: 'The annual model (usual in French-speaking Switzerland) bases the rate on the projected annual income. With the many international jobs with bonuses and variable salaries, this avoids rate jumps in individual months.',
    },
  },
  JU: {
    intro:
      'Jura is the only canton whose withholding tariff is published exclusively with church tax — a denomination-free variant without church tax does not exist in the tariff. The canton calculates under the monthly model and is one of the eight cantons bound by the special agreement with France (tariff SF). The tax level, as for the ordinary tax, is in the upper range.',
    faq: {
      q: 'Why does Jura have no withholding tariff without church tax?',
      a: 'The canton of Jura publishes the tariffs only in the variant with church tax (Y). The calculator above therefore uses this tariff automatically for Jura; the church tax is already included in the rate shown.',
    },
  },
};
