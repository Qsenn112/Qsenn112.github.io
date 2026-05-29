// ============================================================
// tangram.js — 7 standard tangram piece definitions
// ============================================================

// All vertices relative to piece origin (0,0)
// Scaled for a ~860px wide canvas
const SCALE = 1.4;

const PIECES_DEF = [
  {
    id: 'bigtri1',
    name: '큰 삼각형 1',
    // Large right triangle (hypotenuse ≈ 160px)
    vertices: [
      {x: 0, y: 0},
      {x: 113*SCALE, y: 0},
      {x: 0, y: 113*SCALE}
    ],
    color: '#ff6b6b',   // coral red
    defaultX: 80,
    defaultY: 400
  },
  {
    id: 'bigtri2',
    name: '큰 삼각형 2',
    vertices: [
      {x: 0, y: 0},
      {x: -113*SCALE, y: 0},
      {x: 0, y: -113*SCALE}
    ],
    color: '#ffa502',   // orange
    defaultX: 200,
    defaultY: 400
  },
  {
    id: 'medtri',
    name: '중간 삼각형',
    // Medium right triangle (hypotenuse ≈ 113px)
    vertices: [
      {x: 0, y: 0},
      {x: 80*SCALE, y: 0},
      {x: 0, y: -80*SCALE}
    ],
    color: '#ffd32a',   // yellow
    defaultX: 80,
    defaultY: 280
  },
  {
    id: 'smalltri1',
    name: '작은 삼각형 1',
    // Small right triangle (hypotenuse ≈ 80px)
    vertices: [
      {x: 0, y: 0},
      {x: 57*SCALE, y: 0},
      {x: 0, y: 57*SCALE}
    ],
    color: '#7bed9f',   // green
    defaultX: 180,
    defaultY: 250
  },
  {
    id: 'smalltri2',
    name: '작은 삼각형 2',
    vertices: [
      {x: 0, y: 0},
      {x: -57*SCALE, y: 0},
      {x: 0, y: -57*SCALE}
    ],
    color: '#70a1ff',   // blue
    defaultX: 70,
    defaultY: 180
  },
  {
    id: 'square',
    name: '정사각형',
    // Square (side ≈ 80px)
    vertices: [
      {x: -40*SCALE, y: -40*SCALE},
      {x: 40*SCALE, y: -40*SCALE},
      {x: 40*SCALE, y: 40*SCALE},
      {x: -40*SCALE, y: 40*SCALE}
    ],
    color: '#a29bfe',   // purple
    defaultX: 200,
    defaultY: 160
  },
  {
    id: 'parallelogram',
    name: '평행사변형',
    // Parallelogram (≈ 113 x 57)
    vertices: [
      {x: 0, y: 0},
      {x: 113*SCALE, y: 0},
      {x: 133*SCALE, y: 57*SCALE},
      {x: 20*SCALE, y: 57*SCALE}
    ],
    color: '#fd79a8',   // pink
    defaultX: 60,
    defaultY: 100
  }
];

// Create a piece instance from definition
function createPiece(def) {
  return {
    id: def.id,
    name: def.name,
    vertices: def.vertices.map(v => ({x: v.x, y: v.y})),
    color: def.color,
    x: def.defaultX,
    y: def.defaultY,
    rotation: 0,  // degrees
    selected: false
  };
}

// Initialize all 7 pieces
function initPieces() {
  return PIECES_DEF.map(def => createPiece(def));
}

// Get transformed (rotated + translated) vertices for a piece
function getTransformedVertices(piece) {
  const rad = piece.rotation * Math.PI / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return piece.vertices.map(v => ({
    x: v.x * cos - v.y * sin + piece.x,
    y: v.x * sin + v.y * cos + piece.y
  }));
}

// Get bounding box of transformed piece
function getPieceBounds(piece) {
  const tv = getTransformedVertices(piece);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const v of tv) {
    if (v.x < minX) minX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.x > maxX) maxX = v.x;
    if (v.y > maxY) maxY = v.y;
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}
