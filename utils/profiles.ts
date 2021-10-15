interface Photo {
  id: number;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  type: string;
  gender: string;
  sexuality: string;
  url: string;
  likes: string[];
  photos: Photo[];
}

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Tony stark',
    age: 45,
    type: 'single',
    gender: 'male',
    sexuality: 'straight',
    url: require('../assets/profiles/kiki.jpeg'),
    likes: ['Netflix', 'Wine'],
    photos: [
      {
        id: 1,
        url: require('../assets/profiles/kiki.jpeg'),
      },
      {
        id: 2,
        url: require('../assets/profiles/tony-k.jpeg'),
      },
    ],
  },
  {
    id: '2',
    name: 'Steve Rogers',
    age: 35,
    type: 'single',
    gender: 'male',
    sexuality: 'straight',
    url: require('../assets/profiles/tony-sheraton.jpeg'),
    likes: ['Netflix', 'Wine'],
    photos: [
      {
        id: 1,
        url: require('../assets/profiles/tony-sheraton.jpeg'),
      },
      {
        id: 2,
        url: require('../assets/profiles/tony-vm.jpeg'),
      },
    ],
  },
  {
    id: '3',
    name: 'Natasha Romanoff',
    age: 25,
    type: 'single',
    gender: 'male',
    sexuality: 'straight',
    url: require('../assets/profiles/tony-shela.jpeg'),
    likes: ['Netflix', 'Wine'],
    photos: [
      {
        id: 1,
        url: require('../assets/profiles/tony-shela.jpeg'),
      },
    ],
  },
  {
    id: '4',
    name: 'Thor Odinson',
    age: 35,
    type: 'single',
    gender: 'male',
    sexuality: 'straight',
    url: require('../assets/profiles/tony-lamu.jpeg'),
    likes: ['Netflix', 'Wine'],
    photos: [
      {
        id: 1,
        url: require('../assets/profiles/tony-lamu.jpeg'),
      },
    ],
  },
  {
    id: '5',
    name: 'Bruce Banner',
    age: 35,
    type: 'single',
    gender: 'male',
    sexuality: 'straight',
    url: require('../assets/profiles/aberdares.jpeg'),
    likes: ['Netflix', 'Wine'],
    photos: [
      {
        id: 1,
        url: require('../assets/profiles/aberdares.jpeg'),
      },
      {
        id: 2,
        url: require('../assets/profiles/fishing.jpeg'),
      },
    ],
  },
];
