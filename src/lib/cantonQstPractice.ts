/**
 * Second editorial layer for the /quellensteuer-rechner/[kanton]/ pages (M16).
 *
 * The M11 layer (cantonQstContent.ts) describes each canton's *tariff* profile:
 * calculation model, church tax, cross-border agreements. This layer covers the
 * *practical* side — who is actually taxed at source in that canton, which local
 * employment pattern shapes it, and what to do about it — so that the 26 pages
 * differ in substance and not only in their computed numbers (SEO_SPEC §3.2).
 *
 * No figures here: every number on the page is computed from the canton's own
 * tariff data by the page itself.
 */
export interface CantonQstPractice {
  /** Canton-specific practical paragraph, rendered under "In der Praxis". */
  practice: string;
  /** A second FAQ, distinct from the one in cantonQstContent.ts. */
  faq: { q: string; a: string };
}

export const CANTON_QST_PRACTICE: Record<string, CantonQstPractice> = {
  ZH: {
    practice:
      'Der Kanton Zürich wickelt mehr Quellensteuerverhältnisse ab als jeder andere Kanton — vom Finanzplatz über die Hochschulen bis zur Industrie im Limmat- und Glattal. Wichtig ist dabei die Unterscheidung zwischen Arbeits- und Wohnkanton: Wer in der Stadt Zürich arbeitet, aber im Kanton Schwyz oder Aargau wohnt, wird nach dem Tarif des Wohnkantons abgerechnet. Massgebend ist der Wohnsitz am Ende der Steuerperiode beziehungsweise beim Austritt.',
    faq: {
      q: 'Ich arbeite in Zürich, wohne aber in einem anderen Kanton — welcher Tarif gilt?',
      a: 'Grundsätzlich der Tarif Ihres Wohnkantons. Ihr Arbeitgeber meldet die Quellensteuer an den Wohnsitzkanton ab; die Zürcher Tarife gelten nur, wenn Sie auch im Kanton Zürich Wohnsitz haben. Bei Wohnsitz im Ausland (Grenzgänger, Wochenaufenthalter) ist dagegen der Arbeitskanton zuständig.',
    },
  },
  BE: {
    practice:
      'Bern ist flächenmässig gross und zählt weit über dreihundert Gemeinden — für die Quellensteuer spielt das aber keine Rolle: Der Quellensteuertarif ist kantonal einheitlich und enthält eine pauschalierte Gemeindesteuer. Wer in Bern quellensteuerpflichtig ist, zahlt in Bern-Stadt denselben Satz wie im Oberland, obwohl sich die ordentlichen Steuerfüsse deutlich unterscheiden. Ein Umzug innerhalb des Kantons ändert am monatlichen Abzug deshalb nichts.',
    faq: {
      q: 'Ändert sich meine Quellensteuer, wenn ich innerhalb des Kantons Bern umziehe?',
      a: 'Nein. Der Quellensteuertarif gilt für den ganzen Kanton und enthält eine pauschale Gemeindekomponente. Erst bei einer nachträglichen ordentlichen Veranlagung wird der tatsächliche Steuerfuss Ihrer Wohngemeinde relevant — dann kann sich je nach Gemeinde eine Rückerstattung oder Nachzahlung ergeben.',
    },
  },
  LU: {
    practice:
      'In Luzern prägen Tourismus, Gastgewerbe und Gesundheitswesen einen grossen Teil der quellensteuerpflichtigen Anstellungen — häufig mit Kurzaufenthaltsbewilligung L oder befristeten Verträgen. Bei unterjährigem Stellenantritt rechnet der Arbeitgeber die Quellensteuer ab dem ersten Lohn ab; das Total über das Jahr kann dadurch von einer Jahresbetrachtung abweichen. Wer nur wenige Monate angestellt war, prüft deshalb am besten eine Tarifkorrektur.',
    faq: {
      q: 'Ich habe in Luzern nur einen Teil des Jahres gearbeitet — stimmt mein Abzug?',
      a: 'Im Monatsmodell wird jeder Monat einzeln nach dem Monatslohn besteuert, ohne Rücksicht darauf, wie viele Monate Sie insgesamt erwerbstätig waren. Das führt bei unterjähriger Anstellung oft zu einem zu hohen Abzug. Eine Tarifkorrektur oder die nachträgliche ordentliche Veranlagung gleicht das aus.',
    },
  },
  UR: {
    practice:
      'Uri ist ein kleiner Arbeitsmarkt mit wenigen grossen Arbeitgebern — Verkehr entlang der Gotthardachse, Bau und Industrie prägen die quellensteuerpflichtigen Anstellungen. Weil viele Erwerbstätige in Nachbarkantone pendeln, ist auch hier der Wohnsitz entscheidend: Wer in Uri wohnt und in Zug oder Luzern arbeitet, profitiert vom günstigen Urner Tarif. Die kantonale Steuerverwaltung ist überschaubar und für Rückfragen gut erreichbar.',
    faq: {
      q: 'Lohnt sich Wohnsitz in Uri bei Arbeit in einem Nachbarkanton?',
      a: 'Steuerlich ja, sofern Sie tatsächlich Wohnsitz in Uri begründen: Abgerechnet wird nach dem Tarif des Wohnkantons, und Uri liegt deutlich unter den Zentrumskantonen. Der Wohnsitz muss allerdings echt sein — ein blosser Nebenwohnsitz genügt nicht.',
    },
  },
  SZ: {
    practice:
      'Schwyz lebt zu einem erheblichen Teil vom Zuzug aus dem Wirtschaftsraum Zürich: Viele Erwerbstätige arbeiten am Zürichsee oder in der Stadt und wohnen in Wollerau, Freienbach oder Küssnacht. Für die Quellensteuer ist das entscheidend, denn abgerechnet wird nach dem Wohnkanton. Der Unterschied zwischen den Bezirken schlägt sich beim Quellensteuertarif jedoch nicht nieder — dieser gilt kantonal einheitlich.',
    faq: {
      q: 'Gilt in den steuergünstigen Schwyzer Gemeinden ein eigener Quellensteuertarif?',
      a: 'Nein. Der Quellensteuertarif ist im Kanton Schwyz einheitlich und enthält eine pauschale Gemeindekomponente. Die grossen Unterschiede zwischen den Gemeindesteuerfüssen wirken sich erst bei einer ordentlichen Veranlagung aus — etwa ab einem Bruttojahreslohn von CHF 120\'000.',
    },
  },
  OW: {
    practice:
      'Obwalden ist klein, aber wirtschaftlich vielseitig: Neben Industrie in Alpnach und Sarnen sorgt der Tourismus rund um Engelberg für saisonale Anstellungen mit Kurzaufenthaltsbewilligung. Der einheitliche Kantonstarif macht den monatlichen Abzug über die Lohnstufen hinweg besonders gut planbar — gerade für Saisonstellen, bei denen der Lohn zwischen Hoch- und Nebensaison schwankt.',
    faq: {
      q: 'Was bedeutet der Obwaldner Flat-Tarif für schwankende Saisonlöhne?',
      a: 'Weil der kantonale Anteil proportional statt stark progressiv ist, springt der Gesamtsatz bei einem guten Saisonmonat weniger stark nach oben als in progressiven Kantonen. Der Bundesanteil bleibt allerdings progressiv, sodass der Satz mit dem Lohn weiterhin steigt.',
    },
  },
  NW: {
    practice:
      'Nidwalden verbindet einen spezialisierten Arbeitsmarkt — Luftfahrt und Präzisionsindustrie rund um Stans — mit kurzen Wegen nach Luzern. Quellensteuerpflichtig sind hier häufig Fachkräfte mit B-Bewilligung, deren Jahreslohn nahe an der Schwelle zur nachträglichen ordentlichen Veranlagung liegt. Wer diese Schwelle überschreitet, reicht neu eine Steuererklärung ein — die Quellensteuer wird dann an die definitive Steuer angerechnet.',
    faq: {
      q: 'Was passiert, wenn mein Lohn in Nidwalden die Schwelle von CHF 120\'000 überschreitet?',
      a: 'Dann werden Sie nachträglich ordentlich veranlagt: Sie erhalten eine Steuererklärung, können sämtliche Abzüge geltend machen, und die bereits bezahlte Quellensteuer wird an die definitive Steuer angerechnet. Die Quellensteuer wird weiterhin monatlich abgezogen — sie wird nur zur Vorauszahlung.',
    },
  },
  GL: {
    practice:
      'Der Kanton Glarus besteht seit der Gemeindefusion aus nur drei Gemeinden — administrativ eine der einfachsten Ausgangslagen der Schweiz. Die quellensteuerpflichtigen Anstellungen konzentrieren sich auf die Industrie im Glarner Unterland sowie den Tourismus im Sernftal und in Braunwald. Für Zuzüger ist die Zuständigkeit dadurch leicht zu klären: eine kantonale Steuerverwaltung, ein Tarif.',
    faq: {
      q: 'An wen richte ich einen Antrag auf Tarifkorrektur im Kanton Glarus?',
      a: 'An die kantonale Steuerverwaltung in Glarus, nicht an Ihre Wohngemeinde — die Quellensteuer wird kantonal veranlagt. Die Frist für Tarifkorrektur und nachträgliche ordentliche Veranlagung läuft bis zum 31. März des Folgejahres.',
    },
  },
  ZG: {
    practice:
      'In Zug arbeitet ein aussergewöhnlich hoher Anteil international rekrutierter Fachkräfte — Rohstoffhandel, Pharma und Technologie prägen den Arbeitsmarkt. Entsprechend häufig liegen die Jahreslöhne über der Schwelle zur nachträglichen ordentlichen Veranlagung, sodass die Quellensteuer faktisch nur noch eine Vorauszahlung auf die ordentliche Steuer ist. Bei Bonuszahlungen empfiehlt sich ein Blick auf den Monat der Auszahlung, weil der Satz dort im Monatsmodell steigt.',
    faq: {
      q: 'Wie wirkt sich ein Bonus auf die Zuger Quellensteuer aus?',
      a: 'Im Monatsmodell wird der Bonus dem Auszahlungsmonat zugerechnet, wodurch der Satz in diesem Monat deutlich steigen kann. Über das Jahr gleicht sich das teilweise aus. Wer ordentlich veranlagt wird, erhält ohnehin eine Jahresrechnung — der Monatseffekt ist dann nur ein Liquiditätsthema.',
    },
  },
  FR: {
    practice:
      'Freiburg ist zweisprachig, und das prägt auch die Quellensteuerpraxis: Formulare und Merkblätter erscheinen auf Deutsch und Französisch, zuständig ist in beiden Fällen die kantonale Steuerverwaltung. Universität und Hochschulen bringen zudem viele befristete Anstellungen mit sich. Weil Freiburg nach dem Jahresmodell rechnet, wird ein unterjähriger Stellenantritt bei der Satzbestimmung anders behandelt als in den Monatsmodell-Kantonen.',
    faq: {
      q: 'Ich beginne mitten im Jahr in Freiburg zu arbeiten — wie wird der Satz bestimmt?',
      a: 'Im Jahresmodell wird der Lohn für die Satzbestimmung auf ein volles Jahr hochgerechnet. Der Satz richtet sich also nach dem hochgerechneten Jahreseinkommen, nicht nach der Summe der tatsächlich bezogenen Monatslöhne — das kann gegenüber dem Monatsmodell zu einem anderen Ergebnis führen.',
    },
  },
  SO: {
    practice:
      'Solothurn liegt im Einzugsgebiet gleich mehrerer Wirtschaftsräume: Basel im Norden, Bern und Biel im Westen, Olten als Bahnknoten in der Mitte. Viele quellensteuerpflichtige Arbeitnehmende pendeln deshalb über die Kantonsgrenze — abgerechnet wird nach dem Solothurner Tarif, sobald der Wohnsitz im Kanton liegt. Für Zuzüger aus dem Raum Basel ist das oft günstiger als ein Wohnsitz in der Stadt.',
    faq: {
      q: 'Ich wohne in Solothurn und arbeite in Basel — welcher Tarif gilt?',
      a: 'Der Solothurner Tarif, weil für die Quellensteuer der Wohnkanton massgebend ist. Ihr Basler Arbeitgeber rechnet die Quellensteuer ab und überweist sie an den Kanton Solothurn. Nur bei Wohnsitz im Ausland wäre der Arbeitskanton zuständig.',
    },
  },
  BS: {
    practice:
      'Basel-Stadt ist der Kanton mit dem wohl internationalsten Arbeitsmarkt der Schweiz — die Life-Sciences-Branche rekrutiert weltweit. Neben Grenzgängern spielen hier Wochenaufenthalter eine grosse Rolle: Personen, die unter der Woche in Basel wohnen und am Wochenende an ihren Hauptwohnsitz zurückkehren. Für sie gelten je nach Konstellation besondere Zuständigkeitsregeln, die im Zweifel mit der Steuerverwaltung zu klären sind.',
    faq: {
      q: 'Ich bin Wochenaufenthalter in Basel — wo werde ich besteuert?',
      a: 'Das hängt davon ab, wo Ihr steuerrechtlicher Wohnsitz liegt: Bei Lebensmittelpunkt im Ausland wird am Arbeitsort Basel-Stadt an der Quelle besteuert; liegt der Mittelpunkt in einem anderen Kanton, gilt dessen Tarif. Die Abgrenzung ist einzelfallabhängig — die kantonale Steuerverwaltung erteilt dazu verbindliche Auskunft.',
    },
  },
  BL: {
    practice:
      'Basel-Landschaft ist in erster Linie Wohnkanton für den Wirtschaftsraum Basel: Ein grosser Teil der quellensteuerpflichtigen Einwohnerinnen und Einwohner arbeitet in der Stadt oder im benachbarten Ausland. Für die Abrechnung zählt der Wohnsitz im Baselbiet, unabhängig davon, wo der Arbeitsplatz liegt. Wer aus Basel-Stadt ins Baselbiet zieht, sollte die Adressänderung dem Arbeitgeber sofort melden, damit der Tarif wechselt.',
    faq: {
      q: 'Ich ziehe von Basel-Stadt ins Baselbiet — was muss ich melden?',
      a: 'Melden Sie den Umzug umgehend Ihrem Arbeitgeber, denn dieser rechnet die Quellensteuer ab und muss ab dem Folgemonat den Baselbieter Tarif anwenden. Erfolgt die Meldung zu spät, wird zu viel oder zu wenig abgezogen — korrigierbar über eine Tarifkorrektur bis zum 31. März des Folgejahres.',
    },
  },
  SH: {
    practice:
      'Schaffhausen liegt fast vollständig nördlich des Rheins und ist auf drei Seiten von Deutschland umgeben — kein anderer Kanton ist so stark mit dem grenznahen Ausland verflochten. Industrie und Logistik beschäftigen viele Grenzgänger, während im Kanton wohnhafte Quellensteuerpflichtige nach den ordentlichen Tarifen abgerechnet werden. Die kurzen Wege nach Zürich machen Schaffhausen zudem für Pendler attraktiv.',
    faq: {
      q: 'Worin unterscheidet sich ein Grenzgänger von einem Zuzüger in Schaffhausen?',
      a: 'Ein Grenzgänger behält den Wohnsitz in Deutschland und pendelt zur Arbeit — für ihn gelten die Grenzgängerregeln des Doppelbesteuerungsabkommens. Wer den Wohnsitz in die Schweiz verlegt, wird dagegen nach den ordentlichen Tarifen A/B/C/H besteuert, die der Rechner oben abbildet.',
    },
  },
  AR: {
    practice:
      'Appenzell Ausserrhoden ist ein typischer Wohnkanton: Viele Erwerbstätige pendeln nach St. Gallen, ins Rheintal oder nach Herisau. Weil für die Quellensteuer der Wohnsitz zählt, profitieren sie vom Ausserrhoder Tarif, obwohl der Arbeitsplatz ausserhalb liegt. Bei Anstellungen im Gesundheits- und Sozialwesen — einem der grössten Arbeitgeberbereiche des Kantons — sind Teilzeitpensen häufig, was den Monatslohn und damit den Satz drückt.',
    faq: {
      q: 'Wie wirkt sich ein Teilzeitpensum auf die Quellensteuer in Ausserrhoden aus?',
      a: 'Der Satz richtet sich nach dem tatsächlich ausbezahlten Monatslohn, nicht nach dem Vollzeitäquivalent — ein tieferes Pensum führt deshalb zu einem tieferen Satz. Bei mehreren Teilzeitstellen gleichzeitig gelten Sonderregeln: Dann wird für die Satzbestimmung das Gesamteinkommen berücksichtigt.',
    },
  },
  AI: {
    practice:
      'Appenzell Innerrhoden ist der bevölkerungsärmste Kanton der Schweiz, und der Arbeitsmarkt ist entsprechend klein — Gewerbe, Tourismus und Landwirtschaft dominieren. Quellensteuerpflichtige Anstellungen sind dadurch seltener als anderswo, die Abläufe aber besonders direkt: Eine einzige kantonale Steuerverwaltung ist für Tarifkorrekturen und Auskünfte zuständig. Für Pendler ins st. gallische Rheintal bleibt der günstige Innerrhoder Tarif massgebend.',
    faq: {
      q: 'Ist der Innerrhoder Tarif auch bei Arbeit ausserhalb des Kantons massgebend?',
      a: 'Ja, solange Ihr Wohnsitz in Appenzell Innerrhoden liegt. Der Arbeitgeber — auch ein ausserkantonaler — muss die Quellensteuer nach dem Tarif Ihres Wohnkantons abrechnen und an diesen abliefern.',
    },
  },
  SG: {
    practice:
      'St. Gallen grenzt an Liechtenstein und Österreich, was den Arbeitsmarkt im Rheintal stark prägt: Zahlreiche Einwohnerinnen und Einwohner arbeiten in Liechtenstein, und umgekehrt pendeln viele aus Vorarlberg in die Schweiz. Für diese Konstellationen gelten die Regeln des jeweiligen Doppelbesteuerungsabkommens. Wer im Kanton wohnt und im Kanton arbeitet, wird nach den ordentlichen Tarifen abgerechnet — genau diese bildet der Rechner oben ab.',
    faq: {
      q: 'Ich wohne in St. Gallen und arbeite in Liechtenstein — gilt die Schweizer Quellensteuer?',
      a: 'Nicht in dieser Form. Für Erwerbstätigkeit in Liechtenstein greift das Doppelbesteuerungsabkommen CH–FL mit eigenen Zuteilungsregeln; das Einkommen wird in der Regel am Wohnsitz in der Schweiz erfasst. Der Rechner oben deckt die kantonalen Quellensteuertarife für Anstellungen in der Schweiz ab.',
    },
  },
  GR: {
    practice:
      'Kaum ein Kanton ist so stark saisonal geprägt wie Graubünden: In Hotellerie, Gastronomie und Bergbahnen entstehen jeden Winter tausende befristete Anstellungen, häufig mit Kurzaufenthaltsbewilligung L. Für die Quellensteuer heisst das: hohe Monatslöhne während weniger Saisonmonate, dazwischen keine. Weil der Satz im Monatsmodell je Monat bestimmt wird, fällt der Abzug in der Saison oft höher aus, als es dem Jahreseinkommen entspräche.',
    faq: {
      q: 'Ich arbeite nur eine Wintersaison in Graubünden — zahle ich zu viel Quellensteuer?',
      a: 'Häufig ja. Der Monatssatz orientiert sich am Saisonlohn, als würden Sie das ganze Jahr so verdienen. Über einen Antrag auf Tarifkorrektur oder eine nachträgliche ordentliche Veranlagung bis zum 31. März des Folgejahres lässt sich die Belastung auf das tatsächliche Jahreseinkommen zurückführen.',
    },
  },
  AG: {
    practice:
      'Der Aargau ist der klassische Pendlerkanton der Deutschschweiz: Von Baden, Aarau oder Rheinfelden aus sind Zürich, Basel und Bern in kurzer Zeit erreichbar. Ein grosser Teil der quellensteuerpflichtigen Einwohner arbeitet deshalb ausserhalb — abgerechnet wird trotzdem nach dem Aargauer Tarif. Die Industrie im Fricktal und entlang der Limmat beschäftigt zudem viele Fachkräfte mit B-Bewilligung.',
    faq: {
      q: 'Muss mein ausserkantonaler Arbeitgeber den Aargauer Tarif anwenden?',
      a: 'Ja. Für die Quellensteuer ist Ihr Wohnkanton massgebend; der Arbeitgeber muss den Tarif dieses Kantons anwenden und die Steuer dorthin abliefern — unabhängig davon, wo sein Sitz liegt. Melden Sie ihm deshalb jeden Wohnsitzwechsel unverzüglich.',
    },
  },
  TG: {
    practice:
      'Der Thurgau reicht vom Bodensee bis ins Hinterland und ist zugleich Wohnkanton für den Raum Zürich und Grenzregion zu Deutschland — in Kreuzlingen verläuft die Grenze mitten durch den Siedlungsraum von Konstanz. Quellensteuerpflichtig sind hier sowohl Zuzüger mit B-Bewilligung als auch Personen, die aus Deutschland zugezogen sind und ihren Wohnsitz in die Schweiz verlegt haben. Für sie gelten die ordentlichen Tarife.',
    faq: {
      q: 'Ich bin von Konstanz nach Kreuzlingen gezogen — ändert sich meine Besteuerung?',
      a: 'Ja, grundlegend. Mit der Verlegung des Wohnsitzes in die Schweiz endet der Grenzgängerstatus; Sie werden neu nach den ordentlichen Thurgauer Quellensteuertarifen A/B/C/H besteuert. Ihr Arbeitgeber muss dafür die neue Wohnadresse und Bewilligungsart kennen.',
    },
  },
  TI: {
    practice:
      'Im Tessin arbeiten mehr Grenzgängerinnen und Grenzgänger als in jedem anderen Kanton — ganze Branchen im Sottoceneri sind darauf ausgerichtet. Für im Kanton wohnhafte Quellensteuerpflichtige gilt daneben das ordentliche Regime nach dem Jahresmodell. Die kantonale Verwaltung führt Merkblätter und Formulare auf Italienisch; Fristen und Rechtsmittel entsprechen jedoch der schweizweit einheitlichen Regelung.',
    faq: {
      q: 'Bis wann kann ich im Tessin eine Tarifkorrektur verlangen?',
      a: 'Bis zum 31. März des Folgejahres — diese Frist gilt gesamtschweizerisch und damit auch im Tessin. Sie ist eine Verwirkungsfrist: Nach ihrem Ablauf ist eine Korrektur der Quellensteuer für das betreffende Jahr grundsätzlich nicht mehr möglich.',
    },
  },
  VD: {
    practice:
      'Die Waadt vereint mit Lausanne, der EPFL und dem Genferseebogen einen international ausgerichteten Arbeitsmarkt: Forschung, Hochschulen und multinationale Unternehmen rekrutieren laufend aus dem Ausland. Viele dieser Anstellungen liegen über der Schwelle zur nachträglichen ordentlichen Veranlagung, sodass die Quellensteuer zur monatlichen Akontozahlung wird. Das Jahresmodell sorgt dabei für einen über die Monate stabilen Satz.',
    faq: {
      q: 'Kann ich in der Waadt Abzüge wie die Säule 3a geltend machen?',
      a: 'Nicht im Quellensteuertarif selbst — dieser enthält nur Pauschalabzüge. Effektive Abzüge wie Einzahlungen in die Säule 3a, Weiterbildungskosten oder Kinderbetreuung machen Sie über einen Antrag auf Tarifkorrektur oder über die nachträgliche ordentliche Veranlagung bis zum 31. März des Folgejahres geltend.',
    },
  },
  VS: {
    practice:
      'Das Wallis ist zweisprachig und stark saisonal geprägt: Im Oberwallis wie im Unterwallis entstehen in Hotellerie und Bergbahnen zahlreiche befristete Winter- und Sommerstellen. Weil der Kanton nach dem Jahresmodell rechnet, wird der Saisonlohn für die Satzbestimmung auf ein Jahr hochgerechnet — die Wirkung unterscheidet sich damit spürbar von saisonal geprägten Monatsmodell-Kantonen wie Graubünden.',
    faq: {
      q: 'Wie wird ein Saisonlohn im Walliser Jahresmodell behandelt?',
      a: 'Der Lohn wird für die Bestimmung des Steuersatzes auf ein volles Jahr hochgerechnet, der Satz danach auf den tatsächlich bezogenen Lohn angewendet. Das glättet die Belastung gegenüber einer reinen Monatsbetrachtung, ersetzt aber keine Tarifkorrektur, wenn effektive Abzüge geltend zu machen sind.',
    },
  },
  NE: {
    practice:
      'Neuenburg lebt von einer stark exportorientierten Präzisions- und Uhrenindustrie, die entlang des Jurabogens qualifizierte Fachkräfte aus dem grenznahen Frankreich rekrutiert. Für im Kanton wohnhafte Quellensteuerpflichtige gilt das ordentliche Regime nach dem Monatsmodell. Wegen des vergleichsweise hohen Steuerniveaus lohnt sich hier besonders die Prüfung, ob effektive Abzüge über eine Tarifkorrektur mehr bringen als die Pauschalen im Tarif.',
    faq: {
      q: 'Lohnt sich in Neuenburg eine nachträgliche ordentliche Veranlagung?',
      a: 'Oft ja, wenn Sie hohe effektive Abzüge haben — Säule 3a, Weiterbildung, Kinderbetreuung oder Unterhaltsbeiträge. Da der Neuenburger Tarif ein hohes Steuerniveau abbildet, wirken sich zusätzliche Abzüge in Franken entsprechend stark aus. Der Antrag ist bis zum 31. März des Folgejahres zu stellen.',
    },
  },
  GE: {
    practice:
      'Genf beherbergt zahlreiche internationale Organisationen und diplomatische Vertretungen — deren Angestellte sind aufgrund von Sitzabkommen häufig ganz oder teilweise von der schweizerischen Einkommenssteuer befreit und damit nicht quellensteuerpflichtig. Für alle übrigen ausländischen Arbeitnehmenden ohne Niederlassungsbewilligung C gelten dagegen die ordentlichen Tarife nach dem Jahresmodell, wie sie der Rechner oben abbildet.',
    faq: {
      q: 'Zahlen Angestellte internationaler Organisationen in Genf Quellensteuer?',
      a: 'In der Regel nicht: Sitzabkommen zwischen der Schweiz und den jeweiligen Organisationen sehen für deren Personal besondere steuerliche Privilegien vor. Massgebend ist der individuelle Status — Auskunft geben die Organisation selbst und die kantonale Steuerverwaltung. Für alle anderen Anstellungen gilt der ordentliche Tarif.',
    },
  },
  JU: {
    practice:
      'Der Jura ist der jüngste Kanton der Schweiz und wirtschaftlich eng mit dem benachbarten Frankreich und dem Berner Jura verflochten; Präzisionsindustrie und Zulieferbetriebe prägen den Arbeitsmarkt. Bei der Quellensteuer fällt der Kanton dadurch auf, dass der Tarif ausschliesslich in der Variante mit Kirchensteuer geführt wird — eine Wahlmöglichkeit besteht im Tarif nicht.',
    faq: {
      q: 'Kann ich mich im Jura von der Kirchensteuer im Quellensteuertarif befreien lassen?',
      a: 'Im Tarif selbst nicht — der Jura publiziert nur die Variante mit Kirchensteuer. Wer keiner anerkannten Landeskirche angehört, kann die Korrektur über einen Antrag auf Tarifkorrektur oder über die nachträgliche ordentliche Veranlagung bis zum 31. März des Folgejahres verlangen.',
    },
  },
};
