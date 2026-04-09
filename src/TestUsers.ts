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
  {
    id: 5,
    name: 'Olivia Brown',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2025-10-09'),
    heightNow: 65,
    calculatedPercentile: 50,
    sizeNow: `65`,
  },
  {
    id: 6,
    name: 'Ethan Miller',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2024-10-09'),
    heightNow: 80,
    calculatedPercentile: 25,
    sizeNow: `80`,
  },
  {
    id: 7,
    name: 'Ava Wilson',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2024-02-09'),
    heightNow: 87,
    calculatedPercentile: 50,
    sizeNow: `87`,
  },
  {
    id: 8,
    name: 'Mason Moore',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2023-11-09'),
    heightNow: 91,
    calculatedPercentile: 50,
    sizeNow: `91`,
  },
  {
    id: 9,
    name: 'Isabella Taylor',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2023-10-09'),
    heightNow: 94,
    calculatedPercentile: 85,
    sizeNow: `94`,
  },
  {
    id: 10,
    name: 'Lucas Anderson',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2023-09-09'),
    heightNow: 95,
    calculatedPercentile: 75,
    sizeNow: `95`,
  },
  {
    id: 11,
    name: 'Mia Thomas',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2025-06-09'),
    heightNow: 72,
    calculatedPercentile: 75,
    sizeNow: `72`,
  },
  {
    id: 12,
    name: 'Benjamin Jackson',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2024-12-09'),
    heightNow: 78,
    calculatedPercentile: 25,
    sizeNow: `78`,
  },
  {
    id: 13,
    name: 'Charlotte White',
    sex: 'F',
    birthday: Temporal.PlainDate.from('2023-11-09'),
    heightNow: 90,
    calculatedPercentile: 50,
    sizeNow: `90`,
  },
  {
    id: 14,
    name: 'Henry Harris',
    sex: 'M',
    birthday: Temporal.PlainDate.from('2023-07-09'),
    heightNow: 94,
    calculatedPercentile: 50,
    sizeNow: `94`,
  },
];
