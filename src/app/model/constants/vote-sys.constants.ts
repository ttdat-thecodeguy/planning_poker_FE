import { VotingSys } from '../vote-sys.model';

/*
            <mat-option value="fibo">Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ? )</mat-option>
            <mat-option value="m-fibo">Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ? )</mat-option>
            <mat-option value="t-shirts">T-shirts (xxs, xs, s, m, l, xl, xxl, ?)</mat-option>
            <mat-option value="x2">Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ? )</mat-option>
*/


export const VOTES: VotingSys[] = [
  {
    name: 'Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ? )',
    voting_sys: "0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?",
  },
  {
    name: 'Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ? )',
    voting_sys: "( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ? )"
  },
  {
    name: 'T-shirts (xxs, xs, s, m, l, xl, xxl, ?)',
    voting_sys: "xxs, xs, s, m, l, xl, xxl, ?",
  },
  {
    name: 'Powers of 2 ( 0, 1, 2, 4, 8, 16, 32, 64, ? )',
    voting_sys: "0, 1, 2, 4, 8, 16, 32, 64, ?",
  },
];
