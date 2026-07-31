/**
 * English counterpart of cantonQstPractice.ts — the practical editorial layer
 * for /en/withholding-tax-calculator/[canton]/ (M16). Same canton-specific
 * substance, written for the expat audience.
 */
import type { CantonQstPractice } from './cantonQstPractice';

export const CANTON_QST_PRACTICE_EN: Record<string, CantonQstPractice> = {
  ZH: {
    practice:
      'Zurich handles more withholding-tax relationships than any other canton — from the financial centre and the universities to the industry along the Limmat and Glatt valleys. The distinction between canton of work and canton of residence matters here: someone working in the city of Zurich but living in Schwyz or Aargau is taxed under the tariff of their canton of residence.',
    faq: {
      q: 'I work in Zurich but live in another canton — which tariff applies?',
      a: 'As a rule, the tariff of your canton of residence. Your employer remits the withholding tax to the canton where you live; the Zurich tariffs apply only if you are also resident in the canton. If your residence is abroad (cross-border commuters, weekly residents), the canton of work is competent instead.',
    },
  },
  BE: {
    practice:
      'Bern is a large canton with well over three hundred municipalities — but that is irrelevant for withholding tax: the tariff is uniform across the canton and includes a flat-rate municipal component. Someone taxed at source pays the same rate in the city of Bern as in the Oberland, even though the ordinary tax multipliers differ considerably. Moving within the canton therefore changes nothing in the monthly deduction.',
    faq: {
      q: 'Does my withholding tax change if I move within the canton of Bern?',
      a: 'No. The tariff applies to the whole canton and contains a flat municipal component. Only in a subsequent ordinary assessment does your municipality\'s actual multiplier become relevant — a refund or an additional payment may then follow depending on where you live.',
    },
  },
  LU: {
    practice:
      'In Lucerne, tourism, hospitality and healthcare account for a large share of jobs taxed at source — frequently on an L short-stay permit or a fixed-term contract. If you start mid-year, the employer withholds tax from the first salary onwards, so the annual total can diverge from a full-year view. Anyone employed for only a few months should therefore look into a tariff correction.',
    faq: {
      q: 'I only worked part of the year in Lucerne — is my deduction correct?',
      a: 'Under the monthly model, each month is taxed separately on that month\'s salary, regardless of how many months you worked in total. With part-year employment this often produces an excessive deduction. A tariff correction or a subsequent ordinary assessment evens it out.',
    },
  },
  UR: {
    practice:
      'Uri is a small labour market with few large employers — transport along the Gotthard axis, construction and industry dominate the jobs taxed at source. Because many people commute to neighbouring cantons, residence is decisive here too: anyone living in Uri and working in Zug or Lucerne benefits from the favourable Uri tariff.',
    faq: {
      q: 'Is it worth living in Uri while working in a neighbouring canton?',
      a: 'From a tax perspective yes, provided you genuinely establish residence there: the tariff of the canton of residence applies, and Uri sits well below the central cantons. The residence has to be real, though — a secondary address is not enough.',
    },
  },
  SZ: {
    practice:
      'Schwyz lives to a considerable extent on people moving out from the Zurich economic area: many work by the lake or in the city and live in Wollerau, Freienbach or Küssnacht. That is decisive for withholding tax, because the canton of residence governs. Differences between districts, however, do not show up in the withholding tariff — that one is uniform across the canton.',
    faq: {
      q: 'Do the low-tax Schwyz municipalities have their own withholding tariff?',
      a: 'No. The withholding tariff is uniform across the canton of Schwyz and contains a flat municipal component. The large differences between municipal multipliers only take effect in an ordinary assessment — for instance from a gross annual salary of CHF 120,000.',
    },
  },
  OW: {
    practice:
      'Obwalden is small but economically varied: alongside industry in Alpnach and Sarnen, tourism around Engelberg generates seasonal jobs on short-stay permits. The flat cantonal tariff makes the monthly deduction unusually predictable across salary levels — an advantage for seasonal roles where pay swings between high and low season.',
    faq: {
      q: 'What does the Obwalden flat tariff mean for fluctuating seasonal pay?',
      a: 'Because the cantonal share is proportional rather than steeply progressive, the overall rate rises less sharply in a strong season month than in progressive cantons. The federal share remains progressive, though, so the rate still increases with the salary.',
    },
  },
  NW: {
    practice:
      'Nidwalden combines a specialised labour market — aviation and precision engineering around Stans — with short distances to Lucerne. Those taxed at source here are often B-permit specialists whose annual salary sits close to the threshold for a subsequent ordinary assessment. Above that threshold you file a tax return, and the withholding tax already paid is credited against the final tax.',
    faq: {
      q: 'What happens if my salary in Nidwalden exceeds CHF 120,000?',
      a: 'You are then assessed ordinarily after the fact: you receive a tax return, can claim all your deductions, and the withholding tax already paid is credited against the definitive tax. The monthly deduction continues — it simply becomes an advance payment.',
    },
  },
  GL: {
    practice:
      'Since its municipal merger, the canton of Glarus consists of just three municipalities — one of the simplest administrative set-ups in Switzerland. Jobs taxed at source concentrate on industry in the lower valley and on tourism in the Sernftal and Braunwald. For newcomers, competence is therefore easy to establish: one cantonal tax administration, one tariff.',
    faq: {
      q: 'Where do I file a tariff-correction request in the canton of Glarus?',
      a: 'With the cantonal tax administration in Glarus, not with your municipality — withholding tax is assessed at cantonal level. The deadline for both a tariff correction and a subsequent ordinary assessment runs to 31 March of the following year.',
    },
  },
  ZG: {
    practice:
      'Zug employs an unusually high share of internationally recruited specialists — commodity trading, pharma and technology shape the labour market. Annual salaries therefore frequently exceed the threshold for a subsequent ordinary assessment, so withholding tax effectively becomes an advance payment. With bonuses, the payout month deserves attention, because the rate rises there under the monthly model.',
    faq: {
      q: 'How does a bonus affect withholding tax in Zug?',
      a: 'Under the monthly model the bonus is attributed to the month it is paid, which can push the rate up markedly that month. It partly evens out over the year. Anyone assessed ordinarily receives an annual reckoning anyway — the monthly effect is then only a cash-flow matter.',
    },
  },
  FR: {
    practice:
      'Fribourg is bilingual, and that shapes withholding-tax practice too: forms and guidance appear in French and German, with the cantonal tax administration competent in both cases. The university and colleges also generate many fixed-term appointments. Because Fribourg uses the annual model, starting a job mid-year is treated differently than in monthly-model cantons.',
    faq: {
      q: 'I am starting work in Fribourg mid-year — how is the rate determined?',
      a: 'Under the annual model the salary is extrapolated to a full year to set the rate. The rate therefore follows the annualised income rather than the sum of the monthly salaries you actually received — which can produce a different result from the monthly model.',
    },
  },
  SO: {
    practice:
      'Solothurn lies in the catchment of several economic areas at once: Basel to the north, Bern and Biel to the west, Olten as a rail hub in the middle. Many people taxed at source therefore commute across the cantonal border — yet the Solothurn tariff applies as soon as residence is in the canton.',
    faq: {
      q: 'I live in Solothurn and work in Basel — which tariff applies?',
      a: 'The Solothurn tariff, because the canton of residence governs withholding tax. Your Basel employer withholds the tax and remits it to the canton of Solothurn. Only residence abroad would make the canton of work competent.',
    },
  },
  BS: {
    practice:
      'Basel-Stadt has arguably the most international labour market in Switzerland — the life-sciences sector recruits worldwide. Alongside cross-border commuters, weekly residents play a large role here: people who stay in Basel during the week and return to their main residence at weekends. Special competence rules apply depending on the constellation.',
    faq: {
      q: 'I am a weekly resident in Basel — where am I taxed?',
      a: 'That depends on where your tax residence lies: if your centre of life is abroad, tax is withheld at the place of work in Basel-Stadt; if that centre is in another canton, that canton\'s tariff applies. The delimitation is case-specific — the cantonal tax administration gives binding information.',
    },
  },
  BL: {
    practice:
      'Basel-Landschaft is primarily a residential canton for the Basel economic area: a large share of its residents taxed at source work in the city or just across the border. Residence in the canton is what counts for the deduction, wherever the workplace is. Report any move to your employer immediately so the tariff switches.',
    faq: {
      q: 'I am moving from Basel-Stadt to Basel-Landschaft — what do I need to report?',
      a: 'Report the move to your employer at once, because it is the employer who withholds the tax and must apply the Basel-Landschaft tariff from the following month. A late report means too much or too little is deducted — correctable through a tariff correction until 31 March of the following year.',
    },
  },
  SH: {
    practice:
      'Schaffhausen lies almost entirely north of the Rhine and is surrounded by Germany on three sides — no other canton is so closely interwoven with the neighbouring border region. Industry and logistics employ many cross-border commuters, while residents of the canton are taxed under the ordinary tariffs. Short travel times to Zurich also make Schaffhausen attractive to commuters.',
    faq: {
      q: 'What is the difference between a cross-border commuter and a newcomer in Schaffhausen?',
      a: 'A cross-border commuter keeps their residence in Germany and travels to work — the commuter rules of the double-taxation treaty apply to them. Anyone who moves their residence to Switzerland is instead taxed under the ordinary A/B/C/H tariffs shown by the calculator above.',
    },
  },
  AR: {
    practice:
      'Appenzell Ausserrhoden is a classic residential canton: many people commute to St. Gallen, the Rhine valley or Herisau. Because residence governs withholding tax, they benefit from the Ausserrhoden tariff even though their workplace lies elsewhere. In healthcare and social services — among the canton\'s largest employment sectors — part-time roles are common, which lowers the monthly salary and hence the rate.',
    faq: {
      q: 'How does part-time work affect withholding tax in Ausserrhoden?',
      a: 'The rate follows the salary actually paid out each month, not the full-time equivalent — a lower workload therefore means a lower rate. With several part-time jobs at once, special rules apply: total income is then taken into account to set the rate.',
    },
  },
  AI: {
    practice:
      'Appenzell Innerrhoden is Switzerland\'s least populous canton and its labour market is correspondingly small — trades, tourism and agriculture dominate. Withholding-tax relationships are therefore rarer than elsewhere, but the process is unusually direct: a single cantonal tax administration handles corrections and enquiries.',
    faq: {
      q: 'Does the Innerrhoden tariff also apply if I work outside the canton?',
      a: 'Yes, as long as your residence is in Appenzell Innerrhoden. The employer — including one based in another canton — must withhold according to your canton of residence and remit the tax there.',
    },
  },
  SG: {
    practice:
      'St. Gallen borders Liechtenstein and Austria, which strongly shapes the Rhine valley labour market: many residents work in Liechtenstein, and conversely many people commute in from Vorarlberg. These constellations fall under the respective double-taxation treaties. Anyone living and working in the canton is taxed under the ordinary tariffs shown above.',
    faq: {
      q: 'I live in St. Gallen and work in Liechtenstein — does Swiss withholding tax apply?',
      a: 'Not in this form. Employment in Liechtenstein falls under the CH–FL double-taxation treaty with its own allocation rules; the income is generally captured at your Swiss residence. The calculator above covers the cantonal withholding tariffs for employment in Switzerland.',
    },
  },
  GR: {
    practice:
      'Few cantons are as seasonal as Graubünden: hotels, restaurants and mountain railways create thousands of fixed-term jobs every winter, often on an L short-stay permit. For withholding tax that means high monthly salaries during a few season months and nothing in between. Because the rate is set month by month, the in-season deduction is often higher than the annual income would warrant.',
    faq: {
      q: 'I only work one winter season in Graubünden — am I paying too much?',
      a: 'Often yes. The monthly rate follows the season salary as though you earned that all year. A tariff-correction request or a subsequent ordinary assessment, filed by 31 March of the following year, brings the burden back to your actual annual income.',
    },
  },
  AG: {
    practice:
      'Aargau is the classic commuter canton of German-speaking Switzerland: from Baden, Aarau or Rheinfelden, Zurich, Basel and Bern are all quickly reachable. A large share of its residents taxed at source work outside the canton — the Aargau tariff nonetheless applies. Industry in the Fricktal and along the Limmat also employs many B-permit specialists.',
    faq: {
      q: 'Does my out-of-canton employer have to apply the Aargau tariff?',
      a: 'Yes. Your canton of residence governs withholding tax; the employer must apply that canton\'s tariff and remit the tax there, wherever the company is based. So report every change of address to them without delay.',
    },
  },
  TG: {
    practice:
      'Thurgau stretches from Lake Constance into the hinterland and is at once a residential canton for the Zurich area and a border region with Germany — in Kreuzlingen the frontier runs right through the built-up area of Konstanz. Both B-permit newcomers and people who have moved their residence from Germany to Switzerland are taxed at source here.',
    faq: {
      q: 'I moved from Konstanz to Kreuzlingen — does my taxation change?',
      a: 'Yes, fundamentally. Moving your residence to Switzerland ends cross-border commuter status; you are now taxed under the ordinary Thurgau A/B/C/H tariffs. Your employer needs your new address and permit type to apply them.',
    },
  },
  TI: {
    practice:
      'Ticino has more cross-border commuters than any other canton — entire sectors in the Sottoceneri are built around it. Residents of the canton are subject to the ordinary regime under the annual model. The cantonal administration publishes guidance and forms in Italian; deadlines and legal remedies, however, follow the uniform Swiss rules.',
    faq: {
      q: 'By when can I request a tariff correction in Ticino?',
      a: 'By 31 March of the following year — this deadline applies Switzerland-wide and therefore in Ticino too. It is a forfeiture deadline: once it passes, correcting the withholding tax for that year is generally no longer possible.',
    },
  },
  VD: {
    practice:
      'With Lausanne, the EPFL and the Lake Geneva arc, Vaud combines an internationally oriented labour market: research, universities and multinationals recruit abroad continuously. Many of these positions exceed the threshold for a subsequent ordinary assessment, so withholding tax becomes a monthly advance payment. The annual model also keeps the rate stable from month to month.',
    faq: {
      q: 'Can I claim deductions such as pillar 3a in Vaud?',
      a: 'Not in the tariff itself, which contains only flat-rate deductions. Actual deductions — pillar 3a contributions, further-training costs, childcare — are claimed through a tariff-correction request or a subsequent ordinary assessment, by 31 March of the following year.',
    },
  },
  VS: {
    practice:
      'Valais is bilingual and strongly seasonal: in both the Upper and Lower Valais, hotels and mountain railways create numerous temporary winter and summer positions. Because the canton uses the annual model, seasonal pay is extrapolated to a full year to set the rate — the effect therefore differs noticeably from seasonal monthly-model cantons such as Graubünden.',
    faq: {
      q: 'How is seasonal pay treated under the Valais annual model?',
      a: 'The salary is extrapolated to a full year to determine the rate, which is then applied to the pay actually received. This smooths the burden compared with a purely monthly view, but does not replace a tariff correction where actual deductions need to be claimed.',
    },
  },
  NE: {
    practice:
      'Neuchâtel lives from a strongly export-oriented precision and watchmaking industry that recruits qualified specialists from neighbouring France along the Jura arc. Residents of the canton fall under the ordinary regime with the monthly model. Given the comparatively high tax level, it is particularly worth checking whether actual deductions beat the flat rates built into the tariff.',
    faq: {
      q: 'Is a subsequent ordinary assessment worthwhile in Neuchâtel?',
      a: 'Often yes, if you have substantial actual deductions — pillar 3a, further training, childcare or maintenance payments. Because the Neuchâtel tariff reflects a high tax level, each additional deduction weighs correspondingly more in francs. The request must be filed by 31 March of the following year.',
    },
  },
  GE: {
    practice:
      'Geneva hosts numerous international organisations and diplomatic missions — their staff are often wholly or partly exempt from Swiss income tax under headquarters agreements and are therefore not subject to withholding tax. For all other foreign employees without a C settlement permit, the ordinary tariffs under the annual model apply, as reproduced above.',
    faq: {
      q: 'Do staff of international organisations pay withholding tax in Geneva?',
      a: 'As a rule no: headquarters agreements between Switzerland and those organisations grant their personnel particular tax privileges. Your individual status is decisive — the organisation itself and the cantonal tax administration provide information. For all other employment the ordinary tariff applies.',
    },
  },
  JU: {
    practice:
      'Jura is Switzerland\'s youngest canton and is economically closely tied to neighbouring France and the Bernese Jura; precision engineering and supplier firms shape the labour market. In withholding tax the canton stands out because its tariff exists only in the variant that includes church tax — the tariff itself offers no choice.',
    faq: {
      q: 'Can I be exempted from church tax in the Jura tariff?',
      a: 'Not within the tariff itself — Jura publishes only the variant including church tax. Anyone not belonging to a recognised church can request the correction through a tariff correction or a subsequent ordinary assessment, by 31 March of the following year.',
    },
  },
};
