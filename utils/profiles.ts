interface Photo {
  id: number;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  photos: Photo[];
}

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Tony stark',
    age: 45,
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
