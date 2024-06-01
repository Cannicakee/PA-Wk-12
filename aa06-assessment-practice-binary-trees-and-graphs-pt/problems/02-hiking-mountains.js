function findPeak(matrix) {
    let highest = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0; k < matrix[0].length; k++) {
            if (matrix[i][k] > highest) {
                highest = matrix[i][k];
            }
        }
    }

    return highest;
}

function findStarts(matrix) {
    let starts = [];

    // Top Row
    for (let i = 0; i < matrix[0].length; i++) {
        if (matrix[0][i] == 0) {
            starts.push([0, i])
        }
    }

    // Bottom Row
    for (let i = 0; i < matrix[matrix.length - 1].length; i++) {
        if (matrix[matrix.length - 1][i] == 0) {
            starts.push([matrix.length - 1, i])
        }
    }

    // Left except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][0] == 0) {
            starts.push([i, 0])
        }
    }

    // Right except first and last
    for (let i = 1; i < matrix.length - 1; i++) {
        if (matrix[i][matrix[0].length - 1] == 0) {
            starts.push([i, matrix[0].length - 1])
        }
    }

    return starts;
}

function findNeighbors(node, matrix) {
    let [nodeRow, nodeCol] = node;
    let nodeValue = matrix[nodeRow][nodeCol];

    let [maxRows, maxCols] = [matrix.length, matrix[0].length];

    let neighbors = getAllNodeNeighbors(nodeRow, nodeCol);
    let validNeighbors = [];

    neighbors.forEach((pair) => {
        let [currRow, currCol] = pair;
        let isValidRow = currRow >= 0 && currRow < maxRows;
        let isValidCol = currCol >= 0 && currCol < maxCols;

        if (isValidRow && isValidCol) {
            let currNodeValue = matrix[currRow][currCol];
            let valueDifferenceIsWithinOne = Math.abs(currNodeValue - nodeValue) <= 1;

            if (valueDifferenceIsWithinOne) validNeighbors.push(pair);
        }
    });

    return validNeighbors;
}
function getAllNodeNeighbors(nodeRow, nodeCol) {
    return [
        // top
        [nodeRow - 1, nodeCol],
        // bottom
        [nodeRow + 1, nodeCol],
        // left
        [nodeRow, nodeCol - 1],
        // right
        [nodeRow, nodeCol + 1],
        // top left
        [nodeRow - 1, nodeCol - 1],
        // top right
        [nodeRow - 1, nodeCol + 1],
        // bottom left
        [nodeRow + 1, nodeCol - 1],
        // bottom right
        [nodeRow + 1, nodeCol + 1],
    ];
}

function pathTraversal(node, matrix, visited, peak) {
    let queue = [node];

    while (queue.length > 0) {
        // remove first node from stack
        let currNode = queue.shift();

        // values to help with comparison
        let pathStr = currNode.join(",");
        let [nodeRow, nodeCol] = currNode;
        let nodeValue = matrix[nodeRow][nodeCol];
        visited.add(pathStr);

        // if the current node's value reaches the peak
        // we have a "true" mountain hike
        if (nodeValue === peak) {
            return true;
        }

        // use findNeighbors to get valid neighbors of given
        // node
        let neighbors = findNeighbors(currNode, matrix);
        neighbors.forEach((pair) => {
            let pairStr = pair.join(",");

            if (!visited.has(pairStr)) {
                visited.add(pairStr);
                queue.push(pair);
            }
        });
    }
    return false;
}

function identifyPath(mountain) {
    let peak = findPeak(mountain);
    let startNodes = findStarts(mountain);

    for (let node of startNodes) {
        const visited = new Set();
        let validPath = pathTraversal(node, mountain, visited, peak);

        if (validPath) {
            return node;
        }
    }

    return false;
}

// Uncomment for local testing

// // Example 0
// const mountain_0 = [
//     [1, 2, 4],
//     [4, 5, 9],
//     [5, 7, 6]
// ];

// console.log(findNeighbors([2,0], mountain_0)) // <- Expect '[ [ 1, 0 ], [ 1, 1 ] ]'

// // Example 1
// const mountain_1 = [
//         [1, 0, 1, 1],
//         [2, 3, 2, 1],
//         [0, 2, 4, 1],
//         [3, 2, 3, 1]
// ];

// test_visited = new Set()
// console.log(pathTraversal([0, 1], mountain_1, test_visited, 4)) // <- Expect 'true
// console.log(identifyPath(mountain_1)) // <- Expect '[ 0, 1 ]'

// // Example 2
// const mountain_2 = [
//         [0, 2, 1, 1],
//         [2, 2, 3, 1],
//         [1, 1, 1, 1],
//         [1, 0, 1, 1]
// ];

// console.log(identifyPath(mountain_2)) // <- Expect '[ 3, 1 ]'

// // Example 3
// const mountain_3 = [
//         [0, 1, 2, 0],
//         [5, 1, 3, 2],
//         [4, 1, 2, 1],
//         [3, 4, 3, 1]
// ];

// console.log(identifyPath(mountain_3)) // <- Expect '[ 0, 0 ]'



/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [identifyPath, findNeighbors, pathTraversal];
