/*
All the generation algorithm are implemented here
*/

function generateMap( terrainMap, obstacleMap, mapSize ) {
	var noiseGen = new ClassicalNoise()
	var scale = 0.1
	var noise

	// Basic landscape
	for ( var i = 0 ; i < mapSize ; i++) {

		for (var j = 0; j < mapSize; j++) {
			noise = noiseGen.noise(i * scale, j * scale, 0)
			terrainMap[i][j] = parseInt(noise * 2 + 2)

			if (noise > 0.3 && noise < 0.5) {
				obstacleMap[i][j] = 1
			} else {
				obstacleMap[i][j] = 0
			}
		}
	}

	// The road
	var startingPoint = { "x" : Math.floor(mapSize * (1 + 2 * Math.random()) * 0.25), "y" : 0}
		endPoint = { "x" : Math.floor(mapSize * (1 + Math.random()) * 0.25), "y" : mapSize-1 }

	p1 = { "x" : startingPoint.x + Math.floor((endPoint.x - startingPoint.x) * (2 * Math.random() - 0.5)), "y" : Math.floor(mapSize * Math.random()) }
	p2 = { "x" : startingPoint.x + Math.floor((endPoint.x - startingPoint.x) * (2 * Math.random() - 0.5)), "y" : Math.floor(mapSize * Math.random()) }

	if (p1.y > p2.y) {
		var temp = p2
		p2 = p1
		p1 = temp
	}

	p3 = { "x" : Math.floor((p1.x + p2.x) / 2), "y" : Math.floor((p1.y + p2.y) / 2) }

	function interpolate(A, B, C, t) {
		return { "x" : (1-t) * (1-t) * A.x + 2 * t * (1-t) * B.x + t * t * C.x,
	 			"y" : (1-t) * (1-t) * A.y + 2 * t * (1-t) * B.y + t * t * C.y}
	}

	var P, px, py, qx, qy
	var N = mapSize * mapSize

	for (var k = 0; k < N; k++) {
		P = interpolate(startingPoint, p1, p3, k / N)
		Q = interpolate(endPoint, p2, p3, k / N)

		px = Math.floor(P.x) ; py = Math.floor(P.y)
		qx = Math.floor(Q.x) ; qy = Math.floor(Q.y)
		terrainMap[px][py] = 4
		terrainMap[qx][qy] = 4
		obstacleMap[px][py] = 0
		obstacleMap[qx][qy] = 0
	}
}
