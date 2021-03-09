export const depthFirstSearch = async (
  i: number,
  j: number,
  matrix,
  setProcessList
) => {
  if (i >= 0 && i < matrix.length) {
    if (j >= 0 && j < matrix[i].length) {
      // We have already processed this square.
      if (matrix[i][j].isProcessed) return;

      matrix[i][j].isProcessed = true;
      setProcessList((oldList) => [...oldList, matrix[i][j].id]);

      // Travel top, right, bottom, left
      depthFirstSearch(i - 1, j, matrix, setProcessList);
      depthFirstSearch(i, j + 1, matrix, setProcessList);
      depthFirstSearch(i + 1, j, matrix, setProcessList);
      depthFirstSearch(i, j - 1, matrix, setProcessList);
    }
  }
  return;
};
