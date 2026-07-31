/**
 * French counterpart of cantonQstPractice.ts — the practical editorial layer
 * for /fr/calculateur-impot-source/[canton]/ (M16). Same canton-specific
 * substance, written for the French-speaking audience.
 */
import type { CantonQstPractice } from './cantonQstPractice';

export const CANTON_QST_PRACTICE_FR: Record<string, CantonQstPractice> = {
  ZH: {
    practice:
      'Le canton de Zurich traite plus de rapports d’imposition à la source que tout autre canton — de la place financière aux hautes écoles en passant par l’industrie de la Limmat et de la Glatt. La distinction entre canton de travail et canton de domicile est ici essentielle : une personne qui travaille en ville de Zurich mais habite dans le canton de Schwytz ou d’Argovie est décomptée selon le barème de son canton de domicile.',
    faq: {
      q: 'Je travaille à Zurich mais j’habite dans un autre canton — quel barème s’applique ?',
      a: 'En principe celui de votre canton de domicile. Votre employeur verse l’impôt à la source au canton où vous êtes domicilié ; les barèmes zurichois ne s’appliquent que si vous y êtes aussi domicilié. En cas de domicile à l’étranger (frontaliers, résidents à la semaine), c’est en revanche le canton du lieu de travail qui est compétent.',
    },
  },
  BE: {
    practice:
      'Berne est un canton étendu qui compte plus de trois cents communes — mais cela ne joue aucun rôle pour l’impôt à la source : le barème est uniforme à l’échelle cantonale et intègre une part communale forfaitaire. Une personne imposée à la source paie le même taux en ville de Berne que dans l’Oberland, alors que les coefficients d’impôt ordinaires diffèrent nettement. Un déménagement à l’intérieur du canton ne change donc rien à la retenue mensuelle.',
    faq: {
      q: 'Mon impôt à la source change-t-il si je déménage à l’intérieur du canton de Berne ?',
      a: 'Non. Le barème vaut pour tout le canton et contient une composante communale forfaitaire. Ce n’est qu’en cas de taxation ordinaire ultérieure que le coefficient réel de votre commune devient déterminant — un remboursement ou un rappel peut alors en résulter selon la commune.',
    },
  },
  LU: {
    practice:
      'À Lucerne, le tourisme, l’hôtellerie-restauration et la santé représentent une large part des emplois imposés à la source — souvent avec une autorisation de courte durée L ou des contrats à durée déterminée. En cas d’entrée en fonction en cours d’année, l’employeur retient l’impôt dès le premier salaire ; le total annuel peut ainsi s’écarter d’une approche annuelle. Une rectification du barème vaut donc la peine d’être examinée.',
    faq: {
      q: 'Je n’ai travaillé qu’une partie de l’année à Lucerne — ma retenue est-elle correcte ?',
      a: 'Dans le modèle mensuel, chaque mois est imposé séparément d’après le salaire du mois, sans tenir compte du nombre de mois travaillés au total. Cela conduit souvent à une retenue trop élevée en cas d’emploi partiel sur l’année. Une rectification du barème ou une taxation ordinaire ultérieure corrige cet effet.',
    },
  },
  UR: {
    practice:
      'Uri est un petit marché du travail avec peu de grands employeurs — les transports le long de l’axe du Gothard, la construction et l’industrie dominent les emplois imposés à la source. Comme beaucoup d’actifs font la navette vers les cantons voisins, le domicile reste déterminant : qui habite à Uri et travaille à Zoug ou à Lucerne bénéficie du barème uranais avantageux.',
    faq: {
      q: 'Est-il intéressant d’être domicilié à Uri en travaillant dans un canton voisin ?',
      a: 'Fiscalement oui, à condition d’y avoir un domicile réel : le décompte se fait selon le barème du canton de domicile, et Uri se situe nettement en dessous des cantons-centres. Le domicile doit toutefois être effectif — une simple résidence secondaire ne suffit pas.',
    },
  },
  SZ: {
    practice:
      'Schwytz vit pour une part importante de l’afflux venu de l’espace économique zurichois : de nombreux actifs travaillent au bord du lac de Zurich ou en ville et habitent à Wollerau, Freienbach ou Küssnacht. C’est déterminant pour l’impôt à la source, puisque le décompte suit le canton de domicile. Les écarts entre districts ne se répercutent en revanche pas sur le barème, qui est uniforme dans le canton.',
    faq: {
      q: 'Les communes schwytzoises avantageuses ont-elles leur propre barème à la source ?',
      a: 'Non. Le barème est uniforme dans le canton de Schwytz et contient une part communale forfaitaire. Les grands écarts entre coefficients communaux ne se manifestent qu’en cas de taxation ordinaire — par exemple à partir d’un salaire annuel brut de CHF 120\'000.',
    },
  },
  OW: {
    practice:
      'Obwald est petit mais économiquement varié : à côté de l’industrie d’Alpnach et de Sarnen, le tourisme autour d’Engelberg génère des emplois saisonniers avec autorisation de courte durée. Le barème cantonal uniforme rend la retenue mensuelle particulièrement prévisible d’un palier de salaire à l’autre — un atout pour les postes saisonniers dont le salaire varie entre haute et basse saison.',
    faq: {
      q: 'Que signifie le barème proportionnel obwaldien pour des salaires saisonniers variables ?',
      a: 'Comme la part cantonale est proportionnelle plutôt que fortement progressive, le taux global augmente moins brusquement lors d’un bon mois de saison que dans les cantons progressifs. La part fédérale reste toutefois progressive, de sorte que le taux continue de croître avec le salaire.',
    },
  },
  NW: {
    practice:
      'Nidwald combine un marché du travail spécialisé — aéronautique et industrie de précision autour de Stans — avec la proximité de Lucerne. Les personnes imposées à la source y sont souvent des spécialistes titulaires d’un permis B dont le salaire annuel s’approche du seuil de la taxation ordinaire ultérieure. Au-delà de ce seuil, une déclaration d’impôt est déposée et l’impôt à la source est imputé sur l’impôt définitif.',
    faq: {
      q: 'Que se passe-t-il si mon salaire à Nidwald dépasse CHF 120\'000 ?',
      a: 'Vous êtes alors taxé ordinairement de manière ultérieure : vous recevez une déclaration d’impôt, pouvez faire valoir toutes vos déductions, et l’impôt à la source déjà versé est imputé sur l’impôt définitif. La retenue mensuelle subsiste — elle devient simplement un acompte.',
    },
  },
  GL: {
    practice:
      'Depuis la fusion des communes, le canton de Glaris n’en compte plus que trois — l’une des configurations administratives les plus simples de Suisse. Les emplois imposés à la source se concentrent sur l’industrie du bas du canton ainsi que sur le tourisme du Sernftal et de Braunwald. Pour les nouveaux arrivants, la compétence est donc facile à établir : une administration fiscale cantonale, un barème.',
    faq: {
      q: 'À qui adresser une demande de rectification du barème dans le canton de Glaris ?',
      a: 'À l’administration fiscale cantonale à Glaris, et non à votre commune — l’impôt à la source est taxé au niveau cantonal. Le délai pour une rectification du barème comme pour une taxation ordinaire ultérieure court jusqu’au 31 mars de l’année suivante.',
    },
  },
  ZG: {
    practice:
      'À Zoug travaille une proportion exceptionnellement élevée de spécialistes recrutés à l’international — négoce de matières premières, pharma et technologie façonnent le marché du travail. Les salaires annuels dépassent donc souvent le seuil de la taxation ordinaire ultérieure, de sorte que l’impôt à la source n’est plus qu’un acompte. En cas de bonus, le mois de versement mérite attention, car le taux y augmente dans le modèle mensuel.',
    faq: {
      q: 'Quel est l’effet d’un bonus sur l’impôt à la source zougois ?',
      a: 'Dans le modèle mensuel, le bonus est rattaché au mois de versement, ce qui peut faire nettement monter le taux ce mois-là. L’effet se compense en partie sur l’année. Les personnes taxées ordinairement reçoivent de toute façon un décompte annuel — l’effet mensuel n’est alors qu’une question de trésorerie.',
    },
  },
  FR: {
    practice:
      'Fribourg est bilingue, et cela marque aussi la pratique en matière d’impôt à la source : formulaires et notices paraissent en français et en allemand, l’administration fiscale cantonale étant compétente dans les deux cas. L’université et les hautes écoles génèrent en outre de nombreux engagements temporaires. Comme Fribourg applique le modèle annuel, une entrée en fonction en cours d’année est traitée différemment que dans les cantons à modèle mensuel.',
    faq: {
      q: 'Je commence à travailler à Fribourg en cours d’année — comment le taux est-il fixé ?',
      a: 'Dans le modèle annuel, le salaire est extrapolé sur une année complète pour déterminer le taux. Celui-ci se fonde donc sur le revenu annuel extrapolé et non sur la somme des salaires mensuels effectivement perçus — le résultat peut différer de celui du modèle mensuel.',
    },
  },
  SO: {
    practice:
      'Soleure se situe dans l’aire d’attraction de plusieurs pôles économiques : Bâle au nord, Berne et Bienne à l’ouest, Olten comme nœud ferroviaire au centre. Beaucoup de personnes imposées à la source franchissent donc quotidiennement la frontière cantonale — le décompte suit néanmoins le barème soleurois dès que le domicile se trouve dans le canton.',
    faq: {
      q: 'J’habite à Soleure et travaille à Bâle — quel barème s’applique ?',
      a: 'Le barème soleurois, car c’est le canton de domicile qui est déterminant pour l’impôt à la source. Votre employeur bâlois retient l’impôt et le verse au canton de Soleure. Seul un domicile à l’étranger rendrait le canton du lieu de travail compétent.',
    },
  },
  BS: {
    practice:
      'Bâle-Ville possède sans doute le marché du travail le plus international de Suisse — les sciences de la vie recrutent dans le monde entier. À côté des frontaliers, les résidents à la semaine y jouent un rôle important : des personnes qui logent à Bâle en semaine et rentrent le week-end à leur domicile principal. Des règles de compétence particulières s’appliquent selon la configuration.',
    faq: {
      q: 'Je suis résident à la semaine à Bâle — où suis-je imposé ?',
      a: 'Cela dépend du lieu de votre domicile fiscal : si votre centre de vie est à l’étranger, l’imposition à la source a lieu au lieu de travail, à Bâle-Ville ; si ce centre est dans un autre canton, c’est le barème de ce canton qui s’applique. La délimitation dépend du cas d’espèce — l’administration fiscale cantonale renseigne de manière contraignante.',
    },
  },
  BL: {
    practice:
      'Bâle-Campagne est avant tout un canton de domicile pour l’espace économique bâlois : une grande partie des personnes imposées à la source y habite mais travaille en ville ou dans le pays voisin. C’est le domicile dans le canton qui compte pour le décompte, quel que soit le lieu de travail. Tout déménagement doit être annoncé sans délai à l’employeur afin que le barème change.',
    faq: {
      q: 'Je déménage de Bâle-Ville à Bâle-Campagne — que dois-je annoncer ?',
      a: 'Annoncez le déménagement immédiatement à votre employeur : c’est lui qui décompte l’impôt à la source et doit appliquer le barème de Bâle-Campagne dès le mois suivant. Une annonce tardive conduit à une retenue trop élevée ou trop faible — corrigeable par une rectification du barème jusqu’au 31 mars de l’année suivante.',
    },
  },
  SH: {
    practice:
      'Schaffhouse se trouve presque entièrement au nord du Rhin et est entouré sur trois côtés par l’Allemagne — aucun autre canton n’est aussi imbriqué avec la zone frontalière. L’industrie et la logistique y emploient de nombreux frontaliers, tandis que les personnes domiciliées dans le canton sont décomptées selon les barèmes ordinaires. La proximité de Zurich rend en outre Schaffhouse attractif pour les pendulaires.',
    faq: {
      q: 'Quelle différence entre un frontalier et un nouvel arrivant à Schaffhouse ?',
      a: 'Un frontalier conserve son domicile en Allemagne et fait la navette — les règles de la convention de double imposition s’appliquent à lui. Qui transfère son domicile en Suisse est en revanche imposé selon les barèmes ordinaires A/B/C/H, ceux que reproduit le calculateur ci-dessus.',
    },
  },
  AR: {
    practice:
      'Appenzell Rhodes-Extérieures est un canton de domicile typique : beaucoup d’actifs font la navette vers Saint-Gall, la vallée du Rhin ou Herisau. Comme le domicile est déterminant pour l’impôt à la source, ils bénéficient du barème appenzellois même si leur lieu de travail se situe ailleurs. Dans la santé et le social — parmi les plus gros employeurs du canton — les taux d’activité partiels sont fréquents, ce qui abaisse le salaire mensuel et donc le taux.',
    faq: {
      q: 'Quel est l’effet d’un temps partiel sur l’impôt à la source aux Rhodes-Extérieures ?',
      a: 'Le taux se fonde sur le salaire mensuel effectivement versé et non sur l’équivalent plein temps — un taux d’activité plus bas conduit donc à un taux d’impôt plus bas. En cas de plusieurs emplois à temps partiel simultanés, des règles spéciales s’appliquent : le revenu global est alors pris en compte pour déterminer le taux.',
    },
  },
  AI: {
    practice:
      'Appenzell Rhodes-Intérieures est le canton le moins peuplé de Suisse et son marché du travail est réduit — artisanat, tourisme et agriculture y dominent. Les rapports d’imposition à la source y sont donc plus rares qu’ailleurs, mais les démarches particulièrement directes : une seule administration fiscale cantonale traite rectifications et renseignements.',
    faq: {
      q: 'Le barème appenzellois s’applique-t-il aussi si je travaille hors du canton ?',
      a: 'Oui, tant que votre domicile se trouve à Appenzell Rhodes-Intérieures. L’employeur — même hors canton — doit décompter l’impôt à la source selon le barème de votre canton de domicile et le lui verser.',
    },
  },
  SG: {
    practice:
      'Saint-Gall borde le Liechtenstein et l’Autriche, ce qui marque fortement le marché du travail de la vallée du Rhin : de nombreux habitants travaillent au Liechtenstein et, inversement, beaucoup de Vorarlbergeois viennent travailler en Suisse. Ces configurations relèvent des conventions de double imposition correspondantes. Qui habite et travaille dans le canton est décompté selon les barèmes ordinaires reproduits ci-dessus.',
    faq: {
      q: 'J’habite à Saint-Gall et travaille au Liechtenstein — l’impôt à la source suisse s’applique-t-il ?',
      a: 'Pas sous cette forme. Une activité au Liechtenstein relève de la convention de double imposition CH–FL, avec ses propres règles d’attribution ; le revenu est en règle générale saisi au domicile suisse. Le calculateur ci-dessus couvre les barèmes cantonaux pour les emplois exercés en Suisse.',
    },
  },
  GR: {
    practice:
      'Peu de cantons sont aussi marqués par la saisonnalité que les Grisons : hôtellerie, restauration et remontées mécaniques créent chaque hiver des milliers d’emplois temporaires, souvent avec autorisation de courte durée L. Pour l’impôt à la source, cela signifie des salaires mensuels élevés durant quelques mois de saison, et rien entre deux. Comme le taux est déterminé mois par mois, la retenue de saison dépasse souvent ce que le revenu annuel justifierait.',
    faq: {
      q: 'Je ne travaille qu’une saison d’hiver aux Grisons — est-ce que je paie trop ?',
      a: 'Souvent oui. Le taux mensuel se fonde sur le salaire de saison, comme si vous gagniez cela toute l’année. Une demande de rectification du barème ou une taxation ordinaire ultérieure, jusqu’au 31 mars de l’année suivante, ramène la charge au revenu annuel effectif.',
    },
  },
  AG: {
    practice:
      'L’Argovie est le canton pendulaire classique de Suisse alémanique : depuis Baden, Aarau ou Rheinfelden, Zurich, Bâle et Berne sont rapidement accessibles. Une grande partie des personnes imposées à la source y habite mais travaille ailleurs — le décompte suit néanmoins le barème argovien. L’industrie du Fricktal et de la vallée de la Limmat emploie en outre de nombreux spécialistes titulaires d’un permis B.',
    faq: {
      q: 'Mon employeur hors canton doit-il appliquer le barème argovien ?',
      a: 'Oui. C’est votre canton de domicile qui est déterminant pour l’impôt à la source ; l’employeur doit appliquer le barème de ce canton et lui verser l’impôt, quel que soit son propre siège. Annoncez-lui donc immédiatement tout changement de domicile.',
    },
  },
  TG: {
    practice:
      'La Thurgovie s’étend du lac de Constance à l’arrière-pays et est à la fois canton de domicile pour la région zurichoise et région frontalière avec l’Allemagne — à Kreuzlingen, la frontière traverse le tissu urbain de Constance. Sont imposés à la source aussi bien les nouveaux arrivants avec permis B que les personnes venues d’Allemagne ayant transféré leur domicile en Suisse.',
    faq: {
      q: 'J’ai déménagé de Constance à Kreuzlingen — mon imposition change-t-elle ?',
      a: 'Oui, fondamentalement. Le transfert du domicile en Suisse met fin au statut de frontalier ; vous êtes désormais imposé selon les barèmes thurgoviens ordinaires A/B/C/H. Votre employeur doit pour cela connaître votre nouvelle adresse et votre type d’autorisation.',
    },
  },
  TI: {
    practice:
      'Le Tessin compte plus de frontaliers que tout autre canton — des branches entières du Sottoceneri sont organisées autour de cette réalité. Pour les personnes domiciliées dans le canton s’applique par ailleurs le régime ordinaire selon le modèle annuel. L’administration cantonale publie notices et formulaires en italien ; délais et voies de droit correspondent toutefois au régime uniforme suisse.',
    faq: {
      q: 'Jusqu’à quand puis-je demander une rectification du barème au Tessin ?',
      a: 'Jusqu’au 31 mars de l’année suivante — ce délai vaut pour toute la Suisse et donc aussi au Tessin. Il s’agit d’un délai de péremption : passé cette date, une correction de l’impôt à la source pour l’année concernée n’est en principe plus possible.',
    },
  },
  VD: {
    practice:
      'Avec Lausanne, l’EPFL et l’arc lémanique, Vaud réunit un marché du travail tourné vers l’international : recherche, hautes écoles et multinationales recrutent en permanence à l’étranger. Beaucoup de ces engagements dépassent le seuil de la taxation ordinaire ultérieure, de sorte que l’impôt à la source devient un acompte mensuel. Le modèle annuel assure par ailleurs un taux stable d’un mois à l’autre.',
    faq: {
      q: 'Puis-je faire valoir des déductions comme le 3e pilier dans le canton de Vaud ?',
      a: 'Pas dans le barème lui-même, qui ne contient que des déductions forfaitaires. Les déductions effectives — versements au 3e pilier, frais de formation continue, garde des enfants — se font valoir par une demande de rectification du barème ou par la taxation ordinaire ultérieure, jusqu’au 31 mars de l’année suivante.',
    },
  },
  VS: {
    practice:
      'Le Valais est bilingue et fortement saisonnier : dans le Haut comme dans le Bas-Valais, l’hôtellerie et les remontées mécaniques créent de nombreux postes temporaires d’hiver et d’été. Comme le canton applique le modèle annuel, le salaire de saison est extrapolé sur une année pour déterminer le taux — l’effet diffère donc nettement de celui des cantons saisonniers à modèle mensuel comme les Grisons.',
    faq: {
      q: 'Comment un salaire de saison est-il traité dans le modèle annuel valaisan ?',
      a: 'Le salaire est extrapolé sur une année complète pour fixer le taux, lequel est ensuite appliqué au salaire réellement perçu. Cela lisse la charge par rapport à une approche purement mensuelle, mais ne remplace pas une rectification du barème lorsque des déductions effectives doivent être invoquées.',
    },
  },
  NE: {
    practice:
      'Neuchâtel vit d’une industrie de précision et horlogère fortement exportatrice qui recrute, le long de l’arc jurassien, des spécialistes qualifiés venus de France voisine. Pour les personnes domiciliées dans le canton s’applique le régime ordinaire selon le modèle mensuel. Compte tenu du niveau d’imposition comparativement élevé, il vaut particulièrement la peine d’examiner si les déductions effectives rapportent davantage que les forfaits du barème.',
    faq: {
      q: 'Une taxation ordinaire ultérieure est-elle intéressante à Neuchâtel ?',
      a: 'Souvent oui, si vous avez des déductions effectives importantes — 3e pilier, formation continue, garde des enfants ou contributions d’entretien. Comme le barème neuchâtelois reflète un niveau d’imposition élevé, chaque déduction supplémentaire pèse d’autant plus en francs. La demande doit être déposée jusqu’au 31 mars de l’année suivante.',
    },
  },
  GE: {
    practice:
      'Genève accueille de nombreuses organisations internationales et représentations diplomatiques — leur personnel est souvent exonéré, totalement ou partiellement, de l’impôt suisse sur le revenu en vertu d’accords de siège, et n’est donc pas imposé à la source. Pour tous les autres salariés étrangers sans permis d’établissement C s’appliquent en revanche les barèmes ordinaires selon le modèle annuel, tels que reproduits ci-dessus.',
    faq: {
      q: 'Le personnel des organisations internationales paie-t-il l’impôt à la source à Genève ?',
      a: 'En règle générale non : les accords de siège entre la Suisse et ces organisations prévoient des privilèges fiscaux particuliers pour leur personnel. Le statut individuel est déterminant — l’organisation elle-même et l’administration fiscale cantonale renseignent. Pour tous les autres engagements, le barème ordinaire s’applique.',
    },
  },
  JU: {
    practice:
      'Le Jura est le plus jeune canton suisse et est économiquement très lié à la France voisine et au Jura bernois ; industrie de précision et sous-traitance façonnent le marché du travail. En matière d’impôt à la source, le canton se distingue en ce que le barème n’existe qu’avec impôt ecclésiastique — aucun choix n’est offert dans le barème lui-même.',
    faq: {
      q: 'Puis-je être exonéré de l’impôt ecclésiastique dans le barème jurassien ?',
      a: 'Pas dans le barème lui-même — le Jura ne publie que la variante avec impôt ecclésiastique. Qui n’appartient à aucune Église reconnue peut demander la correction par une rectification du barème ou par la taxation ordinaire ultérieure, jusqu’au 31 mars de l’année suivante.',
    },
  },
};
