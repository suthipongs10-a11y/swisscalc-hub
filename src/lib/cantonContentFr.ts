/**
 * French editorial content for the /fr/calculateur-impots/[canton]/ pages —
 * a faithful French rendering of the German canton texts (src/lib/cantonContent.ts),
 * preserving each canton's individually-verified tax characteristics so the
 * pages satisfy the same SEO_SPEC §3.2 anti-doorway rules (no noun-swapped
 * sentence templates). Quantitative figures are injected by the page template
 * from the data files; `compare` and `portal` are reused from the German
 * editorial (language-neutral).
 */
export interface CantonEditorialFr {
  intro: string;
  faq: { q: string; a: string };
}

export const CANTON_CONTENT_FR: Record<string, CantonEditorialFr> = {
  ZH: {
    intro:
      'Le canton de Zurich impose le revenu selon un barème progressif par paliers, auquel le canton et les communes appliquent leurs coefficients. La ville de Zurich se situe nettement au-dessus des communes fortunées du bord du lac : entre la commune la moins chère et la plus chère du canton, l’écart atteint plusieurs dizaines de points de coefficient — pour les hauts revenus, le domicile au sein du canton représente des milliers de francs. Canton le plus peuplé et premier marché du travail de Suisse, Zurich reste fiscalement dans la moyenne : sensiblement plus cher que la Suisse centrale, mais meilleur marché que la Suisse romande.',
    faq: {
      q: 'Pourquoi les impôts sont-ils plus bas au bord du lac de Zurich qu’en ville de Zurich ?',
      a: 'Les communes à forte capacité contributive par habitant — comme Zumikon, Kilchberg ou Rüschlikon — se contentent de coefficients bas, car peu de ménages, mais à hauts revenus, portent l’essentiel des recettes. La ville de Zurich finance en revanche des prestations centrales et se situe donc nettement plus haut.',
    },
  },
  BE: {
    intro:
      'Berne compte parmi les cantons les plus chers pour l’impôt sur le revenu — et parmi ceux qui présentent le plus grand écart entre communes : plus de 300 communes bernoises appliquent des coefficients qui peuvent plus que doubler. Le barème cantonal lui-même est fortement progressif. Qui habite l’agglomération bernoise et se compare avec le canton voisin de Soleure, ou même avec la Suisse centrale, constate vite des différences à quatre chiffres par an pour des revenus moyens.',
    faq: {
      q: 'Quelle est l’ampleur des différences entre les communes bernoises ?',
      a: 'Considérable : la commune la moins chère affiche un coefficient inférieur à 90 %, la plus chère dépasse 200 %. Au sein du canton de Berne, un déménagement peut ainsi plus que diviser par deux l’impôt communal — le calculateur ci-dessus indique la charge au chef-lieu Berne.',
    },
  },
  LU: {
    intro:
      'Lucerne s’est hissé, au fil de plusieurs réformes fiscales, dans la moitié la plus avantageuse de Suisse ; c’est aujourd’hui le moyen le moins cher d’associer un « niveau fiscal de Suisse centrale » à un centre urbain d’une certaine taille. Le barème est modérément progressif, la ville de Lucerne se situe au-dessus de la moyenne cantonale, de nombreuses communes d’agglomération en dessous. Face aux voisins Zoug et Schwytz, l’écart reste net — mais par rapport à Berne ou Zurich, une adresse lucernoise fait économiser sensiblement.',
    faq: {
      q: 'Lucerne est-il comparable à Zoug sur le plan fiscal ?',
      a: 'Non — Zoug reste dans une catégorie à part. Lucerne se positionne toutefois comme le « grand » centre le moins cher de Suisse centrale : plus bas que Zurich, Berne ou Bâle, tout en restant clairement au-dessus de Zoug, Schwytz et Nidwald.',
    },
  },
  UR: {
    intro:
      'Uri est l’un des deux seuls cantons à renoncer à un barème progressif : le revenu imposable est frappé d’un taux proportionnel unique (« flat rate »), auquel le canton et les communes appliquent leurs coefficients. Le calcul en devient exceptionnellement transparent — et attractif pour les hauts revenus, car le taux marginal n’augmente pas. Combiné à un faible coût de la vie, Uri figure régulièrement parmi les cantons les moins chers en dehors des places fiscales connues.',
    faq: {
      q: 'Que signifie concrètement le barème à taux unique d’Uri ?',
      a: 'Chaque franc de revenu imposable est frappé de la même façon — il n’y a pas de paliers de progression. Votre taux moyen d’imposition correspond ainsi à votre taux marginal. À Uri, l’impôt croît donc de façon linéaire avec le revenu, et non de manière plus que proportionnelle.',
    },
  },
  SZ: {
    intro:
      'Schwytz est depuis des décennies l’une des premières adresses pour de faibles impôts sur le revenu et se classe régulièrement juste derrière Zoug. Une particularité : pour l’impôt communal s’applique un barème communal officiel distinct — notre calculateur l’utilise exactement tel que l’AFC le publie. Entre les communes fiscalement avantageuses du haut du lac de Zurich et les autres vallées, les différences sont importantes ; le chef-lieu Schwytz lui-même ne fait pas partie des coins les moins chers du canton.',
    faq: {
      q: 'Pourquoi le canton de Schwytz calcule-t-il avec un barème communal séparé ?',
      a: 'Dans le système schwytzois, l’impôt communal n’est pas simplement prélevé comme un pourcentage de l’impôt cantonal, mais via une courbe de barème propre, à laquelle le coefficient communal est appliqué. Notre calculateur reproduit exactement cette structure officielle — que beaucoup de calculateurs simples ignorent.',
    },
  },
  OW: {
    intro:
      'Obwald a été le pionnier de l’impôt à taux unique en Suisse : au lieu d’un barème progressif s’applique un taux proportionnel uniforme de 1.8 % comme impôt simple, multiplié par les coefficients du canton et de la commune. Cette simplification radicale a fait du petit canton de Suisse centrale, du jour au lendemain, l’une des places fiscales les moins chères du pays — en particulier pour les hauts revenus, dont le taux marginal n’augmente pas ici.',
    faq: {
      q: 'Pour qui le barème à taux unique d’Obwald est-il le plus avantageux ?',
      a: 'Plus le revenu est élevé, plus l’avantage est grand par rapport aux cantons progressifs : alors qu’ailleurs le taux marginal augmente avec le revenu, il reste constant à Obwald. Pour les faibles revenus, l’effet se relativise, car les barèmes progressifs y pèsent de toute façon peu.',
    },
  },
  NW: {
    intro:
      'Nidwald conjugue la politique de basse fiscalité de Suisse centrale et la proximité immédiate de Lucerne : qui habite la région de Stans et travaille en ville combine de courts trajets et une charge fiscale qui figure régulièrement parmi les cinq cantons les moins chers. Le barème est plat, les différences entre les onze communes comparativement faibles — contrairement à Berne ou Zurich, le choix de la commune ne joue ici qu’un rôle secondaire.',
    faq: {
      q: 'Quelle est l’ampleur des différences entre les communes de Nidwald ?',
      a: 'Faible — l’éventail des coefficients communaux est l’un des plus resserrés de Suisse. Le choix du domicile à l’intérieur de Nidwald ne modifie que légèrement le calcul de l’impôt ; c’est le franchissement de la frontière cantonale qui est déterminant.',
    },
  },
  GL: {
    intro:
      'Glaris passe fiscalement sous le radar : aucun marketing de basse fiscalité, mais une position solide dans le haut du milieu de tableau — nettement moins cher que les grands centres, sans les valeurs extrêmes de la Suisse centrale. Depuis la fusion historique de ses communes, le canton n’en compte plus que trois, d’où un paysage fiscal très clair. Pour les pendulaires vers le Pays glaronais ou vers Zurich, la comparaison avec les voisins peut valoir la peine.',
    faq: {
      q: 'Combien de communes compte le canton de Glaris ?',
      a: 'Trois seulement : Glaris, Glaris Nord et Glaris Sud — le résultat de la fusion communale la plus radicale de Suisse. Les différences de coefficient entre elles sont donc minimes, ce qui simplifie fortement le choix du domicile au sein du canton.',
    },
  },
  ZG: {
    intro:
      'Zoug est la référence absolue en matière d’impôt suisse sur le revenu : dans pratiquement toutes les comparaisons — y compris notre classement des 26 chefs-lieux — le canton occupe la première place. Cela tient à un barème volontairement plat, à des tranches généreuses et à des coefficients communaux qui, même au point le plus cher du canton, restent inférieurs à ce que réclame ailleurs la commune la moins chère. Le revers : les coûts du logement les plus élevés de Suisse — l’économie d’impôt est de fait redistribuée dans le loyer.',
    faq: {
      q: 'Un déménagement à Zoug vaut-il la peine malgré les loyers élevés ?',
      a: 'C’est un calcul : l’économie d’impôt annuelle par rapport à votre domicile actuel (calculateur ci-dessus) doit dépasser le surcoût de loyer ou de prix d’achat. Pour les hauts revenus, l’équation est souvent favorable ; pour les revenus moyens, souvent non — précisément parce que les coûts du logement zougois capitalisent en partie l’avantage fiscal.',
    },
  },
  FR: {
    intro:
      'Le canton bilingue de Fribourg calcule avec une particularité : le barème définit directement, pour chaque niveau de revenu, un taux d’imposition effectif interpolé linéairement entre les paliers — une courbe continue plutôt que des paliers de progression distincts. Au final, Fribourg se situe dans le tiers le plus cher de Suisse, nettement au-dessus du niveau du Plateau bernois voisin pour les hauts revenus, mais avec des éléments favorables aux familles dans la structure du barème.',
    faq: {
      q: 'Que signifie « barème interpolé » dans le canton de Fribourg ?',
      a: 'Le barème fribourgeois fixe des taux à des points d’appui (par exemple à 10\'000, 20\'000, 30\'000 francs) et calcule le taux entre eux de façon linéaire. Votre taux effectif croît ainsi en continu avec le revenu — il n’y a pas de sauts aux limites des paliers.',
    },
  },
  SO: {
    intro:
      'Soleure se situe entre deux mondes fiscaux : moins cher que le canton voisin de Berne, plus cher que l’Argovie, avec lequel il rivalise pour attirer les nouveaux venus des régions de Zurich et de Bâle. Le barème cantonal est classiquement progressif ; les coefficients communaux sont très dispersés, si bien qu’à l’intérieur du canton un examen attentif est payant. Pour les pendulaires vers Bâle ou Berne, Soleure est souvent le compromis entre des coûts du logement abordables et une charge fiscale supportable.',
    faq: {
      q: 'Soleure est-il attractif pour les pendulaires vers Bâle ?',
      a: 'Souvent oui : la charge fiscale est inférieure à celle de Bâle-Ville, les coûts du logement aussi — en contrepartie s’ajoutent le temps et les frais de trajet. Comparez vos chiffres concrets avec le calculateur ci-dessus et le comparatif cantonal.',
    },
  },
  BS: {
    intro:
      'Bâle-Ville est le cas particulier parmi les cantons : trois communes seulement — Bâle, Riehen et Bettingen — forment le plus petit canton de Suisse, et la ville de Bâle assume une large part de ce que financent ailleurs les impôts communaux. La part cantonale de la facture fiscale est donc élevée. Dans la comparaison nationale, Bâle-Ville figure parmi les places les plus chères pour l’impôt sur le revenu ; les deux communes campagnardes de Riehen et Bettingen sont sensiblement meilleur marché que la ville-centre.',
    faq: {
      q: 'Au sein de Bâle-Ville, vaut-il la peine de s’installer à Riehen ou Bettingen ?',
      a: 'Fiscalement oui : les deux communes campagnardes prélèvent des impôts communaux nettement plus bas que la ville de Bâle. Comme le canton ne compte que trois communes, c’est aussi le seul levier — seul un passage à Bâle-Campagne ou à Soleure produit de plus grands effets.',
    },
  },
  BL: {
    intro:
      'Bâle-Campagne est le seul canton à calculer l’impôt sur le revenu au moyen d’une formule mathématique à logarithme plutôt qu’au moyen d’un tableau à paliers — la progression est ainsi parfaitement continue. Pour les contribuables, cela signifie : pas de sauts de barème, mais aussi un calcul qui se laisse difficilement reproduire à la main. Notre calculateur évalue exactement la formule officielle. Au classement, le Bâle-Campagne se situe dans le tiers le plus cher, tout en restant meilleur marché que la ville-centre de Bâle.',
    faq: {
      q: 'Comment fonctionne la formule fiscale de Bâle-Campagne ?',
      a: 'Le barème définit l’impôt dû comme une fonction continue du revenu (avec un terme logarithmique) — publiée par l’AFC comme formule officielle, que notre calculateur évalue telle quelle. Avantage : la charge marginale augmente en continu, sans les effets de seuil des barèmes à paliers classiques.',
    },
  },
  SH: {
    intro:
      'Schaffhouse exploite activement sa position frontalière : le canton le plus au nord se positionne depuis des années, avec une fiscalité modérée des entreprises et des revenus, face au voisinage coûteux de Zurich — et comme alternative pour les nouveaux venus d’Allemagne. La charge se situe dans un solide milieu de tableau, nettement en dessous du niveau de la ville de Zurich. À l’intérieur de ce canton compact, les coefficients communaux ne varient que modérément, et le chef-lieu est un bon repère pour toute la région.',
    faq: {
      q: 'Schaffhouse est-il meilleur marché que Zurich ?',
      a: 'À revenus comparables, en règle générale oui — surtout par rapport à la ville de Zurich, la facture penche le plus souvent en faveur de Schaffhouse. Face aux communes zurichoises avantageuses du bord du lac, l’avance se réduit. Le comparatif cantonal montre votre différence concrète.',
    },
  },
  AR: {
    intro:
      'Appenzell Rhodes-Extérieures offre des conditions fiscales de Suisse orientale un cran en dessous de Saint-Gall : le barème est de construction simple, la charge se situe dans le milieu de tableau avantageux, et avec Herisau le chef-lieu est en même temps le centre économique. Qui travaille dans la région de Saint-Gall trouve souvent aux Rhodes-Extérieures l’adresse de domicile fiscalement plus attractive — même si Appenzell Rhodes-Intérieures est encore nettement plus bas.',
    faq: {
      q: 'Rhodes-Extérieures ou Rhodes-Intérieures — où paie-t-on moins ?',
      a: 'Appenzell Rhodes-Intérieures est clairement meilleur marché et joue dans la catégorie de Zoug et Schwytz. Les Rhodes-Extérieures restent toutefois attractives pour les pendulaires vers Saint-Gall : mieux desservies, offre de logement plus large et toujours meilleur marché que le canton de Saint-Gall lui-même.',
    },
  },
  AI: {
    intro:
      'Appenzell Rhodes-Intérieures est le plus petit canton de Suisse — et l’un des moins chers : pour les revenus moyens et élevés, le demi-canton se mêle régulièrement au groupe de tête avec Zoug, Schwytz et Nidwald. Cinq districts seulement (l’équivalent intérieur des communes) se partagent le paysage fiscal, et les différences entre eux sont modérées. S’y ajoute une administration de proximité, comme seul peut l’offrir un canton d’un peu plus de 16 000 habitants.',
    faq: {
      q: 'Comment un canton aussi petit peut-il se permettre des impôts aussi bas ?',
      a: 'Des structures légères, de faibles charges de centre et une stratégie de site délibérée : Rhodes-Intérieures ne finance aucune infrastructure de grande ville et maintient barème et coefficients constamment bas, afin d’attirer habitants et entreprises — ce qui élargit à son tour l’assiette fiscale.',
    },
  },
  SG: {
    intro:
      'Saint-Gall, canton-centre de Suisse orientale, porte les charges typiques d’un grand bassin de population — et se situe fiscalement dans le milieu de tableau, sensiblement au-dessus des deux Appenzell, mais en dessous des valeurs romandes. Le barème est progressif, l’éventail des coefficients communaux considérable : du lac de Constance au Sarganserland, la charge varie nettement. Pour beaucoup, la ville de Saint-Gall reste le point de référence — c’est exactement pour elle que calcule notre outil.',
    faq: {
      q: 'Où est-ce le moins cher dans le canton de Saint-Gall ?',
      a: 'Traditionnellement dans les communes à forte capacité contributive autour du haut du lac de Zurich et dans la région de Rapperswil-Jona ; en haut de l’échelle se trouvent des communes périphériques à faible capacité contributive. La différence peut valoir plusieurs semaines de vacances — comparez le chef-lieu ci-dessus avec la commune de votre choix.',
    },
  },
  GR: {
    intro:
      'Les Grisons, canton le plus étendu, présentent l’un des paysages fiscaux les plus variés : une centaine de communes, de Coire aux hauts lieux touristiques, appliquent des coefficients très différents. Dans l’ensemble, le canton s’est déplacé, à coups de réformes, vers la moitié la plus avantageuse de Suisse ; certaines communes touristiques à forte capacité contributive de l’Engadine passent nettement sous le chef-lieu. Le calcul ci-dessus vaut pour Coire — comme base de comparaison avec votre commune cible.',
    faq: {
      q: 'Les stations touristiques comme Saint-Moritz sont-elles fiscalement chères ?',
      a: 'Souvent au contraire : les communes touristiques à forte capacité contributive peuvent se permettre de faibles coefficients. En revanche, le logement et le coût de la vie y sont nettement plus chers — la facture globale logement + impôts varie fortement selon le revenu.',
    },
  },
  AG: {
    intro:
      'L’Argovie vit fiscalement de sa position entre Zurich, Bâle, Berne et Lucerne : une charge solide de milieu de tableau, mais une concurrence directe avec quatre grandes régions — ce qui discipline les coefficients communaux. Pour les pendulaires vers les centres environnants, le canton compte parmi les lieux de domicile les plus prisés de Suisse, précisément parce que la combinaison charge fiscale et coûts du logement s’en tire souvent mieux que dans les cantons-centres eux-mêmes.',
    faq: {
      q: 'L’Argovie est-elle vraiment meilleur marché que Zurich ?',
      a: 'Pour la plupart des configurations, oui — tant pour le barème que pour les coefficients communaux typiques. L’écart est toutefois plus faible qu’avec la Suisse centrale. La comparaison concrète entre communes reste déterminante, car les deux cantons sont très dispersés en interne.',
    },
  },
  TG: {
    intro:
      'La Thurgovie se tient à l’écart des gros titres fiscaux, et s’en trouve bien : charge dans le milieu de tableau avantageux, dispersion modérée entre communes et coefficients stables au fil des ans. Pour les nouveaux venus de la région de Zurich ou d’Allemagne (proximité de Constance), le canton du lac de Constance offre un environnement fiscal serein et prévisible — plus cher que la Suisse centrale, mais fiablement meilleur marché que les cantons-centres.',
    faq: {
      q: 'Comment la Thurgovie se compare-t-elle à Zurich et Saint-Gall ?',
      a: 'Face aux deux, le plus souvent avantageusement : le barème thurgovien et les coefficients typiques se situent en dessous du niveau de la ville de Zurich et légèrement en dessous des valeurs saint-galloises. Le calculateur ci-dessus et le comparatif cantonal montrent la différence pour votre revenu.',
    },
  },
  TI: {
    intro:
      'Le Tessin calcule selon son propre modèle : le canton italophone combine un barème fortement progressif et des franchises comparativement élevées dans le bas de l’échelle — les faibles revenus s’en tirent bien, les hauts paient des suppléments dans la comparaison nationale. Entre Lugano, Bellinzone et les communes de vallée, les coefficients communaux sont très dispersés. Le calcul ci-dessus vaut pour le chef-lieu Bellinzone.',
    faq: {
      q: 'Pour qui le Tessin est-il fiscalement attractif ?',
      a: 'Plutôt pour les revenus faibles à moyens, qui profitent des franchises d’entrée élevées. Pour les hauts revenus, le Tessin compte parmi les cantons les plus chers — qui dispose de flexibilité compare avec la Suisse centrale ou les Grisons.',
    },
  },
  VD: {
    intro:
      'Vaud compte parmi les cantons fiscalement les plus chers de Suisse — et parmi les rares dotés d’un système de quotient familial : les couples mariés et les familles divisent leur revenu, pour la détermination du taux, par un diviseur, ce qui atténue sensiblement la progression pour les familles. Les célibataires à bon revenu supportent en revanche l’une des charges les plus élevées du pays. Lausanne, comme chef-lieu, se situe en outre au-dessus de la moyenne cantonale.',
    faq: {
      q: 'Qu’apporte le quotient familial vaudois ?',
      a: 'Pour la détermination du taux, le revenu est divisé par un quotient (couples mariés 1.8, plus des suppléments par enfant), le taux étant ensuite appliqué au revenu entier. Les familles paient ainsi nettement moins que les célibataires à revenu de ménage égal — l’effet est plus marqué que le barème pour personnes mariées de nombreux cantons alémaniques.',
    },
  },
  VS: {
    intro:
      'Le Valais impose à deux niveaux, avec une particularité que beaucoup de calculateurs reproduisent mal : le canton et les communes utilisent des courbes de barème officielles distinctes — la courbe communale est plus plate et plafonne plus tôt. Notre calculateur utilise les deux courbes exactement selon les données de l’AFC. Sur la base du revenu imposable, le Valais figure parmi les cantons les plus chers ; cela est en partie compensé par des déductions généreuses qui abaissent le revenu imposable.',
    faq: {
      q: 'Pourquoi les taux valaisans paraissent-ils élevés alors que la charge effective ne l’est souvent pas ?',
      a: 'Parce que le Valais pilote beaucoup par les déductions : déductions pour enfants, d’assurance et autres réduisent le revenu imposable plus fortement que dans bien d’autres cantons. Sur le revenu imposable restant, les barèmes sont alors comparativement élevés — c’est précisément cette base que calcule notre comparatif.',
    },
  },
  NE: {
    intro:
      'Neuchâtel traîne depuis des années l’étiquette de canton à forte fiscalité et lutte contre elle par des baisses de barème graduelles. Le canton de l’Arc jurassien reste néanmoins dans le groupe de tête de la charge pour l’impôt sur le revenu — en particulier pour les revenus moyens et élevés. Entre les communes, les différences sont comparativement faibles, si bien qu’il reste, à l’intérieur du canton, peu de marge d’optimisation.',
    faq: {
      q: 'Pourquoi les impôts sont-ils si élevés à Neuchâtel ?',
      a: 'Une assiette fiscale étroite, les charges du changement structurel industriel et des dépenses sociales élevées frappent un petit canton — ce qui maintient barème et coefficients en haut. Les réformes en cours abaissent la charge par étapes, mais le retard sur le milieu de tableau subsiste pour l’instant.',
    },
  },
  GE: {
    intro:
      'Genève calcule à la française : à l’impôt cantonal de base s’ajoutent les centimes additionnels du canton et de la commune — des suppléments prélevés en pourcentage de l’impôt de base. En outre, un splitting atténue la progression pour les couples mariés. Dans l’ensemble, Genève compte, pour les célibataires à hauts revenus, parmi les lieux les plus chers de Suisse ; les suppléments communaux sont en revanche modérés dans la comparaison nationale, car le canton prélève la part du lion.',
    faq: {
      q: 'Que sont les centimes additionnels genevois ?',
      a: 'Des suppléments à l’impôt cantonal de base : le canton prélève des centimes supplémentaires par franc d’impôt de base, les communes également — Cologny nettement moins qu’Avully, par exemple. Notre calculateur reproduit ce système via les coefficients officiels de l’AFC.',
    },
  },
  JU: {
    intro:
      'Le Jura est le plus jeune canton de Suisse — et l’un des plus chers pour l’impôt sur le revenu : des barèmes élevés et des coefficients communaux élevés s’additionnent en une charge que seul Neuchâtel dépasse régulièrement. Une particularité structurelle : le canton applique des barèmes distincts pour les célibataires, les personnes mariées et les familles monoparentales, au lieu de travailler avec un splitting. Delémont, comme chef-lieu, est représentatif du niveau cantonal.',
    faq: {
      q: 'Existe-t-il des communes avantageuses dans le Jura ?',
      a: 'La dispersion existe, mais le niveau de départ est élevé : même les communes jurassiennes avantageuses se situent au-dessus de ce qui est usuel dans les cantons du Plateau. Qui veut optimiser fiscalement compare donc plutôt avec les cantons voisins de Berne, Soleure ou Bâle-Campagne.',
    },
  },
};
