/*
All the generation algorithm are implemented here
*/

function isWaterNearby( map, i, j, mapSize, sandId ) {
	if ( i > 0 && map[i-1][j] < sandId ) {
		return true
	} else if ( j > 0 && map[i][j-1] < sandId ) {
		return true
	} else if ( j < mapSize-1 && map[i][j+1] < sandId ) {
		return true
	} else if ( i < mapSize-1 && map[i+1][j] < sandId ) {
		return true
	}

	return false
}

function generateMap( terrainMap, obstacleMap, unitMap, buildingMap, mapSize, fountainRadius ) {
	// Constants for terrain generation
	baseZoomLevel = 80.0
	detailZoomLevel = 60.0
	rainZoomLevel = 10.0
	detailWeight = 0.15
	treeRainLevel = 0.35
	tilesSpectrum = 16
	sandId = 5

	const baseNoiseGen = new FastSimplexNoise({
		frequency: 2.0,
		max: (1 - detailWeight) * tilesSpectrum,
		min: detailWeight * tilesSpectrum,
		octaves: 6
	})

	const detailNoiseGen = new FastSimplexNoise({
		frequency: 2.0,
		max: detailWeight * tilesSpectrum,
		min: -detailWeight * tilesSpectrum,
		octaves: 3
	})

	const rainNoiseGen = new FastSimplexNoise({
		frequency: 2.0,
		max: 1,
		min: 0,
		octaves: 1
	})

	var noise

	// Base landscape
	for ( var i = 0 ; i < mapSize ; i++) {
		for (var j = 0; j < mapSize; j++) {
			noise = Math.floor(baseNoiseGen.in2D(i / baseZoomLevel, j / baseZoomLevel))
			terrainMap[i][j] = noise
			unitMap[i][j] = undefined
			buildingMap[i][j] = undefined

			noise = Math.floor(detailNoiseGen.in2D(i / detailZoomLevel, j / detailZoomLevel))
			terrainMap[i][j] += noise

			noise = rainNoiseGen.in2D(i / rainZoomLevel, j / rainZoomLevel)

			// Specific range of tiles
			if (terrainMap[i][j] < 14 && terrainMap[i][j] > 8 && noise > treeRainLevel) {
				obstacleMap[i][j] = 2
			}
		}
	}

	// Refinements
	for ( var i = 0 ; i < mapSize ; i++) {
		for (var j = 0; j < mapSize; j++) {
			if ( terrainMap[i][j] >= sandId && isWaterNearby( terrainMap, i, j, mapSize, sandId ) ) {
				terrainMap[i][j] = sandId
			}

			// Specific range of tiles
			if (obstacleMap[i][j] === 2) {
				obstacleMap[i][j] = 1 + Math.floor(Math.random() * 3)
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
		terrainMap[px][py] = 15
		terrainMap[qx][qy] = 15
		obstacleMap[px][py] = 0
		obstacleMap[qx][qy] = 0
	}

	// The fountains
	function addFountain(x, y) {
		buildingMap[x][y] = new Building( 0, 0, { "x" : x, "y" : y}, 1 )

		for (var i = -fountainRadius; i <= fountainRadius; i++) {

			for (var j = -fountainRadius; j <= fountainRadius; j++) {

				if ( i*i + j*j <= fountainRadius * fountainRadius ) {
					terrainMap[x + i][y + j] = 16
					obstacleMap[x + i][y + j] = undefined
				}
			}
		}
	}

	var off = Math.max(Math.floor(mapSize / 6), fountainRadius)
	addFountain(off,off)
	addFountain(off,mapSize - off - 1)
	addFountain(mapSize - off - 1, off)
	addFountain(mapSize - off - 1, mapSize - off - 1)
	addFountain(Math.floor(mapSize / 2), Math.floor(mapSize / 2))
}
