class Graph {
    constructor(rows,cols) {
        this.rows = rows;
        this.cols = cols;
        this.adjList = new Map();
        this.directions = [
            [2, 1], [1, 2], [-1, 2], [-2, 1],
            [-2, -1], [-1, -2], [1, -2], [2, -1]
        ];
        this._buildGraph();
    }

    _isValid(x,y) {
        if(x>=0 && y>=0 && x<this.rows && y<this.cols) {
            return true;
        }

        return false;
    }

    _buildGraph() {
        for(let i=0;i<this.rows; i++) {
            for(let j=0; j<this.cols;j++) {
                const node = [i,j].toString()
                this._addNode(node);

                for(const [dx,dy] of this.directions) {
                    const [nx,ny] = [i+dx, j+dy];
                    if(this._isValid(nx,ny)) {
                        const neighbor = [nx,ny].toString();
                        this._addNode(neighbor);
                        this._addVertices(node,neighbor);
                    }
                }
            }
        } 

        console.log(this.adjList);
    }

    _addNode(node) {
        if(!this.adjList.has(node)) {
            this.adjList.set(node,[])
        }
    }

    _addVertices(node1,node2) {
        this.adjList.get(node1).push(node2);
        this.adjList.get(node2).push(node1);
    }

    _bfs(start,end) {
        //define queue for bfs
        let queue = [[start]];

        //capture every already visited node
        let visited = new Set();

        visited.add(start);

        //work on the queue
        while(queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];
            //iterate through value of node => neighbors
            for(const neighbor of this.adjList.get(node)) {
                
                //if the neighbor has not been seen, add to queue to iterate through its neighbors too
                if(!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path,neighbor]);
                }
                
                //if a neighbor is the destination, return the path
                if(neighbor === end) {
                    path.push(neighbor);
                    console.log(path)
                    return path;
                }
            }
        }

        //throw error if no path is found
        throw new Error("No path found");
    }

    shortestPath(start,end) {
        const origin = start.toString();
        const destination = end.toString();

        return this.__bfs(origin,destination)
    }
}

export default Graph;