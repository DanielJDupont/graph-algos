/*
 A square is one of the matrix elements.
 isProcessed false means that the square has not been visited by the algorithm yet.
 isProcessed true means that the square has been processed by the algorithm.
*/
export interface Square {
  id: string;
  isProcessed: boolean;
  isDisplayed: boolean;
}
