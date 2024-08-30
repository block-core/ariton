import { Record } from '@web5/api';

// export interface RecordEntry {
//   record: Record;
//   id: string;
//   data: any;
// }

export interface RecordEntry<T> {
  record: Record;
  id: string;
  data: T;
  loading?: boolean;
  direction?: 'in' | 'out' | any;
}
