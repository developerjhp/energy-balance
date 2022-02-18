import { Dispatch } from 'react';
import { dbArr } from './db';
export interface Props {
  data: dbArr;
  order: string;
  setOrder: Dispatch<any>;
  input: string;
  setInput: Dispatch<any>;
  inputFocused: boolean;
  setInputFocused: Dispatch<any>;
  searched: string[];
  setSearched: Dispatch<any>;
  matches: dbArr;
  setMatches: Dispatch<any>;
}
