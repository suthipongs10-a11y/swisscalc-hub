# ESTV data-use consent request (ready to send)

**Status:** FINAL — calcswiss.ch is live with an Impressum, so the request can go out. Before sending, replace the three bracketed fields with the exact controller identity shown in the site's Impressum.
**Fill in before sending:** `[NAME]`, `[ADRESSE]` (Strasse + PLZ Ort), `[E-MAIL]` — must match the Impressum on calcswiss.ch. Also set `[ORT]` and `[DATUM]` in the letterhead.

**Send to** (postal, most credible for a formal consent request):

```
Eidgenössische Steuerverwaltung ESTV
Abteilung Steuerstatistik / Steuerrechner (swisstaxcalculator)
Eigerstrasse 65
3003 Bern
```

Or by e-mail to **info@estv.admin.ch**, or via the contact form at https://www.estv.admin.ch (subject: *Steuerrechner / swisstaxcalculator — Steuerstatistik*). We could not confirm a division-specific mailbox from the build sandbox (admin.ch is unreachable through the egress proxy); the general channel above is the safe route — if they reply from a specific desk, continue the thread there. CC nothing; keep it a simple direct request.

Context (see RESEARCH.md §4.4): the data is likely not copyright-protected (URG Art. 5) and EMBAG points toward open-by-default, so this letter asks for *confirmation/consent* politely — it should read as diligence, not as asking permission to exist. If no reply arrives within ~4 weeks, proceed under the derived-parameters + attribution posture already defined in CLAUDE.md and note the sent request in STATUS.md.

---

## Letter (German — Swiss Standard German, no ß)

```
[NAME]
[ADRESSE]

Eidgenössische Steuerverwaltung ESTV
Abteilung Steuerstatistik / Steuerrechner (swisstaxcalculator)
Eigerstrasse 65
3003 Bern

[ORT], [DATUM]


Betreff: Anfrage zur Weiterverwendung von Berechnungsparametern aus dem
ESTV-Steuerrechner (swisstaxcalculator.estv.admin.ch)

Sehr geehrte Damen und Herren

Ich betreibe die Website calcswiss.ch, ein kostenloses, werbe- und cookiefreies
Informationsangebot mit Steuer- und Finanzrechnern fuer die Schweiz
(Impressum: [NAME], [ADRESSE]).

Fuer die Berechnungen moechte ich abgeleitete Parameter (Tarifstufen,
Steuerfuesse, Abzuege) verwenden, wie sie ueber den Steuerrechner der ESTV
(swisstaxcalculator.estv.admin.ch) publiziert werden. Konkret:

- Wir uebernehmen keine vollstaendigen Datenexporte und spiegeln Ihre
  Datensaetze nicht; gespeichert werden einzelne Berechnungsparameter,
  jeweils mit Quellenangabe und Abrufdatum.
- Die ESTV wird auf jeder Seite, die diese Daten nutzt, prominent als Quelle
  genannt und verlinkt.
- Die Berechnungen dienen ausschliesslich der unverbindlichen Information;
  auf den massgeblichen Charakter der offiziellen Veranlagung wird
  ausdruecklich hingewiesen.

Da die Nutzungsbedingungen von admin.ch fuer eine Weiterverwendung eine
schriftliche Zustimmung vorsehen, bitte ich Sie hoeflich um eine kurze
Bestaetigung, dass diese Nutzung in der beschriebenen Form zulaessig ist —
oder um einen Hinweis, welche Bedingungen Sie daran knuepfen moechten.

Fuer Rueckfragen stehe ich gerne zur Verfuegung. Besten Dank fuer Ihre Zeit
und freundliche Gruesse

[NAME]
calcswiss.ch — [E-MAIL]
```

> Note on umlauts: the block above spells umlauts out (ae/oe/ue) only so this
> plain-text file stays portable. In the letter you actually send, use the
> proper characters — ä ö ü — e.g. "Steuerfüsse", "Abzüge", "höflich". Never
> use ß (Swiss Standard German always uses ss).

---

## After sending

1. Log the date sent in `STATUS.md` (pending decisions section).
2. Reply arrives → store it in `docs/` (PDF/text), update CLAUDE.md licensing posture if conditions attached.
3. No reply after ~4 weeks → proceed per existing posture; re-check at the EMBAG milestone (~Jan 2027).
