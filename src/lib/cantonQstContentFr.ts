/**
 * French editorial for /fr/calculateur-impot-source/[canton]/ — a faithful
 * French rendering of the German QST canton texts (src/lib/cantonQstContent.ts),
 * preserving each canton's real withholding profile (anti-doorway, SEO_SPEC §3.2).
 */
export interface CantonQstEditorialFr {
  intro: string;
  faq: { q: string; a: string };
}

export const CANTON_QST_CONTENT_FR: Record<string, CantonQstEditorialFr> = {
  ZH: {
    intro:
      'Premier marché du travail et principale place pour expatriés de Suisse, Zurich compte particulièrement beaucoup de personnes imposées à la source. Le canton calcule selon le modèle mensuel : le salaire brut de chaque mois est déterminant. Les barèmes zurichois existent avec et sans impôt ecclésiastique — sans confession, choisissez la variante sans (N).',
    faq: {
      q: 'Quel est l’effet du 13e salaire sur l’impôt à la source à Zurich ?',
      a: 'Dans le modèle mensuel zurichois, le 13e salaire est ajouté au mois de son versement, ce qui augmente le taux ce mois-là. Sur l’année, cela s’équilibre en grande partie ; pour un décompte annuel exact, on peut demander une taxation ordinaire ultérieure.',
    },
  },
  BE: {
    intro:
      'Berne impose à la source selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. Comme l’un des huit cantons liés par la convention spéciale avec la France (barème SF), Berne connaît une règle particulière pour certains frontaliers. La charge se situe, comme l’impôt ordinaire, dans la fourchette plus élevée, car les barèmes d’impôt à la source incluent déjà l’impôt cantonal.',
    faq: {
      q: 'Que signifie la convention avec la France pour les frontaliers bernois ?',
      a: 'Pour les frontaliers de France relevant de la convention spéciale, l’impôt à la source suit le barème SF. Le calculateur ci-dessus couvre les barèmes ordinaires A/B/C/H ; en cas de statut de frontalier, ce sont les notices cantonales qui s’appliquent.',
    },
  },
  LU: {
    intro:
      'Lucerne associe un niveau d’imposition modéré au modèle mensuel pour l’impôt à la source. Comme les barèmes incluent déjà l’impôt cantonal et communal, la position plus avantageuse de Lucerne se traduit aussi par des taux d’impôt à la source plus bas que dans les cantons-centres chers. Les barèmes existent avec et sans impôt ecclésiastique.',
    faq: {
      q: 'L’impôt à la source à Lucerne est-il plus bas qu’à Zurich ou Berne ?',
      a: 'Plutôt oui : comme Lucerne est plus avantageux pour l’impôt ordinaire et que celui-ci entre dans le barème, les taux lucernois sont, à salaire comparable, généralement plus bas qu’en ville de Zurich ou dans le canton de Berne.',
    },
  },
  UR: {
    intro:
      'Uri compte parmi les cantons fiscalement les plus avantageux — et cela se voit aussi à l’impôt à la source, qui inclut déjà l’impôt cantonal et communal. Le canton calcule selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. Pour les personnes domiciliées dans le canton, l’impôt à la source reste donc comparativement modéré.',
    faq: {
      q: 'Les personnes imposées à la source à Uri profitent-elles du faible niveau d’imposition ?',
      a: 'Oui. Comme l’impôt cantonal et communal est inclus dans le barème, le faible niveau uranais se répercute directement sur la retenue mensuelle — à salaire brut égal, la charge est plus basse que dans la plupart des autres cantons.',
    },
  },
  SZ: {
    intro:
      'Schwytz figure parmi les cantons les plus avantageux et attire de nombreux contribuables aisés venus de la région de Zurich. Pour l’impôt à la source s’applique le modèle mensuel ; les barèmes incluent l’impôt cantonal et communal et existent avec et sans impôt ecclésiastique. Les taux schwytzois comptent ainsi parmi les plus bas de Suisse.',
    faq: {
      q: 'Pourquoi l’impôt à la source est-il si bas à Schwytz ?',
      a: 'Le barème reflète toute la charge de l’impôt sur le revenu — canton, commune et Confédération. Comme Schwytz est très avantageux pour l’impôt ordinaire, les taux d’impôt à la source sont, à salaire comparable, nettement plus bas qu’à Genève ou à Berne par exemple.',
    },
  },
  OW: {
    intro:
      'Obwald impose le revenu à un taux unique (« flat rate ») — cette structure avantageuse entre, via l’impôt ordinaire, dans les barèmes d’impôt à la source. Le canton calcule selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. La charge à la source est donc basse et comparativement régulière selon les revenus.',
    faq: {
      q: 'Le barème à taux unique d’Obwald influence-t-il l’impôt à la source ?',
      a: 'Indirectement oui : comme le barème cantonal à taux unique est bas et plat et entre dans le barème d’impôt à la source, celui-ci augmente moins fortement avec le salaire qu’à Obwald que dans les cantons fortement progressifs.',
    },
  },
  NW: {
    intro:
      'Nidwald conjugue la basse fiscalité de Suisse centrale et la proximité de Lucerne, ce qui en fait un canton de domicile attractif pour les cadres et spécialistes. Pour l’impôt à la source s’applique le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Comme l’impôt ordinaire, l’impôt à la source y est bas.',
    faq: {
      q: 'Nidwald vaut-il la peine comme domicile pour les spécialistes imposés à la source ?',
      a: 'Fiscalement oui : le faible impôt nidwaldien est inclus dans le barème, si bien que la retenue mensuelle est, à salaire égal, plus basse que dans la plupart des cantons — à courte distance du bassin économique de Lucerne.',
    },
  },
  GL: {
    intro:
      'Glaris calcule l’impôt à la source selon le modèle mensuel et propose les barèmes avec et sans impôt ecclésiastique. Le canton se situe dans le haut du milieu de tableau pour le niveau d’imposition, ce qui se traduit par des taux modérés. Pour les habitants du Pays glaronais et les pendulaires, la retenue mensuelle est ainsi bien prévisible.',
    faq: {
      q: 'Selon quel modèle l’impôt à la source est-il calculé dans le canton de Glaris ?',
      a: 'Selon le modèle mensuel : le salaire brut du mois est déterminant. Le barème inclut l’impôt cantonal, communal et fédéral ; Glaris publie tant la variante avec que sans impôt ecclésiastique.',
    },
  },
  ZG: {
    intro:
      'Zoug est le canton fiscalement le plus avantageux de Suisse et le siège de nombreuses entreprises internationales — d’où une forte proportion de spécialistes imposés à la source. Le canton calcule selon le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Les taux zougois comptent parmi les plus bas du pays, car le barème cantonal avantageux entre dans le barème d’impôt à la source.',
    faq: {
      q: 'Pourquoi les entreprises internationales s’installent-elles à Zoug pour l’impôt à la source ?',
      a: 'Ce n’est pas l’impôt à la source lui-même, mais le faible niveau général d’imposition qui est en cause — et comme celui-ci entre dans le barème, les salariés imposés à la source en profitent aussi : à salaire brut égal, la retenue mensuelle est plus basse qu’à peu près partout ailleurs.',
    },
  },
  FR: {
    intro:
      'Le canton bilingue de Fribourg calcule l’impôt à la source — contrairement à la plupart des cantons alémaniques — selon le modèle annuel : le taux se fonde sur le revenu annuel extrapolé, ce qui lisse le 13e salaire et les bonus sur l’année. Les barèmes existent avec et sans impôt ecclésiastique. Fribourg associe ainsi un modèle de calcul romand à une pratique administrative germanophone.',
    faq: {
      q: 'Que signifie le modèle annuel pour l’impôt à la source à Fribourg ?',
      a: 'Dans le modèle annuel, le revenu annuel probable est retenu pour la détermination du taux. Les salaires irréguliers, un 13e salaire ou des bonus ne provoquent donc pas de sauts de taux dans certains mois comme dans le modèle mensuel — la charge se répartit plus régulièrement.',
    },
  },
  SO: {
    intro:
      'Soleure impose à la source selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. Comme l’un des huit cantons liés par la convention spéciale avec la France (barème SF), une règle particulière s’applique à certains frontaliers. Pour les pendulaires vers les régions de Bâle et de Berne, Soleure est un compromis fiscal — cela se voit aussi à l’impôt à la source.',
    faq: {
      q: 'Un barème spécial s’applique-t-il aux frontaliers dans le canton de Soleure ?',
      a: 'Pour les frontaliers de France relevant de la convention spéciale s’applique le barème SF. Pour tous les autres salariés imposés à la source valent les barèmes ordinaires A/B/C/H, que le calculateur ci-dessus reproduit.',
    },
  },
  BS: {
    intro:
      'Avec son industrie pharmaceutique et des sciences de la vie, Bâle-Ville est un marché du travail international à forte proportion de spécialistes imposés à la source, dont beaucoup de frontaliers d’Allemagne et de France. Le canton calcule selon le modèle mensuel et fait partie des huit cantons liés par la convention spéciale avec la France (barème SF). Les barèmes existent avec et sans impôt ecclésiastique.',
    faq: {
      q: 'Comment les frontaliers vers Bâle-Ville sont-ils traités à l’impôt à la source ?',
      a: 'Pour les frontaliers d’Allemagne s’appliquent les barèmes de frontaliers, pour ceux de France la convention spéciale (barème SF). Qui habite et travaille dans le canton est imposé selon les barèmes ordinaires A/B/C/H — précisément ceux que calcule l’outil ci-dessus.',
    },
  },
  BL: {
    intro:
      'Bâle-Campagne partage le marché du travail trinational de la région bâloise et compte de nombreux frontaliers. Le canton calcule l’impôt à la source selon le modèle mensuel, publie les barèmes avec et sans impôt ecclésiastique et fait partie des huit cantons liés par la convention spéciale avec la France (barème SF). Pour les nouveaux venus du proche étranger, la retenue mensuelle est ainsi clairement réglée.',
    faq: {
      q: 'L’impôt à la source en Bâle-Campagne diffère-t-il de Bâle-Ville ?',
      a: 'Le modèle de calcul (mensuel) et la structure de base sont identiques, mais les taux diffèrent car Bâle-Campagne a ses propres barèmes cantonaux. Le calculateur ci-dessus utilise les barèmes de Bâle-Campagne ; pour la ville, choisissez le canton de Bâle-Ville.',
    },
  },
  SH: {
    intro:
      'Schaffhouse exploite activement sa situation frontalière avec l’Allemagne et emploie de nombreux frontaliers. Pour l’impôt à la source s’applique le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Le niveau d’imposition modéré de Schaffhouse — nettement sous la ville de Zurich — se reflète dans des taux comparativement avantageux.',
    faq: {
      q: 'L’impôt à la source à Schaffhouse est-il pertinent pour les frontaliers ?',
      a: 'Les frontaliers d’Allemagne sont traités selon les barèmes de frontaliers. Pour les personnes imposées à la source domiciliées dans le canton valent les barèmes ordinaires A/B/C/H — le niveau modéré de Schaffhouse y agit favorablement sur la retenue.',
    },
  },
  AR: {
    intro:
      'Appenzell Rhodes-Extérieures impose à la source selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. Canton de domicile avantageux de Suisse orientale — un cran sous Saint-Gall — les Rhodes-Extérieures offrent une retenue modérée aux pendulaires vers la région de Saint-Gall.',
    faq: {
      q: 'Pour qui l’impôt à la source aux Rhodes-Extérieures est-il pertinent ?',
      a: 'Pour les travailleurs étrangers sans permis d’établissement C domiciliés dans le canton. Comme les Rhodes-Extérieures imposent plus avantageusement que Saint-Gall et que cela figure dans le barème, la retenue mensuelle reste modérée.',
    },
  },
  AI: {
    intro:
      'Appenzell Rhodes-Intérieures est le plus petit et l’un des cantons fiscalement les plus avantageux de Suisse. Pour l’impôt à la source s’applique le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Comme le faible barème cantonal entre dans le barème d’impôt à la source, celui-ci compte parmi les plus bas du pays.',
    faq: {
      q: 'Quel est le niveau de l’impôt à la source aux Rhodes-Intérieures ?',
      a: 'Très bas en comparaison : comme les Rhodes-Intérieures comptent parmi les cantons les plus avantageux pour l’impôt ordinaire et que celui-ci entre dans le barème, la retenue mensuelle est, à salaire égal, sensiblement plus faible que dans les cantons-centres.',
    },
  },
  SG: {
    intro:
      'Saint-Gall, canton-centre de Suisse orientale, a un marché du travail large et donc une proportion notable de personnes imposées à la source. Le canton calcule selon le modèle mensuel et publie les barèmes avec et sans impôt ecclésiastique. Le niveau d’imposition se situe dans le milieu de tableau — au-dessus des deux Appenzell, mais sous les valeurs romandes.',
    faq: {
      q: 'Selon quel modèle Saint-Gall calcule-t-il l’impôt à la source ?',
      a: 'Selon le modèle mensuel : le salaire mensuel brut est déterminant. Le barème inclut l’impôt cantonal, communal et fédéral et existe avec et sans impôt ecclésiastique.',
    },
  },
  GR: {
    intro:
      'Les Grisons emploient dans le tourisme et la construction de nombreux travailleurs saisonniers et frontaliers — aussi d’Italie. Le canton calcule l’impôt à la source selon le modèle mensuel et est l’un des trois seuls cantons (avec le Tessin et le Valais) à connaître des barèmes particuliers pour les frontaliers d’Italie. Les barèmes ordinaires existent avec et sans impôt ecclésiastique.',
    faq: {
      q: 'Existe-t-il aux Grisons des barèmes particuliers pour les frontaliers d’Italie ?',
      a: 'Oui. Les Grisons publient — comme le Tessin et le Valais — des codes de barème supplémentaires pour les frontaliers d’Italie imposés selon l’accord frontalier CH-IT. Le calculateur ci-dessus couvre les barèmes ordinaires A/B/C/H.',
    },
  },
  AG: {
    intro:
      'L’Argovie, entre Zurich, Bâle, Berne et Lucerne, est un canton de domicile et de pendulaires prisé. Pour l’impôt à la source s’applique le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Le niveau d’imposition de milieu de tableau de l’Argovie se traduit par des taux modérés et bien prévisibles.',
    faq: {
      q: 'L’impôt à la source en Argovie est-il plus avantageux que dans les cantons voisins ?',
      a: 'Face aux cantons-centres que sont la ville de Zurich ou Bâle-Ville, en règle générale oui ; face à la Suisse centrale, non. Comme le barème inclut l’impôt cantonal, la charge argovienne se situe dans le même milieu de tableau que l’impôt ordinaire.',
    },
  },
  TG: {
    intro:
      'La Thurgovie, au bord du lac de Constance, attire des nouveaux venus de la région de Zurich et d’Allemagne et emploie des frontaliers. Pour l’impôt à la source s’applique le modèle mensuel, les barèmes existent avec et sans impôt ecclésiastique. Le niveau d’imposition avantageux de milieu de tableau assure des taux comparativement modérés.',
    faq: {
      q: 'Comment l’impôt à la source est-il réglé en Thurgovie pour les nouveaux venus d’Allemagne ?',
      a: 'Qui habite en Thurgovie et est imposé à la source relève des barèmes ordinaires A/B/C/H. Les frontaliers d’Allemagne relèvent des barèmes de frontaliers. Le niveau modéré thurgovien agit favorablement sur la retenue.',
    },
  },
  TI: {
    intro:
      'Le Tessin est le canton italophone avec une très forte proportion de frontaliers venus d’Italie. L’impôt à la source y est calculé selon le modèle annuel, et le Tessin publie — comme les Grisons et le Valais — des barèmes particuliers pour les frontaliers italiens. L’impôt ecclésiastique n’est pas prélevé à la source ; le barème ne connaît pas de variante confessionnelle.',
    faq: {
      q: 'Pourquoi l’impôt à la source au Tessin est-il si important pour les frontaliers ?',
      a: 'Parce que le Tessin a l’une des plus fortes proportions de frontaliers de Suisse. Pour les frontaliers d’Italie s’appliquent des barèmes particuliers selon l’accord frontalier CH-IT ; qui habite dans le canton est imposé selon les barèmes ordinaires A/B/C/H, selon le modèle annuel.',
    },
  },
  VD: {
    intro:
      'Le canton de Vaud, avec le centre de Lausanne, compte de nombreuses personnes imposées à la source et des frontaliers de France. Le canton calcule selon le modèle annuel et fait partie des huit cantons liés par la convention spéciale avec la France (barème SF). L’impôt ecclésiastique n’est pas prélevé à la source — le barème ne connaît pas de variante confessionnelle.',
    faq: {
      q: 'Selon quel modèle Vaud calcule-t-il l’impôt à la source ?',
      a: 'Selon le modèle annuel : le taux se fonde sur le revenu annuel extrapolé, ce qui lisse les salaires irréguliers et un 13e salaire. L’impôt ecclésiastique n’est pas inclus dans le barème vaudois d’impôt à la source.',
    },
  },
  VS: {
    intro:
      'Le Valais, canton touristique et frontalier, réunit plusieurs particularités : il calcule selon le modèle annuel, publie des barèmes particuliers pour les frontaliers d’Italie et fait en même temps partie des cantons liés par la convention spéciale avec la France (barème SF). L’impôt ecclésiastique n’est pas prélevé à la source.',
    faq: {
      q: 'Pourquoi l’impôt à la source en Valais est-il particulièrement complexe ?',
      a: 'Parce que le Valais se trouve à deux frontières linguistiques et nationales : il connaît à la fois des barèmes de frontaliers pour l’Italie et la convention spéciale avec la France. Qui habite dans le canton est imposé selon les barèmes ordinaires A/B/C/H, selon le modèle annuel ; le calculateur ci-dessus les reproduit.',
    },
  },
  NE: {
    intro:
      'Neuchâtel, dans l’Arc jurassien, compte parmi les cantons à forte fiscalité — ce qui, via l’impôt ordinaire, se répercute aussi sur l’impôt à la source. Le canton calcule selon le modèle mensuel et fait partie des huit cantons liés par la convention spéciale avec la France (barème SF). L’impôt ecclésiastique n’est pas prélevé à la source.',
    faq: {
      q: 'L’impôt à la source à Neuchâtel est-il supérieur à la moyenne suisse ?',
      a: 'Plutôt oui : comme Neuchâtel compte parmi les cantons les plus chers pour l’impôt ordinaire et que celui-ci est inclus dans le barème, la retenue mensuelle est, à salaire comparable, plus élevée que dans les cantons avantageux.',
    },
  },
  GE: {
    intro:
      'Genève a l’une des plus fortes proportions de personnes imposées à la source de Suisse — organisations internationales, forte part de frontaliers et d’étrangers marquent le marché du travail. Le canton calcule selon le modèle annuel, ce qui lisse les salaires irréguliers. L’impôt ecclésiastique n’est pas prélevé à la source ; le barème ne connaît pas de variante confessionnelle.',
    faq: {
      q: 'Pourquoi Genève calcule-t-il l’impôt à la source selon le modèle annuel ?',
      a: 'Le modèle annuel (usuel en Suisse romande) fonde le taux sur le revenu annuel extrapolé. Avec les nombreux emplois internationaux à bonus et salaires variables, cela évite des sauts de taux dans certains mois.',
    },
  },
  JU: {
    intro:
      'Le Jura est le seul canton dont le barème d’impôt à la source est exclusivement publié avec impôt ecclésiastique — une variante sans impôt ecclésiastique n’existe pas dans le barème. Le canton calcule selon le modèle mensuel et fait partie des huit cantons liés par la convention spéciale avec la France (barème SF). Le niveau d’imposition, comme pour l’impôt ordinaire, se situe dans le haut.',
    faq: {
      q: 'Pourquoi le Jura ne connaît-il pas de barème d’impôt à la source sans impôt ecclésiastique ?',
      a: 'Le canton du Jura ne publie les barèmes qu’avec impôt ecclésiastique (Y). Le calculateur ci-dessus utilise donc automatiquement ce barème pour le Jura ; l’impôt ecclésiastique est déjà compris dans le taux indiqué.',
    },
  },
};
