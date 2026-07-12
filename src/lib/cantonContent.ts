/**
 * Hand-written, canton-specific editorial content for the programmatic
 * /steuerrechner/[kanton]/ pages (SEO_SPEC §3.2 anti-doorway rules: no
 * sentence templates with swapped nouns — every intro is individually
 * written around that canton's actual tax characteristics, which are
 * verifiable in /src/data/tax/). Quantitative figures are injected by the
 * page template from the data files, not hardcoded here.
 *
 * compare: cantons shown in the comparison teaser (chosen for relevance,
 * not necessarily geographic neighbours). portal: official canton web
 * portal (stable root domains).
 */
export interface CantonEditorial {
  intro: string;
  faq: { q: string; a: string };
  compare: string[]; // canton abbrs
  portal: string;
}

export const CANTON_CONTENT: Record<string, CantonEditorial> = {
  ZH: {
    intro:
      'Der Kanton Zürich besteuert Einkommen nach einem progressiven Stufentarif, auf den Kanton und Gemeinden ihre Steuerfüsse anwenden. Die Stadt Zürich liegt dabei deutlich über den günstigen Seegemeinden: Zwischen der günstigsten und der teuersten Zürcher Gemeinde liegen mehrere Dutzend Steuerfussprozente — bei hohen Einkommen entscheidet der Wohnort innerhalb des Kantons über Tausende von Franken. Als bevölkerungsreichster Kanton mit dem grössten Arbeitsmarkt der Schweiz bleibt Zürich steuerlich Mittelfeld: spürbar teurer als die Innerschweiz, aber günstiger als die Westschweiz.',
    faq: {
      q: 'Warum sind die Steuern am Zürichsee tiefer als in der Stadt Zürich?',
      a: 'Gemeinden mit hoher Steuerkraft pro Kopf — etwa Zumikon, Kilchberg oder Rüschlikon — kommen mit tiefen Steuerfüssen aus, weil wenige, einkommensstarke Haushalte das Steueraufkommen tragen. Die Stadt Zürich finanziert dagegen zentralörtliche Leistungen und liegt deshalb deutlich höher.',
    },
    compare: ['ZG', 'AG', 'SZ'],
    portal: 'https://www.zh.ch',
  },
  BE: {
    intro:
      'Bern gehört bei den Einkommenssteuern zu den teuersten Kantonen der Schweiz — und zugleich zu jenen mit der grössten Spannweite zwischen den Gemeinden: Über 300 Berner Gemeinden wenden Steuerfüsse an, die sich mehr als verdoppeln können. Der Kantonstarif selbst ist stark progressiv. Wer im Grossraum Bern wohnt und mit dem benachbarten Solothurn oder gar mit der Innerschweiz vergleicht, sieht bei mittleren Einkommen schnell vierstellige Differenzen pro Jahr.',
    faq: {
      q: 'Wie gross sind die Unterschiede zwischen den Berner Gemeinden?',
      a: 'Erheblich: Die günstigste Gemeinde liegt bei einem Steuerfuss unter 90 Prozent, die teuerste bei über 200 Prozent. Innerhalb des Kantons Bern kann ein Umzug die Gemeindesteuer damit mehr als halbieren — der Rechner oben zeigt die Belastung am Hauptort Bern.',
    },
    compare: ['SO', 'FR', 'LU'],
    portal: 'https://www.be.ch',
  },
  LU: {
    intro:
      'Luzern hat sich mit mehreren Steuerreformen in die günstigere Hälfte der Schweiz vorgearbeitet und ist heute der preiswerteste Weg, «Zentralschweizer Steuerniveau» mit einem grösseren Zentrum zu verbinden. Der Tarif ist moderat progressiv, die Stadt Luzern liegt über dem Kantonsschnitt, viele Agglomerationsgemeinden darunter. Gegenüber den Nachbarn Zug und Schwyz bleibt ein deutlicher Abstand — gegenüber Bern oder Zürich spart eine Luzerner Adresse dagegen spürbar.',
    faq: {
      q: 'Ist Luzern steuerlich mit Zug vergleichbar?',
      a: 'Nein — Zug bleibt in einer eigenen Liga. Luzern positioniert sich aber als günstigstes «grosses» Zentrum der Zentralschweiz: tiefer als Zürich, Bern oder Basel, wenn auch klar über Zug, Schwyz und Nidwalden.',
    },
    compare: ['ZG', 'SZ', 'BE'],
    portal: 'https://www.lu.ch',
  },
  UR: {
    intro:
      'Uri verzichtet als einer von nur zwei Kantonen auf einen progressiven Tarif: Das steuerbare Einkommen wird mit einem einheitlichen Proportionalsatz («Flat Rate») belastet, auf den Kanton und Gemeinden ihre Steuerfüsse anwenden. Das macht die Rechnung ungewöhnlich transparent — und für höhere Einkommen attraktiv, weil der Grenzsteuersatz nicht ansteigt. Kombiniert mit tiefen Lebenshaltungskosten gehört Uri regelmässig zu den günstigsten Kantonen ausserhalb der bekannten Steuerzentren.',
    faq: {
      q: 'Was bedeutet der Flat-Rate-Tarif in Uri konkret?',
      a: 'Jeder Franken steuerbares Einkommen wird gleich belastet — es gibt keine Progressionsstufen. Ihr Durchschnittssteuersatz entspricht damit dem Grenzsteuersatz. Bei steigendem Einkommen wächst die Steuer in Uri deshalb linear statt überproportional.',
    },
    compare: ['SZ', 'OW', 'GR'],
    portal: 'https://www.ur.ch',
  },
  SZ: {
    intro:
      'Schwyz ist seit Jahrzehnten eine der ersten Adressen für tiefe Einkommenssteuern und liegt im Kantonsranking regelmässig direkt hinter Zug. Eine Besonderheit: Für die Gemeindesteuer gilt ein eigener, offizieller Gemeindetarif — unser Rechner verwendet ihn exakt so, wie ihn die ESTV publiziert. Zwischen den steuergünstigen Gemeinden am oberen Zürichsee und den übrigen Talschaften bestehen dabei erhebliche Unterschiede; der Hauptort Schwyz selbst gehört nicht zu den günstigsten Ecken des Kantons.',
    faq: {
      q: 'Warum rechnet der Kanton Schwyz mit einem separaten Gemeindetarif?',
      a: 'Im Schwyzer System wird die Gemeindesteuer nicht einfach als Prozentsatz der Kantonssteuer erhoben, sondern über eine eigene Tarifkurve, auf die der Gemeindesteuerfuss angewendet wird. Unser Rechner bildet genau diese offizielle Struktur ab — viele einfache Vergleichsrechner ignorieren sie.',
    },
    compare: ['ZG', 'ZH', 'LU'],
    portal: 'https://www.sz.ch',
  },
  OW: {
    intro:
      'Obwalden war der Pionier der Flat-Rate-Steuer in der Schweiz: Statt eines progressiven Tarifs gilt ein einheitlicher Proportionalsatz von 1.8 Prozent als einfache Steuer, multipliziert mit den Steuerfüssen von Kanton und Gemeinde. Diese radikale Vereinfachung machte den kleinen Innerschweizer Kanton schlagartig zu einem der günstigsten Steuerstandorte des Landes — besonders für hohe Einkommen, deren Grenzsteuersatz hier nicht ansteigt.',
    faq: {
      q: 'Für wen lohnt sich der Obwaldner Flat-Tarif am meisten?',
      a: 'Je höher das Einkommen, desto grösser der Vorteil gegenüber progressiven Kantonen: Während anderswo der Grenzsteuersatz mit dem Einkommen steigt, bleibt er in Obwalden konstant. Bei tiefen Einkommen relativiert sich der Effekt, weil progressive Tarife dort ohnehin wenig belasten.',
    },
    compare: ['NW', 'UR', 'LU'],
    portal: 'https://www.ow.ch',
  },
  NW: {
    intro:
      'Nidwalden verbindet Zentralschweizer Tiefsteuerpolitik mit unmittelbarer Nähe zu Luzern: Wer im Raum Stans wohnt und in der Stadt arbeitet, kombiniert kurze Wege mit einer Steuerbelastung, die regelmässig unter den fünf günstigsten Kantonen liegt. Der Tarif ist flach gehalten, die Unterschiede zwischen den elf Gemeinden sind vergleichsweise klein — anders als etwa in Bern oder Zürich spielt die Gemeindewahl hier nur eine Nebenrolle.',
    faq: {
      q: 'Wie stark unterscheiden sich die Nidwaldner Gemeinden?',
      a: 'Kaum — die Spannweite der Gemeindesteuerfüsse ist eine der kleinsten der Schweiz. Die Standortentscheidung innerhalb von Nidwalden verändert die Steuerrechnung nur geringfügig; entscheidend ist der Schritt über die Kantonsgrenze.',
    },
    compare: ['OW', 'LU', 'SZ'],
    portal: 'https://www.nw.ch',
  },
  GL: {
    intro:
      'Glarus fliegt steuerlich unter dem Radar: kein Tiefsteuer-Marketing, aber eine solide Position im vorderen Mittelfeld — deutlich günstiger als die grossen Zentren, ohne die Extremwerte der Innerschweiz. Seit der historischen Gemeindefusion besteht der Kanton nur noch aus drei Gemeinden, entsprechend übersichtlich ist die Steuerlandschaft. Für Pendler ins Glarnerland oder nach Zürich kann sich der Vergleich mit den Nachbarn lohnen.',
    faq: {
      q: 'Wie viele Gemeinden hat der Kanton Glarus?',
      a: 'Nur drei: Glarus, Glarus Nord und Glarus Süd — das Ergebnis der schweizweit radikalsten Gemeindefusion. Die Steuerfussunterschiede zwischen ihnen sind entsprechend gering, was den Standortentscheid innerhalb des Kantons stark vereinfacht.',
    },
    compare: ['SZ', 'SG', 'GR'],
    portal: 'https://www.gl.ch',
  },
  ZG: {
    intro:
      'Zug ist das Mass aller Dinge bei den Schweizer Einkommenssteuern: In praktisch jedem Vergleich — auch in unserem Ranking über alle 26 Hauptorte — steht der Kanton an der Spitze. Möglich machen das ein bewusst flach gehaltener Tarif, grosszügige Tarifstufen und Gemeindesteuerfüsse, die selbst am teuersten Ort des Kantons unter dem liegen, was anderswo die günstigste Gemeinde verlangt. Die Kehrseite sind die höchsten Wohnkosten der Schweiz — die Steuerersparnis wird faktisch in die Miete umverteilt.',
    faq: {
      q: 'Lohnt sich ein Umzug nach Zug trotz hoher Mieten?',
      a: 'Das ist eine Rechenaufgabe: Die jährliche Steuerersparnis gegenüber Ihrem heutigen Wohnort (Rechner oben) muss die Mehrkosten bei Miete oder Kaufpreis übersteigen. Bei hohen Einkommen geht die Rechnung oft auf, bei mittleren häufig nicht — gerade weil die Zuger Wohnkosten die Steuervorteile teilweise kapitalisieren.',
    },
    compare: ['SZ', 'ZH', 'LU'],
    portal: 'https://www.zg.ch',
  },
  FR: {
    intro:
      'Der zweisprachige Kanton Freiburg rechnet mit einer Besonderheit: Der Tarif definiert für jedes Einkommensniveau direkt einen effektiven Steuersatz, der zwischen den Stufen linear interpoliert wird — eine kontinuierliche Kurve statt diskreter Progressionsstufen. Unter dem Strich liegt Freiburg damit im teureren Drittel der Schweiz, klar über dem benachbarten Bern-Mittelland-Niveau für hohe Einkommen, aber mit familienfreundlichen Elementen im Tarifaufbau.',
    faq: {
      q: 'Was heisst «interpolierter Tarif» im Kanton Freiburg?',
      a: 'Der Freiburger Tarif legt Sätze an Stützstellen fest (etwa bei 10’000, 20’000, 30’000 Franken) und berechnet dazwischen den Satz linear. Ihr effektiver Steuersatz wächst dadurch stufenlos mit dem Einkommen — es gibt keine Sprünge an Stufengrenzen.',
    },
    compare: ['BE', 'VD', 'NE'],
    portal: 'https://www.fr.ch',
  },
  SO: {
    intro:
      'Solothurn liegt steuerlich zwischen den Welten: günstiger als das benachbarte Bern, teurer als der Aargau, mit dem es um Zuzüger aus den Grossräumen Zürich und Basel konkurriert. Der Kantonstarif ist klassisch progressiv; die Gemeindesteuerfüsse streuen breit, sodass sich innerhalb des Kantons ein genauer Blick lohnt. Für Pendler Richtung Basel oder Bern ist Solothurn oft der Kompromiss aus erreichbaren Wohnkosten und vertretbarer Steuerlast.',
    faq: {
      q: 'Ist Solothurn für Pendler nach Basel attraktiv?',
      a: 'Häufig ja: Die Steuerbelastung liegt unter jener von Basel-Stadt, die Wohnkosten ebenfalls — dafür kommen Pendelzeit und -kosten dazu. Vergleichen Sie Ihre konkreten Zahlen mit dem Rechner oben und dem Kantonsvergleich.',
    },
    compare: ['BL', 'AG', 'BE'],
    portal: 'https://www.so.ch',
  },
  BS: {
    intro:
      'Basel-Stadt ist der Sonderfall unter den Kantonen: Nur drei Gemeinden — Basel, Riehen und Bettingen — bilden den kleinsten Kanton der Schweiz, und die Stadt Basel übernimmt weite Teile dessen, was anderswo Gemeindesteuern finanzieren. Entsprechend hoch ist der kantonale Anteil an der Steuerrechnung. Im nationalen Vergleich gehört Basel-Stadt zu den teuersten Standorten für Einkommenssteuern; die beiden Landgemeinden Riehen und Bettingen sind spürbar günstiger als die Kernstadt.',
    faq: {
      q: 'Lohnt sich innerhalb von Basel-Stadt der Umzug nach Riehen oder Bettingen?',
      a: 'Steuerlich ja: Beide Landgemeinden erheben deutlich tiefere Gemeindesteuern als die Stadt Basel. Da der Kanton nur drei Gemeinden hat, ist das zugleich die einzige Stellschraube — grössere Effekte erzielt nur der Wechsel ins Baselbiet oder nach Solothurn.',
    },
    compare: ['BL', 'SO', 'AG'],
    portal: 'https://www.bs.ch',
  },
  BL: {
    intro:
      'Basel-Landschaft berechnet die Einkommenssteuer als einziger Kanton über eine mathematische Formel mit Logarithmus statt über eine Stufentabelle — die Progression verläuft damit vollkommen stufenlos. Für Steuerzahlende heisst das: keine Tarifsprünge, aber auch eine Rechnung, die sich von Hand kaum nachvollziehen lässt. Unser Rechner wertet die offizielle Formel exakt aus. Im Ranking liegt das Baselbiet im teureren Drittel, bleibt aber günstiger als die Kernstadt Basel.',
    faq: {
      q: 'Wie funktioniert die Baselbieter Steuerformel?',
      a: 'Der Tarif definiert die geschuldete Steuer als stetige Funktion des Einkommens (mit logarithmischem Term) — publiziert von der ESTV als offizielle Formel, die unser Rechner unverändert auswertet. Vorteil: Die Grenzbelastung steigt kontinuierlich, ohne die Schwelleneffekte klassischer Stufentarife.',
    },
    compare: ['BS', 'SO', 'AG'],
    portal: 'https://www.bl.ch',
  },
  SH: {
    intro:
      'Schaffhausen nutzt seine Grenzlage aktiv: Der nördlichste Kanton positioniert sich seit Jahren mit moderaten Unternehmens- und Einkommenssteuern gegen die teure Nachbarschaft Zürichs — und als Alternative für Zuzüger aus Deutschland. Die Belastung liegt im soliden Mittelfeld, deutlich unter Zürich-Stadt-Niveau. Innerhalb des kompakten Kantons streuen die Gemeindesteuerfüsse nur begrenzt, der Hauptort ist ein guter Anhaltspunkt für die ganze Region.',
    faq: {
      q: 'Ist Schaffhausen günstiger als Zürich?',
      a: 'Bei vergleichbaren Einkommen in der Regel ja — vor allem gegenüber der Stadt Zürich fällt die Rechnung meist zugunsten Schaffhausens aus. Gegenüber günstigen Zürcher Seegemeinden schrumpft der Vorsprung. Der Kantonsvergleich zeigt Ihre konkrete Differenz.',
    },
    compare: ['ZH', 'TG', 'SG'],
    portal: 'https://www.sh.ch',
  },
  AR: {
    intro:
      'Appenzell Ausserrhoden bietet Ostschweizer Steuerkonditionen eine Stufe unter St. Gallen: Der Tarif ist einfach aufgebaut, die Belastung liegt im günstigeren Mittelfeld, und mit Herisau ist der Hauptort zugleich das wirtschaftliche Zentrum. Wer im Raum St. Gallen arbeitet, findet im Ausserrhodischen oft die steuerlich attraktivere Wohnadresse — auch wenn das innerrhodische Appenzell nochmals deutlich tiefer liegt.',
    faq: {
      q: 'Ausserrhoden oder Innerrhoden — wo zahlt man weniger?',
      a: 'Appenzell Innerrhoden ist klar günstiger und spielt in der Liga von Zug und Schwyz. Ausserrhoden bleibt aber für Pendler nach St. Gallen attraktiv: besser erschlossen, grösseres Wohnangebot und immer noch günstiger als der Kanton St. Gallen selbst.',
    },
    compare: ['AI', 'SG', 'TG'],
    portal: 'https://www.ar.ch',
  },
  AI: {
    intro:
      'Appenzell Innerrhoden ist der kleinste Kanton der Schweiz — und einer der günstigsten: Bei mittleren und hohen Einkommen mischt der Halbkanton regelmässig in der Spitzengruppe mit Zug, Schwyz und Nidwalden mit. Nur fünf Bezirke (die innerrhodische Entsprechung der Gemeinden) teilen sich die Steuerlandschaft, die Unterschiede zwischen ihnen sind moderat. Dazu kommt eine Verwaltung der kurzen Wege, wie sie nur ein Kanton mit gut 16’000 Einwohnern bieten kann.',
    faq: {
      q: 'Warum kann sich ein so kleiner Kanton so tiefe Steuern leisten?',
      a: 'Schlanke Strukturen, tiefe Zentrumslasten und eine bewusste Standortstrategie: Innerrhoden finanziert keine Grossstadt-Infrastruktur und hält Tarif wie Steuerfüsse konstant tief, um Einwohner und Unternehmen zu gewinnen — was die Steuerbasis wiederum verbreitert.',
    },
    compare: ['AR', 'SG', 'SZ'],
    portal: 'https://www.ai.ch',
  },
  SG: {
    intro:
      'St. Gallen trägt als Ostschweizer Zentrumskanton die typischen Lasten eines grossen Einzugsgebiets — und liegt steuerlich im Mittelfeld, spürbar über den beiden Appenzell, aber unter den Westschweizer Werten. Der Tarif ist progressiv, die Spannweite der Gemeindesteuerfüsse beachtlich: Vom Bodensee bis ins Sarganserland variiert die Belastung deutlich. Für viele bleibt die Stadt St. Gallen der Referenzpunkt — genau dafür rechnet unser Rechner.',
    faq: {
      q: 'Wo ist es im Kanton St. Gallen am günstigsten?',
      a: 'Traditionell in steuerstarken Gemeinden rund um den oberen Zürichsee und im Raum Rapperswil-Jona; am oberen Ende stehen periphere Gemeinden mit schwacher Steuerkraft. Die Differenz kann mehrere Jahresferien wert sein — vergleichen Sie den Hauptort oben mit Ihrer Wunschgemeinde.',
    },
    compare: ['AR', 'AI', 'TG'],
    portal: 'https://www.sg.ch',
  },
  GR: {
    intro:
      'Graubünden ist der flächengrösste Kanton mit einer der vielfältigsten Steuerlandschaften: Rund hundert Gemeinden von Chur bis in die Tourismus-Hochburgen wenden sehr unterschiedliche Steuerfüsse an. Insgesamt hat sich der Kanton mit Reformen in die günstigere Hälfte der Schweiz bewegt; einzelne steuerkräftige Tourismusgemeinden im Engadin unterbieten den Hauptort deutlich. Die Rechnung oben gilt für Chur — als Basis für den Vergleich mit Ihrer Zielgemeinde.',
    faq: {
      q: 'Sind Tourismusorte wie St. Moritz steuerlich teuer?',
      a: 'Oft im Gegenteil: Steuerkräftige Tourismusgemeinden können sich tiefe Steuerfüsse leisten. Dafür sind Wohnraum und Lebenshaltung dort markant teurer — die Gesamtrechnung Wohnen + Steuern fällt je nach Einkommen sehr unterschiedlich aus.',
    },
    compare: ['SG', 'GL', 'TI'],
    portal: 'https://www.gr.ch',
  },
  AG: {
    intro:
      'Der Aargau lebt steuerlich von seiner Lage zwischen Zürich, Basel, Bern und Luzern: solide Mittelfeld-Belastung, aber direkte Konkurrenz zu vier Grossregionen — was die Gemeindesteuerfüsse diszipliniert. Für Pendler in die umliegenden Zentren gehört der Kanton zu den beliebtesten Wohnstandorten der Schweiz, gerade weil die Kombination aus Steuerlast und Wohnkosten oft besser abschneidet als in den Zentrumskantonen selbst.',
    faq: {
      q: 'Ist der Aargau wirklich günstiger als Zürich?',
      a: 'Für die meisten Konstellationen ja — sowohl beim Tarif als auch bei typischen Gemeindesteuerfüssen. Der Abstand ist aber kleiner als zur Innerschweiz. Entscheidend bleibt der konkrete Gemeindevergleich, da beide Kantone intern stark streuen.',
    },
    compare: ['ZH', 'SO', 'LU'],
    portal: 'https://www.ag.ch',
  },
  TG: {
    intro:
      'Der Thurgau hält sich abseits der Steuer-Schlagzeilen und fährt damit gut: Belastung im günstigeren Mittelfeld, moderate Streuung zwischen den Gemeinden und stabile Steuerfüsse über die Jahre. Für Zuzüger aus dem Raum Zürich oder aus Deutschland (Grenznähe Konstanz) bietet der Kanton am Bodensee eine unaufgeregte, planbare Steuerumgebung — teurer als die Innerschweiz, aber verlässlich günstiger als die Zentrumskantone.',
    faq: {
      q: 'Wie schlägt sich der Thurgau gegen Zürich und St. Gallen?',
      a: 'Gegen beide meist vorteilhaft: Der Thurgauer Tarif und die typischen Steuerfüsse liegen unter Zürcher Stadtniveau und leicht unter St. Galler Werten. Der Rechner oben und der Kantonsvergleich zeigen die Differenz für Ihr Einkommen.',
    },
    compare: ['ZH', 'SG', 'SH'],
    portal: 'https://www.tg.ch',
  },
  TI: {
    intro:
      'Das Tessin rechnet nach eigenem Muster: Der italienischsprachige Kanton kombiniert einen stark progressiven Tarif mit vergleichsweise hohen Freibeträgen im unteren Bereich — tiefe Einkommen fahren gut, hohe zahlen Zuschläge im nationalen Vergleich. Zwischen Lugano, Bellinzona und den Talgemeinden streuen die Gemeindesteuerfüsse erheblich. Die Rechnung oben gilt für den Hauptort Bellinzona.',
    faq: {
      q: 'Für wen ist das Tessin steuerlich attraktiv?',
      a: 'Eher für tiefe bis mittlere Einkommen, die von den hohen Eingangsfreibeträgen profitieren. Bei hohen Einkommen gehört das Tessin zu den teureren Kantonen — wer flexibel ist, vergleicht mit der Zentralschweiz oder Graubünden.',
    },
    compare: ['GR', 'UR', 'VS'],
    portal: 'https://www.ti.ch',
  },
  VD: {
    intro:
      'Die Waadt gehört zu den teuersten Steuerkantonen der Schweiz — und zu den wenigen mit einem Familienquotienten-System: Verheiratete und Familien teilen ihr Einkommen für die Satzbestimmung durch einen Divisor, was die Progression für Familien spürbar dämpft. Alleinstehende mit gutem Einkommen tragen dafür eine der höchsten Belastungen des Landes. Lausanne als Hauptort liegt zusätzlich über dem kantonalen Durchschnitt.',
    faq: {
      q: 'Was bringt der Waadtländer Familienquotient?',
      a: 'Für die Satzbestimmung wird das Einkommen durch einen Quotienten geteilt (Ehepaare 1.8, plus Zuschläge pro Kind), der Satz dann aufs volle Einkommen angewendet. Familien zahlen so deutlich weniger als Alleinstehende mit gleichem Haushaltseinkommen — der Effekt ist stärker als beim klassischen Verheiratetentarif vieler Deutschschweizer Kantone.',
    },
    compare: ['GE', 'FR', 'VS'],
    portal: 'https://www.vd.ch',
  },
  VS: {
    intro:
      'Das Wallis besteuert zweistufig mit einer Eigenheit, die viele Vergleichsrechner falsch abbilden: Kanton und Gemeinden verwenden separate offizielle Tarifkurven — die Gemeindekurve ist flacher und deckelt früher. Unser Rechner verwendet beide Kurven exakt nach ESTV-Daten. Auf Basis des steuerbaren Einkommens gehört das Wallis zu den teureren Kantonen; kompensiert wird das teilweise durch grosszügige Abzüge, die das steuerbare Einkommen senken.',
    faq: {
      q: 'Warum wirken die Walliser Steuersätze hoch, die effektive Belastung aber oft nicht?',
      a: 'Weil das Wallis viel über Abzüge steuert: Kinder-, Versicherungs- und weitere Abzüge drücken das steuerbare Einkommen stärker als in vielen anderen Kantonen. Auf dem verbleibenden steuerbaren Einkommen sind die Tarife dann vergleichsweise hoch — genau diese Basis rechnet unser Vergleich.',
    },
    compare: ['VD', 'BE', 'TI'],
    portal: 'https://www.vs.ch',
  },
  NE: {
    intro:
      'Neuenburg trägt seit Jahren das Etikett des Hochsteuerkantons und arbeitet mit schrittweisen Tarifsenkungen dagegen an. Noch immer liegt der Jurabogen-Kanton bei den Einkommenssteuern in der Spitzengruppe der Belastung — insbesondere für mittlere und hohe Einkommen. Zwischen den Gemeinden sind die Unterschiede vergleichsweise klein, sodass innerhalb des Kantons wenig Optimierungsspielraum bleibt.',
    faq: {
      q: 'Warum sind die Steuern in Neuenburg so hoch?',
      a: 'Eine schmale Steuerbasis, industrielle Strukturwandel-Lasten und hohe Sozialausgaben treffen auf einen kleinen Kanton — das hält Tarif und Steuerfüsse oben. Die laufenden Reformen senken die Belastung schrittweise, der Rückstand auf das Mittelfeld bleibt aber vorerst bestehen.',
    },
    compare: ['JU', 'FR', 'VD'],
    portal: 'https://www.ne.ch',
  },
  GE: {
    intro:
      'Genf rechnet französisch: Auf die kantonale Basissteuer kommen «centimes additionnels» von Kanton und Gemeinde — Zuschläge, die als Prozentsatz der Basissteuer erhoben werden. Zusätzlich dämpft ein Splitting die Progression für Ehepaare. Insgesamt gehört Genf für Alleinstehende mit hohen Einkommen zu den teuersten Orten der Schweiz; die Gemeindezuschläge sind dafür im nationalen Vergleich moderat, weil der Kanton den Löwenanteil erhebt.',
    faq: {
      q: 'Was sind die Genfer «centimes additionnels»?',
      a: 'Zuschläge auf die kantonale Basissteuer: Der Kanton erhebt zusätzliche Rappen pro Franken Basissteuer, die Gemeinden ebenfalls — Cologny etwa deutlich weniger als Avully. Unser Rechner bildet dieses System über die offiziellen ESTV-Steuerfüsse ab.',
    },
    compare: ['VD', 'VS', 'FR'],
    portal: 'https://www.ge.ch',
  },
  JU: {
    intro:
      'Der Jura ist der jüngste Kanton der Schweiz — und einer der teuersten für Einkommenssteuern: Hohe Tarife und hohe Gemeindesteuerfüsse summieren sich zu einer Belastung, die regelmässig nur von Neuenburg übertroffen wird. Eine strukturelle Besonderheit: Der Kanton führt separate Tarife für Alleinstehende, Verheiratete und Alleinerziehende, statt mit Splitting zu arbeiten. Delsberg (Delémont) als Hauptort ist repräsentativ für das kantonale Niveau.',
    faq: {
      q: 'Gibt es im Jura günstige Gemeinden?',
      a: 'Die Streuung ist vorhanden, aber das Ausgangsniveau hoch: Selbst günstige jurassische Gemeinden liegen über dem, was in Mittelland-Kantonen üblich ist. Wer steuerlich optimieren will, vergleicht deshalb eher mit den Nachbarkantonen Bern, Solothurn oder Basel-Landschaft.',
    },
    compare: ['NE', 'BE', 'BL'],
    portal: 'https://www.jura.ch',
  },
};
