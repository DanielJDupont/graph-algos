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

export const breadthFirstSearch = async (
  i: number,
  j: number,
  matrix,
  setProcessList
) => {
  const queue: number[][] = [];

  queue.push([i, j]);

  while (queue.length > 0) {
    const [_i, _j] = queue.shift();

    if (_i >= 0 && _i < matrix.length) {
      if (_j >= 0 && _j < matrix[_i].length) {
        // We have not already processed this square.
        if (!matrix[_i][_j].isProcessed) {
          matrix[_i][_j].isProcessed = true;

          setProcessList((oldList) => [...oldList, matrix[_i][_j].id]);

          // Travel top, right, bottom, left
          queue.push([_i - 1, _j]);
          queue.push([_i, _j + 1]);
          queue.push([_i + 1, _j]);
          queue.push([_i, _j - 1]);
        }
      }
    }
  }
};
