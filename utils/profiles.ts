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

// const [profiles, setProfiles] = useState([
//   {
//     id: '1',
//     name: 'Tony stark',
//     age: 45,
//     type: 'single',
//     gender: 'male',
//     sexuality: 'straight',
//     likes: ['Science', 'Girls'],
//     photos: [
//       {
//         id: 1,
//         url: 'https://woolongtalks.files.wordpress.com/2014/11/wpid-tony-stark-tony-stark-12952978-419-600.jpeg',
//       },
//       {
//         id: 2,
//         url: 'https://i.redd.it/ztf16zeocf811.jpg',
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Steve Rogers',
//     age: 35,
//     type: 'single',
//     gender: 'male',
//     sexuality: 'straight',
//     likes: ['Peace', 'Army'],
//     photos: [
//       {
//         id: 1,
//         url: 'https://i.pinimg.com/originals/1f/61/fb/1f61fba334fafaec6528d07979d5641e.jpg',
//       },
//       {
//         id: 2,
//         url: 'https://i.pinimg.com/originals/ab/b4/c2/abb4c2ef714aedbb945b2744f23abe85.jpg',
//       },
//     ],
//   },
// ]);