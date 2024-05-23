function dijkstra(adjacencyList, startNode, endNode) {
  if(startNode==""||endNode==""){return [];}
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();

  // Initialize distances and previous objects
  for (const node in adjacencyList) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[startNode] = 0;
  queue.enqueue(startNode, 0);

  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue().data;
    // console.log("Visiting node:", currentNode); // Add this line

    if (currentNode === endNode) {
      break; // We have reached the end node
    }

    for (const neighbor of adjacencyList[currentNode]) {
      const newDistance = distances[currentNode] + neighbor.distance;

      if (newDistance < distances[neighbor.name]) {
        distances[neighbor.name] = newDistance;
        previous[neighbor.name] = currentNode;
        queue.enqueue(neighbor.name, newDistance);
        // console.log(`Updated distance for ${neighbor.name}: ${newDistance}`); // Add this line
      }
    }
  }

  const path = [];
  let current = endNode;

  while (previous[current] !== null) {
    path.unshift(current);
    current = previous[current];
  }

  path.unshift(startNode);

  return path;
}

// PriorityQueue implementation
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(data, priority) {
    const entry = { data, priority };
    const index = this.items.findIndex(
      (item) => item.priority > entry.priority
    );

    if (index === -1) {
      this.items.push(entry);
    } else {
      this.items.splice(index, 0, entry);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export default dijkstra;
