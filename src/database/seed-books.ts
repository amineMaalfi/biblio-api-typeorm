export type SeedBookRow = {
  title: string;
  author: string;
  priceDh: number;
  category: string;
  stock: number;
  rating: number;
  imageUrl: string;
  summary: string;
};

/** Initial catalog migrated from the former in-app mock data. */
export const SEED_BOOKS: SeedBookRow[] = [
  {
    title: 'Dracula',
    author: 'Bram Stoker',
    priceDh: 50,
    category: 'Horreur',
    stock: 5,
    rating: 4,
    imageUrl:
      'https://www.babelio.com/couv/CVT_Dracula-Les-origines_6871.jpg',
    summary:
      "Plongez dans l'atmosphère gothique de la Transylvanie avec le récit de Jonathan Harker. Ce chef-d'œuvre relate la lutte épique entre le mystérieux Comte Dracula, un vampire ancestral assoiffé de conquête, et un groupe de courageux défenseurs menés par Van Helsing. Une exploration fascinante des limites entre la vie, la mort et le désir éternel.",
  },
  {
    title: 'Shining',
    author: 'Stephen King',
    priceDh: 85,
    category: 'Horreur',
    stock: 2,
    rating: 5,
    imageUrl:
      'https://www.babelio.com/couv/CVT_SHINING-le-chef-doeuvre-de-Stanley-Kubrick_8135.jpg',
    summary:
      "L'Overlook Palace, un hôtel isolé dans les montagnes, devient le théâtre d'une descente aux enfers psychologique. Jack Torrance, hanté par ses démons intérieurs, sombre dans la folie sous l'influence des forces maléfiques du lieu. Son fils Danny, doté du don de 'Shining', est le seul capable de percevoir les horreurs passées et futures qui menacent leur survie.",
  },
  {
    title: 'Ça',
    author: 'Stephen King',
    priceDh: 70,
    category: 'Horreur',
    stock: 4,
    rating: 4,
    imageUrl: 'https://www.babelio.com/couv/cvt_a-Integrale_1307.jpg',
    summary:
      "Dans la petite ville de Derry, des enfants disparaissent mystérieusement, victimes d'entité millénaire capable de prendre la forme de leurs peurs les plus intimes. Le Club des Ratés se jure d'affronter ce monstre, souvent incarné par Grippe-Sou le Clown. Un récit puissant sur l'amitié.",
  },
  {
    title: "L'Avare",
    author: 'Molière',
    priceDh: 75,
    category: 'Théâtre',
    stock: 8,
    rating: 3,
    imageUrl: 'https://www.babelio.com/couv/cvt_LAvare_3263.jpg',
    summary:
      "Harpagon, un vieillard dont l'obsession pour l'argent frise la pathologie, sacrifie le bonheur de ses enfants sur l'autel de son avarice. Cette comédie satirique dépeint avec brio les quiproquos et les complots nés de la perte de sa précieuse cassette d'or.",
  },
  {
    title: 'Cyrano de Bergerac',
    author: 'Edmond Rostand',
    priceDh: 110,
    category: 'Théâtre',
    stock: 3,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/cvt_Cyrano-de-Bergerac_6762.jpg',
    summary:
      'Cyrano, poète magnifique et bretteur redoutable, est complexé par un nez démesuré qui l\'empêche de déclarer sa flamme à la belle Roxane. Par pur héroïsme et sacrifice, il prête ses mots d\'amour à son rival Christian.',
  },
  {
    title: 'Le Tartuffe',
    author: 'Molière',
    priceDh: 80,
    category: 'Comédie',
    stock: 6,
    rating: 4,
    imageUrl:
      'https://www.babelio.com/couv/cvt_Le-Tartuffe-Dom-Juan-Le-Misanthrope_8098.jpg',
    summary:
      "Un imposteur religieux s'immisce dans une famille bourgeoise, manipulant le maître de maison pour s'emparer de ses biens. Cette œuvre dénonce l'hypocrisie et le fanatisme.",
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    priceDh: 90,
    category: 'Science-Fiction',
    stock: 0,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/cvt_Dune-tome-1_3118.jpg',
    summary:
      "Sur la planète désertique Arrakis, le jeune Paul Atréides se retrouve au cœur d'une lutte acharnée pour le contrôle de l'Épice.",
  },
  {
    title: 'Fondation',
    author: 'Isaac Asimov',
    priceDh: 95,
    category: 'Science-Fiction',
    stock: 5,
    rating: 4,
    imageUrl: 'https://www.babelio.com/couv/sm_cvt_Le-Veilleur_2784.jpg',
    summary:
      "Alors que l'Empire Galactique s'effondre, le savant Hari Seldon utilise la psychohistoire pour prédire des millénaires de chaos.",
  },
  {
    title: '1984',
    author: 'George Orwell',
    priceDh: 85,
    category: 'Science-Fiction',
    stock: 7,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/cvt_1984_1489.jpg',
    summary:
      'Dans une société totalitaire dirigée par Big Brother, chaque geste et chaque pensée sont surveillés.',
  },
  {
    title: 'Père Riche Père Pauvre',
    author: 'Robert Kiyosaki',
    priceDh: 120,
    category: 'Perso',
    stock: 12,
    rating: 4,
    imageUrl:
      'https://www.babelio.com/couv/cvt_Pere-riche-pere-pauvre_2745.jpg',
    summary:
      'À travers les leçons apprises de ses deux pères, l\'auteur explique comment sortir du cycle du salariat.',
  },
  {
    title: "L'Alchimiste",
    author: 'Paulo Coelho',
    priceDh: 90,
    category: 'Perso',
    stock: 9,
    rating: 3,
    imageUrl:
      'https://tse2.mm.bing.net/th/id/OIP.ubvjDC0cy4Iiimos51hMiwHaLg?pid=Api&h=220&P=0.jpg',
    summary:
      "L'Alchimiste suit l'épopée de Santiago, un jeune berger andalou qui traverse l'Afrique pour trouver un trésor.",
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    priceDh: 100,
    category: 'Perso',
    stock: 10,
    rating: 5,
    imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
    summary:
      'Ce guide pratique explique comment de minuscules changements quotidiens peuvent se transformer en résultats spectaculaires.',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    priceDh: 85,
    category: 'Histoire',
    stock: 6,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/CVT_184036_aj_m_260.jpg',
    summary:
      "Ce livre retrace l'évolution de l'humanité, de l'âge de pierre jusqu'à l'ère technologique.",
  },
  {
    title: 'Le Siècle',
    author: 'Ken Follett',
    priceDh: 100,
    category: 'Histoire',
    stock: 4,
    rating: 4,
    imageUrl:
      'https://www.babelio.com/couv/cvt_Le-Siecle-tome-1--La-chute-des-geants_713.jpg',
    summary:
      'Cette fresque historique suit les destins entrelacés de cinq familles.',
  },
  {
    title: 'La Nuit des Temps',
    author: 'René Barjavel',
    priceDh: 95,
    category: 'Science-Fiction',
    stock: 5,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/cvt_La-Nuit-des-temps_3780.jpg',
    summary:
      'En Antarctique, une expédition scientifique détecte un signal provenant des profondeurs de la glace.',
  },
  {
    title: 'Le Petit Prince',
    author: 'Saint-Exupéry',
    priceDh: 70,
    category: 'Tous',
    stock: 10,
    rating: 5,
    imageUrl: 'https://www.babelio.com/couv/cvt_Le-Petit-Prince_120.jpg',
    summary: 'Un conte philosophique puissant sur la persévérance.',
  },
];
