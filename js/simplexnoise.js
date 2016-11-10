var G2 = (3.0 - Math.sqrt(3.0)) / 6.0
var G3 = 1.0 / 6.0
var G4 = (5.0 - Math.sqrt(5.0)) / 20.0

var GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, -1]
]

var GRAD4 = [
  [0, 1, 1, 1], [0, 1, 1, -1], [0, 1, -1, 1], [0, 1, -1, -1],
  [0, -1, 1, 1], [0, -1, 1, -1], [0, -1, -1, 1], [0, -1, -1, -1],
  [1, 0, 1, 1], [1, 0, 1, -1], [1, 0, -1, 1], [1, 0, -1, -1],
  [-1, 0, 1, 1], [-1, 0, 1, -1], [-1, 0, -1, 1], [-1, 0, -1, -1],
  [1, 1, 0, 1], [1, 1, 0, -1], [1, -1, 0, 1], [1, -1, 0, -1],
  [-1, 1, 0, 1], [-1, 1, 0, -1], [-1, -1, 0, 1], [-1, -1, 0, -1],
  [1, 1, 1, 0], [1, 1, -1, 0], [1, -1, 1, 0], [1, -1, -1, 0],
  [-1, 1, 1, 0], [-1, 1, -1, 0], [-1, -1, 1, 0], [-1, -1, -1, 0]
]

// Functions -------------------------------------------------------------------

function FastSimplexNoise (options) {
  if (!options) options = {}

  this.amplitude = options.amplitude || 1.0
  this.frequency = options.frequency || 1.0
  this.octaves = parseInt(options.octaves || 1)
  this.persistence = options.persistence || 0.5
  this.random = options.random || Math.random

  if (typeof options.min === 'number' && typeof options.max === 'number') {
    if (options.min >= options.max) {
      console.error('options.min must be less than options.max')
    } else {
      var min = parseFloat(options.min)
      var max = parseFloat(options.max)
      var range = max - min
      this.scale = function (value) {
        return min + ((value + 1) / 2) * range
      }
    }
  } else {
    this.scale = function (value) {
      return value
    }
  }

  var i
  var p = new Uint8Array(256)
  for (i = 0; i < 256; i++) {
    p[i] = i
  }

  var n, q
  for (i = 255; i > 0; i--) {
    n = Math.floor((i + 1) * this.random())
    q = p[i]
    p[i] = p[n]
    p[n] = q
  }

  // To remove the need for index wrapping, double the permutation table length
  this.perm = new Uint8Array(512)
  this.permMod12 = new Uint8Array(512)
  for (i = 0; i < 512; i++) {
    this.perm[i] = p[i & 255]
    this.permMod12[i] = this.perm[i] % 12
  }
}

FastSimplexNoise.prototype.in2D = function (x, y) {
  var amplitude = this.amplitude
  var frequency = this.frequency
  var maxAmplitude = 0
  var noise = 0
  var persistence = this.persistence

  for (var i = 0; i < this.octaves; i++) {
    noise += this.raw2D(x * frequency, y * frequency) * amplitude
    maxAmplitude += amplitude
    amplitude *= persistence
    frequency *= 2
  }

  var value = noise / maxAmplitude
  return this.scale(value)
}

FastSimplexNoise.prototype.raw2D = function (x, y) {
  var perm = this.perm
  var permMod12 = this.permMod12

  var n0, n1, n2 // Noise contributions from the three corners

  // Skew the input space to determine which simplex cell we're in
  var s = (x + y) * 0.5 * (Math.sqrt(3.0) - 1.0) // Hairy factor for 2D
  var i = Math.floor(x + s)
  var j = Math.floor(y + s)
  var t = (i + j) * G2
  var X0 = i - t // Unskew the cell origin back to (x,y) space
  var Y0 = j - t
  var x0 = x - X0 // The x,y distances from the cell origin
  var y0 = y - Y0

  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  var i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
  if (x0 > y0) { // Lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1
    j1 = 0
  } else { // Upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0
    j1 = 1
  }

  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3 - sqrt(3)) / 6

  var x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
  var y1 = y0 - j1 + G2
  var x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
  var y2 = y0 - 1.0 + 2.0 * G2

  // Work out the hashed gradient indices of the three simplex corners
  var ii = i & 255
  var jj = j & 255
  var gi0 = permMod12[ii + perm[jj]]
  var gi1 = permMod12[ii + i1 + perm[jj + j1]]
  var gi2 = permMod12[ii + 1 + perm[jj + 1]]

  // Calculate the contribution from the three corners
  var t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 < 0) {
    n0 = 0.0
  } else {
    t0 *= t0
    // (x,y) of 3D gradient used for 2D gradient
    n0 = t0 * t0 * dot2D(GRAD3[gi0], x0, y0)
  }
  var t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 < 0) {
    n1 = 0.0
  } else {
    t1 *= t1
    n1 = t1 * t1 * dot2D(GRAD3[gi1], x1, y1)
  }
  var t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 < 0) {
    n2 = 0.0
  } else {
    t2 *= t2
    n2 = t2 * t2 * dot2D(GRAD3[gi2], x2, y2)
  }

  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1, 1]
  return 70.14805770654148 * (n0 + n1 + n2)
}

function dot2D (g, x, y) {
  return g[0] * x + g[1] * y
}
