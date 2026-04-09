
export type UserRecord = {
    id: number;
    name: string;
    birthday: number;
    heightNow: number;
    calculatedPercentile: number;
}

export const testUsers: UserRecord[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    birthday: 1420070400000, // Jan 1, 2015
    heightNow: 125,
    calculatedPercentile: 75,
  },
  {
    id: 2,
    name: 'Liam Smith',
    birthday: 1388534400000, // Jan 1, 2014
    heightNow: 145,
    calculatedPercentile: 85,
  },
  {
    id: 3,
    name: 'Sophia Davis',
    birthday: 1356998400000, // Jan 1, 2013
    heightNow: 158,
    calculatedPercentile: 62,
  },
  {
    id: 4,
    name: 'Noah Williams',
    birthday: 1325462400000, // Jan 1, 2012
    heightNow: 168,
    calculatedPercentile: 70,
  },
];
