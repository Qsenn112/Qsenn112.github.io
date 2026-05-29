// ============================================================
// levels.js — 10 level data with silhouette definitions
// ============================================================

// Silhouettes are arrays of polygons (each polygon = array of vertices)
// All coordinates are in a 0-200 range (matches the offscreen IoU canvas)

const LEVELS = [
  // ── Level 1-3: Geometric Shapes ──
  {
    id: 1,
    name: '정사각형',
    category: '도형',
    timeLimit: 90,
    baseScore: 100,
    silhouette: [
      // A large square filling most of the target area
      [
        {x: 20, y: 20}, {x: 180, y: 20},
        {x: 180, y: 180}, {x: 20, y: 180}
      ]
    ]
  },
  {
    id: 2,
    name: '직사각형',
    category: '도형',
    timeLimit: 90,
    baseScore: 100,
    silhouette: [
      [
        {x: 10, y: 50}, {x: 190, y: 50},
        {x: 190, y: 150}, {x: 10, y: 150}
      ]
    ]
  },
  {
    id: 3,
    name: '큰 삼각형',
    category: '도형',
    timeLimit: 90,
    baseScore: 100,
    silhouette: [
      [
        {x: 100, y: 10}, {x: 190, y: 190}, {x: 10, y: 190}
      ]
    ]
  },

  // ── Level 4-6: Objects ──
  {
    id: 4,
    name: '집',
    category: '사물',
    timeLimit: 120,
    baseScore: 100,
    silhouette: [
      // House body (square)
      [
        {x: 30, y: 70}, {x: 170, y: 70},
        {x: 170, y: 180}, {x: 30, y: 180}
      ],
      // Roof (triangle)
      [
        {x: 20, y: 70}, {x: 100, y: 10}, {x: 180, y: 70}
      ]
    ]
  },
  {
    id: 5,
    name: '배',
    category: '사물',
    timeLimit: 120,
    baseScore: 100,
    silhouette: [
      // Boat hull
      [
        {x: 30, y: 100}, {x: 50, y: 60},
        {x: 150, y: 60}, {x: 170, y: 100}
      ],
      // Sail (triangle)
      [
        {x: 100, y: 10}, {x: 140, y: 90}, {x: 60, y: 90}
      ]
    ]
  },
  {
    id: 6,
    name: '화살표',
    category: '사물',
    timeLimit: 120,
    baseScore: 100,
    silhouette: [
      // Arrow head (triangle)
      [
        {x: 140, y: 20}, {x: 190, y: 90}, {x: 140, y: 160}
      ],
      // Arrow shaft (rectangle)
      [
        {x: 30, y: 70}, {x: 140, y: 70},
        {x: 140, y: 110}, {x: 30, y: 110}
      ],
      // Arrow tail top
      [
        {x: 10, y: 30}, {x: 40, y: 70}, {x: 30, y: 70}
      ],
      // Arrow tail bottom
      [
        {x: 10, y: 150}, {x: 40, y: 110}, {x: 30, y: 110}
      ]
    ]
  },

  // ── Level 7-10: Animals ──
  {
    id: 7,
    name: '토끼',
    category: '동물',
    timeLimit: 150,
    baseScore: 100,
    silhouette: [
      // Body
      [
        {x: 40, y: 70}, {x: 150, y: 70},
        {x: 150, y: 150}, {x: 40, y: 150}
      ],
      // Head
      [
        {x: 50, y: 30}, {x: 110, y: 30},
        {x: 110, y: 70}, {x: 50, y: 70}
      ],
      // Left ear
      [
        {x: 55, y: 10}, {x: 75, y: 10},
        {x: 70, y: 35}, {x: 55, y: 35}
      ],
      // Right ear
      [
        {x: 85, y: 10}, {x: 105, y: 10},
        {x: 105, y: 35}, {x: 85, y: 35}
      ]
    ]
  },
  {
    id: 8,
    name: '고양이',
    category: '동물',
    timeLimit: 150,
    baseScore: 100,
    silhouette: [
      // Body (square-ish)
      [
        {x: 50, y: 80}, {x: 150, y: 80},
        {x: 150, y: 160}, {x: 50, y: 160}
      ],
      // Head
      [
        {x: 40, y: 30}, {x: 110, y: 30},
        {x: 110, y: 80}, {x: 40, y: 80}
      ],
      // Left ear
      [
        {x: 45, y: 5}, {x: 70, y: 5},
        {x: 55, y: 30}, {x: 45, y: 30}
      ],
      // Right ear
      [
        {x: 80, y: 5}, {x: 105, y: 5},
        {x: 105, y: 30}, {x: 90, y: 30}
      ],
      // Tail
      [
        {x: 10, y: 100}, {x: 50, y: 100},
        {x: 40, y: 130}, {x: 10, y: 130}
      ]
    ]
  },
  {
    id: 9,
    name: '백조',
    category: '동물',
    timeLimit: 150,
    baseScore: 100,
    silhouette: [
      // Body (long)
      [
        {x: 20, y: 120}, {x: 160, y: 120},
        {x: 160, y: 170}, {x: 20, y: 170}
      ],
      // Neck and head
      [
        {x: 150, y: 30}, {x: 180, y: 30},
        {x: 180, y: 120}, {x: 150, y: 120}
      ],
      // Beak
      [
        {x: 170, y: 15}, {x: 190, y: 15},
        {x: 185, y: 30}, {x: 170, y: 30}
      ],
      // Wing
      [
        {x: 40, y: 60}, {x: 120, y: 50},
        {x: 130, y: 80}, {x: 40, y: 90}
      ]
    ]
  },
  {
    id: 10,
    name: '여우',
    category: '동물',
    timeLimit: 180,
    baseScore: 100,
    silhouette: [
      // Body
      [
        {x: 40, y: 80}, {x: 140, y: 80},
        {x: 140, y: 150}, {x: 40, y: 150}
      ],
      // Head
      [
        {x: 30, y: 30}, {x: 90, y: 30},
        {x: 90, y: 80}, {x: 30, y: 80}
      ],
      // Left ear
      [
        {x: 30, y: 5}, {x: 55, y: 5},
        {x: 40, y: 30}, {x: 30, y: 30}
      ],
      // Right ear
      [
        {x: 65, y: 5}, {x: 90, y: 5},
        {x: 90, y: 30}, {x: 75, y: 30}
      ],
      // Tail (big and fluffy)
      [
        {x: 5, y: 90}, {x: 45, y: 80},
        {x: 50, y: 120}, {x: 15, y: 140}
      ]
    ]
  }
];
