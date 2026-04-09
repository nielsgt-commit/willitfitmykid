import {Temporal} from "temporal-polyfill";

export type UserRecord = {
    id: number;
    name: string;
    sex: 'M' | 'F';
    birthday: Temporal.PlainDate;
    heightNow: number;
    calculatedPercentile: number;
    sizeNow: `${number}`;
}

export const testUsers: UserRecord[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2017-01-01'),
    heightNow: 135,
    calculatedPercentile: 50,
      sizeNow: `135` ,
  },
  {
    id: 2,
    name: 'Liam Smith',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2010-01-01'),
    heightNow: 168,
    calculatedPercentile: 10,
      sizeNow:  `168`,
  },
  {
    id: 3,
    name: 'Sophia Davis',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2007-01-01'),
    heightNow: 175,
    calculatedPercentile: 90,
      sizeNow: `175`,
  },
  {
    id: 4,
    name: 'Noah Williams',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2019-01-01'),
    heightNow: 128,
    calculatedPercentile: 75,
      sizeNow: `128`,
  },
];
