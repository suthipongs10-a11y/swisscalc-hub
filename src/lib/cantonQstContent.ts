/**
 * Canton-specific editorial for the /quellensteuer-rechner/[kanton]/ pages
 * (SEO_SPEC §3.2 anti-doorway: every intro is individually written around that
 * canton's real withholding-tax profile — calculation model (monthly/annual),
 * whether church tax is levied at source, cross-border tariffs and the canton's
 * tax level). Quantitative blocks are computed by the page from the tariff data.
 */
export interface CantonQstEditorial {
  intro: string;
  faq: { q: string; a: string };
}

export const CANTON_QST_CONTENT: Record<string, CantonQstEditorial> = {
  ZH: {
    intro:
      'Als grösster Arbeitsmarkt und wichtigster Expat-Standort der Schweiz zieht Zürich besonders viele quellensteuerpflichtige Arbeitnehmende an. Der Kanton rechnet nach dem Monatsmodell: Massgebend ist der Bruttolohn jedes einzelnen Monats. Die Zürcher Tarife gibt es mit und ohne Kirchensteuer — als konfessionslose Person wählen Sie die Variante ohne (N).',
    faq: {
      q: 'Wie wirkt sich der 13. Monatslohn auf die Quellensteuer in Zürich aus?',
      a: 'Im Zürcher Monatsmodell wird der 13. Monatslohn dem Auszahlungsmonat zugeschlagen, wodurch der Satz in diesem Monat steigt. Über das Jahr gleicht sich das weitgehend aus; wer eine exakte Jahresrechnung möchte, kann eine nachträgliche ordentliche Veranlagung verlangen.',
    },
  },
  BE: {
    intro:
      'Bern besteuert quellensteuerpflichtige Arbeitnehmende nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Als einer der acht Kantone mit Sondervereinbarung mit Frankreich (Tarif SF) kennt Bern eine besondere Regelung für gewisse Grenzgänger. Die Belastung liegt — wie die ordentliche Einkommenssteuer — im teureren Bereich, da die Quellensteuertarife die kantonale Steuer bereits enthalten.',
    faq: {
      q: 'Was bedeutet die Sondervereinbarung mit Frankreich für Berner Grenzgänger?',
      a: 'Für Grenzgänger aus Frankreich, die unter die Sondervereinbarung fallen, wird die Quellensteuer nach dem Tarif SF geregelt. Der Rechner oben deckt die ordentlichen Tarife A/B/C/H ab; bei Grenzgängerstatus gelten die kantonalen Merkblätter.',
    },
  },
  LU: {
    intro:
      'Luzern verbindet ein moderates Steuerniveau mit dem Monatsmodell bei der Quellensteuer. Weil die Quellensteuertarife die Kantons- und Gemeindesteuer bereits einschliessen, schlägt sich die günstigere Position Luzerns auch in tieferen Quellensteuersätzen nieder als in den teuren Zentrumskantonen. Die Tarife bestehen mit und ohne Kirchensteuer.',
    faq: {
      q: 'Ist die Quellensteuer in Luzern tiefer als in Zürich oder Bern?',
      a: 'In der Tendenz ja: Da Luzern bei der ordentlichen Einkommenssteuer günstiger liegt und diese in den Quellensteuertarif einfliesst, sind die Luzerner Quellensteuersätze bei vergleichbarem Lohn meist tiefer als in Zürich-Stadt oder im Kanton Bern.',
    },
  },
  UR: {
    intro:
      'Uri gehört zu den steuergünstigsten Kantonen — und das zeigt sich auch bei der Quellensteuer, die Kantons- und Gemeindesteuer bereits enthält. Der Kanton rechnet nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Für Arbeitnehmende mit Wohnsitz im Kanton fällt die Quellensteuer damit vergleichsweise moderat aus.',
    faq: {
      q: 'Profitieren Quellensteuerpflichtige in Uri vom tiefen Steuerniveau?',
      a: 'Ja. Weil die kantonale und kommunale Steuer im Quellensteuertarif enthalten ist, wirkt sich das tiefe Urner Steuerniveau direkt auf den monatlichen Abzug aus — bei gleichem Bruttolohn ist die Belastung tiefer als in den meisten anderen Kantonen.',
    },
  },
  SZ: {
    intro:
      'Schwyz zählt zu den günstigsten Steuerkantonen und ist ein beliebter Wohnsitz für gut verdienende Zuzüger aus dem Raum Zürich. Bei der Quellensteuer gilt das Monatsmodell; die Tarife enthalten Kantons- und Gemeindesteuer und bestehen mit und ohne Kirchensteuer. Entsprechend gehören die Schwyzer Quellensteuersätze zu den tiefsten der Schweiz.',
    faq: {
      q: 'Warum ist die Quellensteuer in Schwyz so tief?',
      a: 'Der Quellensteuertarif bildet die gesamte Einkommenssteuerbelastung ab — Kanton, Gemeinde und Bund. Da Schwyz bei der ordentlichen Steuer sehr günstig ist, sind auch die Quellensteuersätze bei vergleichbarem Lohn deutlich tiefer als etwa in Genf oder Bern.',
    },
  },
  OW: {
    intro:
      'Obwalden besteuert Einkommen mit einem einheitlichen Flat-Rate-Satz — diese günstige Struktur fliesst über die ordentliche Steuer auch in die Quellensteuertarife ein. Der Kanton rechnet nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Die Quellensteuerbelastung ist damit tief und über die Einkommen hinweg vergleichsweise gleichmässig.',
    faq: {
      q: 'Wirkt sich der Obwaldner Flat-Tarif auf die Quellensteuer aus?',
      a: 'Indirekt ja: Da der Flat-Rate-Kantonstarif tief und flach ist und in den Quellensteuertarif einfliesst, steigt die Quellensteuer in Obwalden mit dem Lohn weniger stark an als in stark progressiven Kantonen.',
    },
  },
  NW: {
    intro:
      'Nidwalden verbindet Innerschweizer Tiefsteuerpolitik mit der Nähe zu Luzern und ist ein attraktiver Wohnkanton für Fach- und Führungskräfte. Bei der Quellensteuer gilt das Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Wie die ordentliche Steuer fällt auch die Quellensteuer in Nidwalden tief aus.',
    faq: {
      q: 'Lohnt sich Nidwalden als Wohnsitz für quellensteuerpflichtige Fachkräfte?',
      a: 'Steuerlich ja: Die tiefe Nidwaldner Einkommenssteuer ist im Quellensteuertarif enthalten, sodass der monatliche Abzug bei gleichem Lohn geringer ausfällt als in den meisten Kantonen — bei kurzer Distanz zum Wirtschaftsraum Luzern.',
    },
  },
  GL: {
    intro:
      'Glarus rechnet die Quellensteuer nach dem Monatsmodell und bietet die Tarife mit und ohne Kirchensteuer an. Der Kanton liegt beim Steuerniveau im vorderen Mittelfeld, was sich in moderaten Quellensteuersätzen niederschlägt. Für Arbeitnehmende im Glarnerland und Pendler ist der monatliche Abzug damit gut kalkulierbar.',
    faq: {
      q: 'Nach welchem Modell wird die Quellensteuer im Kanton Glarus berechnet?',
      a: 'Nach dem Monatsmodell: Massgebend ist der Bruttolohn des einzelnen Monats. Der Tarif enthält Kantons-, Gemeinde- und Bundessteuer; Glarus führt sowohl die Variante mit als auch ohne Kirchensteuer.',
    },
  },
  ZG: {
    intro:
      'Zug ist der steuergünstigste Kanton der Schweiz und Sitz zahlreicher internationaler Unternehmen — entsprechend hoch ist der Anteil quellensteuerpflichtiger Fachkräfte. Der Kanton rechnet nach dem Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Die Zuger Quellensteuersätze gehören zu den tiefsten des Landes, weil der günstige Kantonstarif im Quellensteuertarif enthalten ist.',
    faq: {
      q: 'Warum ziehen internationale Firmen wegen der Quellensteuer nach Zug?',
      a: 'Nicht die Quellensteuer selbst, sondern das allgemein tiefe Steuerniveau ist der Grund — und weil dieses in den Quellensteuertarif einfliesst, profitieren auch quellensteuerpflichtige Angestellte: Bei gleichem Bruttolohn ist der monatliche Abzug in Zug tiefer als fast überall sonst.',
    },
  },
  FR: {
    intro:
      'Der zweisprachige Kanton Freiburg rechnet die Quellensteuer — anders als die meisten Deutschschweizer Kantone — nach dem Jahresmodell: Der Satz bemisst sich am hochgerechneten Jahreseinkommen, was einen 13. Monatslohn und Boni über das Jahr glättet. Die Tarife bestehen mit und ohne Kirchensteuer. Freiburg verbindet damit ein welsches Berechnungsmodell mit deutschsprachiger Verwaltungspraxis.',
    faq: {
      q: 'Was bedeutet das Jahresmodell für die Quellensteuer in Freiburg?',
      a: 'Im Jahresmodell wird das voraussichtliche Jahreseinkommen für die Satzbestimmung herangezogen. Unregelmässige Löhne, ein 13. Monatslohn oder Boni führen dadurch nicht zu Satzsprüngen in einzelnen Monaten wie im Monatsmodell — die Belastung verteilt sich gleichmässiger.',
    },
  },
  SO: {
    intro:
      'Solothurn besteuert quellensteuerpflichtige Arbeitnehmende nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Als einer der acht Kantone mit Sondervereinbarung mit Frankreich (Tarif SF) gilt für gewisse Grenzgänger eine besondere Regelung. Für Pendler in die Räume Basel und Bern ist Solothurn steuerlich ein Mittelweg — das zeigt sich auch bei der Quellensteuer.',
    faq: {
      q: 'Gilt für Grenzgänger im Kanton Solothurn ein Sondertarif?',
      a: 'Für Grenzgänger aus Frankreich unter der Sondervereinbarung gilt der Tarif SF. Für alle übrigen quellensteuerpflichtigen Arbeitnehmenden gelten die ordentlichen Tarife A/B/C/H, die der Rechner oben abbildet.',
    },
  },
  BS: {
    intro:
      'Basel-Stadt ist mit seiner Pharma- und Life-Sciences-Industrie ein internationaler Arbeitsmarkt mit hohem Anteil quellensteuerpflichtiger Fachkräfte, viele davon Grenzgänger aus Deutschland und Frankreich. Der Kanton rechnet nach dem Monatsmodell und gehört zu den acht Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Die Tarife bestehen mit und ohne Kirchensteuer.',
    faq: {
      q: 'Wie werden Grenzgänger nach Basel-Stadt bei der Quellensteuer behandelt?',
      a: 'Für Grenzgänger aus Deutschland gelten die Grenzgängertarife, für solche aus Frankreich die Sondervereinbarung (Tarif SF). Wer im Kanton wohnt und arbeitet, wird nach den ordentlichen Tarifen A/B/C/H besteuert — genau diese berechnet der Rechner oben.',
    },
  },
  BL: {
    intro:
      'Basel-Landschaft teilt den trinationalen Arbeitsmarkt der Region Basel und zählt viele Grenzgänger. Der Kanton rechnet die Quellensteuer nach dem Monatsmodell, führt die Tarife mit und ohne Kirchensteuer und gehört zu den acht Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Für Zuzüger aus dem nahen Ausland ist der monatliche Abzug damit klar geregelt.',
    faq: {
      q: 'Unterscheidet sich die Quellensteuer im Baselbiet von Basel-Stadt?',
      a: 'Das Berechnungsmodell (Monatsmodell) und die Grundstruktur sind gleich, die Sätze unterscheiden sich jedoch, weil Basel-Landschaft eigene kantonale Tarife hat. Der Rechner oben verwendet die Baselbieter Tarife; für die Stadt wählen Sie den Kanton Basel-Stadt.',
    },
  },
  SH: {
    intro:
      'Schaffhausen nutzt seine Grenzlage zu Deutschland aktiv und beschäftigt viele Grenzgänger. Bei der Quellensteuer gilt das Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Das moderate Schaffhauser Steuerniveau — deutlich unter Zürich-Stadt — spiegelt sich in vergleichsweise günstigen Quellensteuersätzen.',
    faq: {
      q: 'Ist die Quellensteuer in Schaffhausen für Grenzgänger relevant?',
      a: 'Grenzgänger aus Deutschland werden nach den Grenzgängertarifen behandelt. Für im Kanton wohnhafte Quellensteuerpflichtige gelten die ordentlichen Tarife A/B/C/H — hier wirkt sich das moderate Schaffhauser Steuerniveau günstig auf den Abzug aus.',
    },
  },
  AR: {
    intro:
      'Appenzell Ausserrhoden besteuert quellensteuerpflichtige Arbeitnehmende nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Als günstiger Ostschweizer Wohnkanton — eine Stufe unter St. Gallen — bietet Ausserrhoden für Pendler in die Region St. Gallen einen moderaten Quellensteuerabzug.',
    faq: {
      q: 'Für wen ist die Quellensteuer in Appenzell Ausserrhoden relevant?',
      a: 'Für ausländische Arbeitnehmende ohne Niederlassungsbewilligung C mit Wohnsitz im Kanton. Da Ausserrhoden günstiger besteuert als St. Gallen und dies im Tarif enthalten ist, fällt der monatliche Abzug moderat aus.',
    },
  },
  AI: {
    intro:
      'Appenzell Innerrhoden ist der kleinste und einer der günstigsten Steuerkantone der Schweiz. Bei der Quellensteuer gilt das Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Weil der tiefe Kantonstarif im Quellensteuertarif enthalten ist, gehört die Innerrhoder Quellensteuer zu den tiefsten des Landes.',
    faq: {
      q: 'Wie tief ist die Quellensteuer in Appenzell Innerrhoden?',
      a: 'Sehr tief im Vergleich: Da Innerrhoden bei der ordentlichen Einkommenssteuer zu den günstigsten Kantonen zählt und diese in den Quellensteuertarif einfliesst, ist der monatliche Abzug bei gleichem Lohn spürbar geringer als in den Zentrumskantonen.',
    },
  },
  SG: {
    intro:
      'St. Gallen ist der Ostschweizer Zentrumskanton mit einem breiten Arbeitsmarkt und einem entsprechend relevanten Anteil quellensteuerpflichtiger Arbeitnehmender. Der Kanton rechnet nach dem Monatsmodell und führt die Tarife mit und ohne Kirchensteuer. Das Steuerniveau liegt im Mittelfeld — über den beiden Appenzell, aber unter den Westschweizer Werten.',
    faq: {
      q: 'Nach welchem Modell berechnet St. Gallen die Quellensteuer?',
      a: 'Nach dem Monatsmodell: Massgebend ist der monatliche Bruttolohn. Der Tarif enthält Kantons-, Gemeinde- und Bundessteuer und besteht mit und ohne Kirchensteuer.',
    },
  },
  GR: {
    intro:
      'Graubünden beschäftigt in Tourismus und Baugewerbe viele Saison- und Grenzarbeitskräfte — auch aus Italien. Der Kanton rechnet die Quellensteuer nach dem Monatsmodell und ist einer von nur drei Kantonen (mit Tessin und Wallis) mit besonderen Tarifen für Grenzgänger aus Italien. Die ordentlichen Tarife bestehen mit und ohne Kirchensteuer.',
    faq: {
      q: 'Gibt es in Graubünden besondere Tarife für Grenzgänger aus Italien?',
      a: 'Ja. Graubünden führt — wie Tessin und Wallis — zusätzliche Tarifcodes für Grenzgänger aus Italien, die nach dem Grenzgängerabkommen CH-IT besteuert werden. Der Rechner oben deckt die ordentlichen Tarife A/B/C/H ab.',
    },
  },
  AG: {
    intro:
      'Der Aargau liegt zwischen Zürich, Basel, Bern und Luzern und ist ein beliebter Wohn- und Pendlerkanton. Bei der Quellensteuer gilt das Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Das solide Mittelfeld-Steuerniveau des Aargaus schlägt sich in moderaten, gut kalkulierbaren Quellensteuersätzen nieder.',
    faq: {
      q: 'Ist die Quellensteuer im Aargau günstiger als in den Nachbarkantonen?',
      a: 'Gegenüber den Zentrumskantonen Zürich-Stadt oder Basel-Stadt in der Regel ja, gegenüber der Innerschweiz nicht. Da der Quellensteuertarif die Kantonssteuer enthält, bewegt sich die Aargauer Belastung im gleichen Mittelfeld wie die ordentliche Steuer.',
    },
  },
  TG: {
    intro:
      'Der Thurgau am Bodensee zieht Zuzüger aus dem Raum Zürich und aus Deutschland an und beschäftigt Grenzgänger. Bei der Quellensteuer gilt das Monatsmodell, die Tarife bestehen mit und ohne Kirchensteuer. Das günstige Mittelfeld-Steuerniveau des Thurgaus sorgt für vergleichsweise moderate Quellensteuersätze.',
    faq: {
      q: 'Wie wird die Quellensteuer für Zuzüger aus Deutschland im Thurgau geregelt?',
      a: 'Wer im Thurgau wohnt und quellensteuerpflichtig ist, wird nach den ordentlichen Tarifen A/B/C/H besteuert. Grenzgänger aus Deutschland fallen unter die Grenzgängertarife. Das moderate Thurgauer Steuerniveau wirkt sich günstig auf den Abzug aus.',
    },
  },
  TI: {
    intro:
      'Das Tessin ist der italienischsprachige Kanton mit einem sehr hohen Anteil an Grenzgängern aus Italien. Die Quellensteuer wird nach dem Jahresmodell berechnet, und das Tessin führt — wie Graubünden und Wallis — besondere Tarife für italienische Grenzgänger. Kirchensteuer wird nicht an der Quelle erhoben; der Tarif kennt keine Konfessionsvariante.',
    faq: {
      q: 'Warum ist die Quellensteuer im Tessin für Grenzgänger besonders wichtig?',
      a: 'Weil das Tessin einen der grössten Grenzgängeranteile der Schweiz hat. Für Grenzgänger aus Italien gelten nach dem Grenzgängerabkommen CH-IT besondere Tarife; wer im Kanton wohnt, wird nach den ordentlichen Tarifen A/B/C/H nach dem Jahresmodell besteuert.',
    },
  },
  VD: {
    intro:
      'Die Waadt mit dem Zentrum Lausanne zählt viele quellensteuerpflichtige Arbeitnehmende und Grenzgänger aus Frankreich. Der Kanton rechnet nach dem Jahresmodell und gehört zu den acht Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Kirchensteuer wird nicht an der Quelle erhoben — der Tarif kennt keine Konfessionsvariante.',
    faq: {
      q: 'Nach welchem Modell rechnet die Waadt die Quellensteuer?',
      a: 'Nach dem Jahresmodell: Der Satz bemisst sich am hochgerechneten Jahreseinkommen, was unregelmässige Löhne und einen 13. Monatslohn glättet. Kirchensteuer ist im Waadtländer Quellensteuertarif nicht enthalten.',
    },
  },
  VS: {
    intro:
      'Das Wallis verbindet als Tourismus- und Grenzkanton gleich mehrere Besonderheiten: Es rechnet nach dem Jahresmodell, führt besondere Tarife für Grenzgänger aus Italien und gehört zugleich zu den Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Kirchensteuer wird nicht an der Quelle erhoben.',
    faq: {
      q: 'Warum ist die Quellensteuer im Wallis besonders vielschichtig?',
      a: 'Weil das Wallis an zwei Sprach- und Landesgrenzen liegt: Es kennt sowohl Grenzgängertarife für Italien als auch die Sondervereinbarung mit Frankreich. Wer im Kanton wohnt, wird nach den ordentlichen Tarifen A/B/C/H nach dem Jahresmodell besteuert; der Rechner oben bildet diese ab.',
    },
  },
  NE: {
    intro:
      'Neuenburg im Jurabogen zählt zu den Hochsteuerkantonen — und das wirkt sich über die ordentliche Steuer auch auf die Quellensteuer aus. Der Kanton rechnet nach dem Monatsmodell und gehört zu den acht Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Kirchensteuer wird nicht an der Quelle erhoben.',
    faq: {
      q: 'Ist die Quellensteuer in Neuenburg höher als im Schweizer Durchschnitt?',
      a: 'Tendenziell ja: Da Neuenburg bei der ordentlichen Einkommenssteuer zu den teureren Kantonen zählt und diese im Quellensteuertarif enthalten ist, fällt der monatliche Abzug bei vergleichbarem Lohn höher aus als in günstigen Kantonen.',
    },
  },
  GE: {
    intro:
      'Genf hat einen der höchsten Anteile quellensteuerpflichtiger Arbeitnehmender der Schweiz — internationale Organisationen, ein grosser Grenzgängeranteil und ein hoher Ausländeranteil prägen den Arbeitsmarkt. Der Kanton rechnet nach dem Jahresmodell, was unregelmässige Löhne glättet. Kirchensteuer wird nicht an der Quelle erhoben; der Tarif kennt keine Konfessionsvariante.',
    faq: {
      q: 'Warum rechnet Genf die Quellensteuer nach dem Jahresmodell?',
      a: 'Das Jahresmodell (in der Westschweiz üblich) bemisst den Satz am hochgerechneten Jahreseinkommen. Gerade bei den vielen internationalen Anstellungen mit Boni und variablen Löhnen vermeidet das Satzsprünge in einzelnen Monaten.',
    },
  },
  JU: {
    intro:
      'Der Jura ist der einzige Kanton, dessen Quellensteuertarif ausschliesslich mit Kirchensteuer geführt wird — eine konfessionslose Variante ohne Kirchensteuer existiert im Tarif nicht. Der Kanton rechnet nach dem Monatsmodell und gehört zu den acht Kantonen mit Sondervereinbarung mit Frankreich (Tarif SF). Das Steuerniveau liegt, wie bei der ordentlichen Steuer, im oberen Bereich.',
    faq: {
      q: 'Warum kennt der Jura keinen Quellensteuertarif ohne Kirchensteuer?',
      a: 'Der Kanton Jura veröffentlicht die Quellensteuertarife nur in der Variante mit Kirchensteuer (Y). Der Rechner oben verwendet für den Jura deshalb automatisch diesen Tarif; die Kirchensteuer ist im ausgewiesenen Satz bereits enthalten.',
    },
  },
};
