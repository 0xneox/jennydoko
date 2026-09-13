import { PuzzleData, DeductionTechnique, DifficultyLevel } from '../game/types';

export const level1: PuzzleData = {
  level: 1,
  gridSize: 4,
  regions: [
    {
      id: 1,
      cells: [
        { row: 1, col: 3 },
      ],
    },
    {
      id: 2,
      cells: [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
      ],
    },
    {
      id: 3,
      cells: [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
        { row: 2, col: 1 },
      ],
    },
    {
      id: 4,
      cells: [
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
      ],
    },
  ],
  solution: [
    { row: 0, col: 1 },
    { row: 1, col: 3 },
    { row: 2, col: 0 },
    { row: 3, col: 2 },
  ],
  difficulty: 'beginner',
  techniquesRequired: ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'neighbour_elimination'],
  techniquesIntroduced: ['single_cell_colour', 'colour_unique_row', 'colour_unique_column'],
  hasLogicalStart: true,
  startingDeduction: 'Single-cell colour at (1, 3)',
  estimatedSolvingSteps: 4,
};

export const level2: PuzzleData = {
  level: 5,
  gridSize: 5,
  regions: [
    {
      id: 1,
      cells: [
        { row: 1, col: 0 },
      ],
    },
    {
      id: 2,
      cells: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ],
    },
    {
      id: 3,
      cells: [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
      ],
    },
    {
      id: 4,
      cells: [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 4, col: 0 },
        { row: 4, col: 1 },
      ],
    },
    {
      id: 5,
      cells: [
        { row: 0, col: 3 },
        { row: 0, col: 4 },
        { row: 1, col: 4 },
        { row: 2, col: 4 },
        { row: 3, col: 2 },
        { row: 3, col: 3 },
        { row: 3, col: 4 },
        { row: 4, col: 2 },
        { row: 4, col: 3 },
        { row: 4, col: 4 },
      ],
    },
  ],
  solution: [
    { row: 0, col: 2 },
    { row: 1, col: 0 },
    { row: 2, col: 3 },
    { row: 3, col: 1 },
    { row: 4, col: 4 },
  ],
  difficulty: 'easy',
  techniquesRequired: ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'neighbour_elimination', 'row_elimination'],
  techniquesIntroduced: ['row_elimination'],
  hasLogicalStart: true,
  startingDeduction: 'Single-cell colour at (1, 0)',
  estimatedSolvingSteps: 5,
};

export const level3: PuzzleData = {
  "level": 2,
  "gridSize": 4,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 1
    }
  ],
  "difficulty": "beginner",
  "techniquesRequired": [
    "single_cell_colour",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 4
};

export const level4: PuzzleData = {
  "level": 3,
  "gridSize": 4,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    }
  ],
  "difficulty": "beginner",
  "techniquesRequired": [
    "single_cell_colour",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (2, 0)",
  "estimatedSolvingSteps": 4
};

export const level5: PuzzleData = {
  "level": 4,
  "gridSize": 4,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 1
    }
  ],
  "difficulty": "easy",
  "techniquesRequired": [
    "colour_unique_row",
    "neighbour_elimination",
    "row_elimination"
  ],
  "techniquesIntroduced": [
    "colour_unique_row"
  ],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in row 0 at (0, 2)",
  "estimatedSolvingSteps": 5
};

export const level6: PuzzleData = {
  "level": 6,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 4
    }
  ],
  "difficulty": "easy",
  "techniquesRequired": [
    "colour_unique_row",
    "neighbour_elimination",
    "row_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in row 1 at (1, 0)",
  "estimatedSolvingSteps": 6
};

export const level7: PuzzleData = {
  "level": 7,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    }
  ],
  "difficulty": "easy",
  "techniquesRequired": ["colour_unique_row","neighbour_elimination","row_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in row",
  "estimatedSolvingSteps": 6
};

export const level8: PuzzleData = {
  "level": 8,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 0
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_column","neighbour_elimination","column_elimination"],
  "techniquesIntroduced": [
    "colour_unique_column"
  ],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in column",
  "estimatedSolvingSteps": 7
};

export const level9: PuzzleData = {
  "level": 9,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 2,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_column","neighbour_elimination","column_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in column",
  "estimatedSolvingSteps": 7
};

export const level10: PuzzleData = {
  "level": 10,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 0
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_column","neighbour_elimination","column_elimination","row_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Colour unique in column",
  "estimatedSolvingSteps": 8
};

export const level11: PuzzleData = {
  "level": 11,
  "gridSize": 5,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 2,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 3
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 3
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Combined row and colour deduction",
  "estimatedSolvingSteps": 8
};

export const level12: PuzzleData = {
  "level": 12,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 1,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","row_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Combined row and column deduction",
  "estimatedSolvingSteps": 10
};

export const level13: PuzzleData = {
  "level": 13,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 5,
      "col": 3
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","column_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Combined row and column deduction",
  "estimatedSolvingSteps": 10
};

export const level14: PuzzleData = {
  "level": 14,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 5,
      "col": 2
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": ["colour_unique_row","neighbour_elimination","deduction_chain"],
  "techniquesIntroduced": [
    "deduction_chain"
  ],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Neighbour elimination chain",
  "estimatedSolvingSteps": 12
};

export const level15: PuzzleData = {
  "level": 15,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": ["colour_unique_column","neighbour_elimination","deduction_chain"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Multi-step neighbour deduction",
  "estimatedSolvingSteps": 12
};

export const level16: PuzzleData = {
  "level": 16,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","deduction_chain"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Long deduction chain",
  "estimatedSolvingSteps": 13
};

export const level17: PuzzleData = {
  "level": 17,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 5,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","row_elimination"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Subtle starting bottleneck",
  "estimatedSolvingSteps": 14
};

export const level18: PuzzleData = {
  "level": 18,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 5,
      "col": 2
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","column_elimination","deduction_chain"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Deep deduction chain",
  "estimatedSolvingSteps": 14
};

export const level19: PuzzleData = {
  "level": 19,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 2
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","row_elimination","column_elimination","deduction_chain"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Advanced multi-technique deduction",
  "estimatedSolvingSteps": 15
};

export const level20: PuzzleData = {
  "level": 20,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": ["colour_unique_row","colour_unique_column","neighbour_elimination","row_elimination","column_elimination","deduction_chain"],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "6x6 Master combination deduction",
  "estimatedSolvingSteps": 16
};

/**
 * Returns a randomized version of Level 1 using symmetry transformations
 * (rotations and reflections) and shuffled region IDs/colors.
 * Guarantees identical (1, 3, 5, 7) cell counts and a unique valid solution every time.
 */
export function getRandomizedLevel1(): PuzzleData {
  const transforms = [
    (r: number, c: number) => ({ row: r, col: c }),
    (r: number, c: number) => ({ row: c, col: 3 - r }),
    (r: number, c: number) => ({ row: 3 - r, col: 3 - c }),
    (r: number, c: number) => ({ row: 3 - c, col: r }),
    (r: number, c: number) => ({ row: r, col: 3 - c }),
    (r: number, c: number) => ({ row: 3 - r, col: c }),
    (r: number, c: number) => ({ row: c, col: r }),
    (r: number, c: number) => ({ row: 3 - c, col: 3 - r }),
  ];

  const transform = transforms[Math.floor(Math.random() * transforms.length)];
  const shuffledIds = [1, 2, 3, 4].sort(() => Math.random() - 0.5);

  const transformedRegions = level1.regions.map((region, idx) => ({
    id: shuffledIds[idx],
    cells: region.cells.map(cell => transform(cell.row, cell.col)),
  }));

  const transformedSolution = level1.solution.map(cell => transform(cell.row, cell.col));

  return {
    ...level1,
    regions: transformedRegions,
    solution: transformedSolution,
  };
}

export const level21: PuzzleData = {
  "level": 21,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 12
};

export const level22: PuzzleData = {
  "level": 22,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 0
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 12
};

export const level23: PuzzleData = {
  "level": 23,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 12
};

export const level24: PuzzleData = {
  "level": 24,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 12
};

export const level25: PuzzleData = {
  "level": 25,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 4)",
  "estimatedSolvingSteps": 12
};

export const level26: PuzzleData = {
  "level": 36,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 5
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 4)",
  "estimatedSolvingSteps": 14
};

export const level27: PuzzleData = {
  "level": 37,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 14
};

export const level28: PuzzleData = {
  "level": 38,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 14
};

export const level29: PuzzleData = {
  "level": 39,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 6
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 6
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 2
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 6)",
  "estimatedSolvingSteps": 14
};

export const level30: PuzzleData = {
  "level": 40,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level31: PuzzleData = {
  "level": 41,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 1
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 14
};

export const level32: PuzzleData = {
  "level": 42,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 0
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 0
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level33: PuzzleData = {
  "level": 43,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 14
};

export const level34: PuzzleData = {
  "level": 44,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level35: PuzzleData = {
  "level": 45,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 14
};

export const level36: PuzzleData = {
  "level": 56,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 16
};

export const level37: PuzzleData = {
  "level": 57,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 7
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 16
};

export const level38: PuzzleData = {
  "level": 58,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 16
};

export const level39: PuzzleData = {
  "level": 59,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 16
};

export const level40: PuzzleData = {
  "level": 60,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 3
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 16
};

export const level41: PuzzleData = {
  "level": 71,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 18
};

export const level42: PuzzleData = {
  "level": 72,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 8,
      "col": 7
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 18
};

export const level43: PuzzleData = {
  "level": 73,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 18
};

export const level44: PuzzleData = {
  "level": 74,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 18
};

export const level45: PuzzleData = {
  "level": 75,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 8,
      "col": 7
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 18
};

export const level46: PuzzleData = {
  "level": 86,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 9
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 9,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 20
};

export const level47: PuzzleData = {
  "level": 87,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 9,
          "col": 7
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 9
    },
    {
      "row": 9,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 20
};

export const level48: PuzzleData = {
  "level": 88,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 8
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 9,
          "col": 0
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 9
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 9,
      "col": 3
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 8)",
  "estimatedSolvingSteps": 20
};

export const level49: PuzzleData = {
  "level": 89,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 9
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 8
    },
    {
      "row": 9,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 20
};

export const level50: PuzzleData = {
  "level": 90,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 9,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 9
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 7,
      "col": 4
    },
    {
      "row": 8,
      "col": 2
    },
    {
      "row": 9,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 20
};

export const level51: PuzzleData = {
  "level": 26,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 1
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 12
};

export const level52: PuzzleData = {
  "level": 27,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (3, 3)",
  "estimatedSolvingSteps": 12
};

export const level53: PuzzleData = {
  "level": 28,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 12
};

export const level54: PuzzleData = {
  "level": 29,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 12
};

export const level55: PuzzleData = {
  "level": 30,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 2
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 12
};

export const level56: PuzzleData = {
  "level": 31,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 5,
      "col": 3
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 12
};

export const level57: PuzzleData = {
  "level": 32,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 12
};

export const level58: PuzzleData = {
  "level": 33,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 4
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (5, 4)",
  "estimatedSolvingSteps": 12
};

export const level59: PuzzleData = {
  "level": 34,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 1
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 12
};

export const level60: PuzzleData = {
  "level": 35,
  "gridSize": 6,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    }
  ],
  "difficulty": "medium",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 12
};

export const level61: PuzzleData = {
  "level": 46,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 14
};

export const level62: PuzzleData = {
  "level": 47,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 14
};

export const level63: PuzzleData = {
  "level": 48,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 6
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level64: PuzzleData = {
  "level": 49,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 4
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (3, 3)",
  "estimatedSolvingSteps": 14
};

export const level65: PuzzleData = {
  "level": 50,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level66: PuzzleData = {
  "level": 51,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 14
};

export const level67: PuzzleData = {
  "level": 52,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 3
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 14
};

export const level68: PuzzleData = {
  "level": 53,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 2
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 2
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 2
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 14
};

export const level69: PuzzleData = {
  "level": 54,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 5
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 14
};

export const level70: PuzzleData = {
  "level": 55,
  "gridSize": 7,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 6,
      "col": 0
    }
  ],
  "difficulty": "hard",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 14
};

export const level71: PuzzleData = {
  "level": 61,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 7,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 16
};

export const level72: PuzzleData = {
  "level": 62,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 16
};

export const level73: PuzzleData = {
  "level": 63,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 5
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 16
};

export const level74: PuzzleData = {
  "level": 64,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 5
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 16
};

export const level75: PuzzleData = {
  "level": 65,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 16
};

export const level76: PuzzleData = {
  "level": 66,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 16
};

export const level77: PuzzleData = {
  "level": 67,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 7
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 16
};

export const level78: PuzzleData = {
  "level": 68,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 7,
      "col": 4
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 16
};

export const level79: PuzzleData = {
  "level": 69,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 6
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 1
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 16
};

export const level80: PuzzleData = {
  "level": 70,
  "gridSize": 8,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 6
    }
  ],
  "difficulty": "expert",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 16
};

export const level81: PuzzleData = {
  "level": 76,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 18
};

export const level82: PuzzleData = {
  "level": 77,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 18
};

export const level83: PuzzleData = {
  "level": 78,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 8
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 8,
          "col": 6
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 8,
      "col": 5
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 18
};

export const level84: PuzzleData = {
  "level": 79,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 7
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 1
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 4)",
  "estimatedSolvingSteps": 18
};

export const level85: PuzzleData = {
  "level": 80,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 1
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 1
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 18
};

export const level86: PuzzleData = {
  "level": 81,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 8
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 4
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 18
};

export const level87: PuzzleData = {
  "level": 82,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 8
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 4
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 4
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 18
};

export const level88: PuzzleData = {
  "level": 83,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 5
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 8
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 3
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 5)",
  "estimatedSolvingSteps": 18
};

export const level89: PuzzleData = {
  "level": 84,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 7
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 7
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 3
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 7)",
  "estimatedSolvingSteps": 18
};

export const level90: PuzzleData = {
  "level": 85,
  "gridSize": 9,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 8
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 0
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 8,
      "col": 6
    }
  ],
  "difficulty": "master",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 18
};

export const level91: PuzzleData = {
  "level": 91,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 1
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 9,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 9
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 9
    },
    {
      "row": 9,
      "col": 7
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 1)",
  "estimatedSolvingSteps": 20
};

export const level92: PuzzleData = {
  "level": 92,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 3
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 7
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 9
    },
    {
      "row": 9,
      "col": 7
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 3)",
  "estimatedSolvingSteps": 20
};

export const level93: PuzzleData = {
  "level": 93,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 4
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 8
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 4,
      "col": 9
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 9,
      "col": 8
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 4)",
  "estimatedSolvingSteps": 20
};

export const level94: PuzzleData = {
  "level": 94,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 8
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 2,
          "col": 8
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 8,
          "col": 3
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 9
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 9,
      "col": 3
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 8)",
  "estimatedSolvingSteps": 20
};

export const level95: PuzzleData = {
  "level": 95,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 5,
      "col": 9
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 8,
      "col": 3
    },
    {
      "row": 9,
      "col": 5
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 20
};

export const level96: PuzzleData = {
  "level": 96,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 2
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 4,
          "col": 8
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 4
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 9
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 9,
      "col": 4
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 2)",
  "estimatedSolvingSteps": 20
};

export const level97: PuzzleData = {
  "level": 97,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 9,
          "col": 2
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 7
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 7,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 6
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 9
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 9,
      "col": 6
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 20
};

export const level98: PuzzleData = {
  "level": 98,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 8
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 9,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 8,
          "col": 1
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 9
        },
        {
          "row": 5,
          "col": 8
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 1
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 9
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 8,
      "col": 3
    },
    {
      "row": 9,
      "col": 1
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 8)",
  "estimatedSolvingSteps": 20
};

export const level99: PuzzleData = {
  "level": 99,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 0
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 0,
          "col": 8
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 5,
          "col": 0
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 1
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 5,
          "col": 3
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 6,
          "col": 8
        },
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 3
        },
        {
          "row": 9,
          "col": 4
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 9
        },
        {
          "row": 7,
          "col": 8
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 5
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 7,
      "col": 9
    },
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 9,
      "col": 5
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 0)",
  "estimatedSolvingSteps": 20
};

export const level100: PuzzleData = {
  "level": 100,
  "gridSize": 10,
  "regions": [
    {
      "id": 1,
      "cells": [
        {
          "row": 0,
          "col": 8
        }
      ]
    },
    {
      "id": 2,
      "cells": [
        {
          "row": 1,
          "col": 1
        },
        {
          "row": 0,
          "col": 1
        },
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 2
        },
        {
          "row": 0,
          "col": 3
        },
        {
          "row": 0,
          "col": 4
        },
        {
          "row": 0,
          "col": 5
        },
        {
          "row": 0,
          "col": 6
        },
        {
          "row": 0,
          "col": 7
        },
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 2
        },
        {
          "row": 1,
          "col": 3
        },
        {
          "row": 1,
          "col": 4
        },
        {
          "row": 1,
          "col": 5
        },
        {
          "row": 1,
          "col": 6
        },
        {
          "row": 1,
          "col": 7
        },
        {
          "row": 1,
          "col": 8
        },
        {
          "row": 1,
          "col": 9
        },
        {
          "row": 0,
          "col": 9
        },
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        },
        {
          "row": 2,
          "col": 2
        },
        {
          "row": 2,
          "col": 3
        },
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        },
        {
          "row": 3,
          "col": 2
        },
        {
          "row": 4,
          "col": 0
        },
        {
          "row": 4,
          "col": 1
        },
        {
          "row": 4,
          "col": 2
        },
        {
          "row": 5,
          "col": 0
        },
        {
          "row": 5,
          "col": 1
        },
        {
          "row": 5,
          "col": 2
        },
        {
          "row": 6,
          "col": 0
        },
        {
          "row": 6,
          "col": 1
        }
      ]
    },
    {
      "id": 3,
      "cells": [
        {
          "row": 2,
          "col": 6
        },
        {
          "row": 2,
          "col": 5
        },
        {
          "row": 2,
          "col": 7
        },
        {
          "row": 2,
          "col": 8
        },
        {
          "row": 2,
          "col": 9
        }
      ]
    },
    {
      "id": 4,
      "cells": [
        {
          "row": 3,
          "col": 4
        },
        {
          "row": 2,
          "col": 4
        },
        {
          "row": 3,
          "col": 3
        },
        {
          "row": 3,
          "col": 5
        },
        {
          "row": 3,
          "col": 6
        },
        {
          "row": 3,
          "col": 7
        },
        {
          "row": 3,
          "col": 8
        },
        {
          "row": 3,
          "col": 9
        },
        {
          "row": 4,
          "col": 3
        },
        {
          "row": 4,
          "col": 4
        },
        {
          "row": 5,
          "col": 3
        }
      ]
    },
    {
      "id": 5,
      "cells": [
        {
          "row": 4,
          "col": 7
        },
        {
          "row": 4,
          "col": 6
        },
        {
          "row": 4,
          "col": 8
        },
        {
          "row": 4,
          "col": 9
        }
      ]
    },
    {
      "id": 6,
      "cells": [
        {
          "row": 5,
          "col": 5
        },
        {
          "row": 4,
          "col": 5
        },
        {
          "row": 5,
          "col": 4
        },
        {
          "row": 5,
          "col": 6
        },
        {
          "row": 5,
          "col": 7
        },
        {
          "row": 5,
          "col": 8
        },
        {
          "row": 5,
          "col": 9
        }
      ]
    },
    {
      "id": 7,
      "cells": [
        {
          "row": 6,
          "col": 9
        },
        {
          "row": 6,
          "col": 8
        }
      ]
    },
    {
      "id": 8,
      "cells": [
        {
          "row": 7,
          "col": 2
        },
        {
          "row": 6,
          "col": 2
        },
        {
          "row": 6,
          "col": 3
        },
        {
          "row": 6,
          "col": 4
        },
        {
          "row": 6,
          "col": 5
        },
        {
          "row": 6,
          "col": 6
        },
        {
          "row": 6,
          "col": 7
        },
        {
          "row": 7,
          "col": 1
        },
        {
          "row": 7,
          "col": 3
        },
        {
          "row": 7,
          "col": 4
        },
        {
          "row": 7,
          "col": 5
        },
        {
          "row": 7,
          "col": 6
        },
        {
          "row": 7,
          "col": 7
        },
        {
          "row": 7,
          "col": 8
        },
        {
          "row": 7,
          "col": 9
        }
      ]
    },
    {
      "id": 9,
      "cells": [
        {
          "row": 8,
          "col": 0
        },
        {
          "row": 7,
          "col": 0
        },
        {
          "row": 8,
          "col": 1
        },
        {
          "row": 8,
          "col": 2
        },
        {
          "row": 8,
          "col": 3
        },
        {
          "row": 8,
          "col": 4
        },
        {
          "row": 8,
          "col": 5
        },
        {
          "row": 8,
          "col": 6
        },
        {
          "row": 8,
          "col": 7
        },
        {
          "row": 8,
          "col": 8
        },
        {
          "row": 8,
          "col": 9
        },
        {
          "row": 9,
          "col": 0
        },
        {
          "row": 9,
          "col": 1
        },
        {
          "row": 9,
          "col": 2
        },
        {
          "row": 9,
          "col": 4
        },
        {
          "row": 9,
          "col": 5
        },
        {
          "row": 9,
          "col": 6
        },
        {
          "row": 9,
          "col": 7
        },
        {
          "row": 9,
          "col": 8
        },
        {
          "row": 9,
          "col": 9
        }
      ]
    },
    {
      "id": 10,
      "cells": [
        {
          "row": 9,
          "col": 3
        }
      ]
    }
  ],
  "solution": [
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 9
    },
    {
      "row": 7,
      "col": 2
    },
    {
      "row": 8,
      "col": 0
    },
    {
      "row": 9,
      "col": 3
    }
  ],
  "difficulty": "legend",
  "techniquesRequired": [
    "single_cell_colour",
    "row_elimination",
    "column_elimination",
    "neighbour_elimination"
  ],
  "techniquesIntroduced": [],
  "hasLogicalStart": true,
  "startingDeduction": "Single-cell colour at (0, 8)",
  "estimatedSolvingSteps": 20
};

export const puzzles: PuzzleData[] = [
  level1,
  level3,
  level4,
  level5,
  level2,
  level6,
  level7,
  level8,
  level9,
  level10,
  level11,
  level12,
  level13,
  level14,
  level15,
  level16,
  level17,
  level18,
  level19,
  level20,
  level21,
  level22,
  level23,
  level24,
  level25,
  level51,
  level52,
  level53,
  level54,
  level55,
  level56,
  level57,
  level58,
  level59,
  level60,
  level26,
  level27,
  level28,
  level29,
  level30,
  level31,
  level32,
  level33,
  level34,
  level35,
  level61,
  level62,
  level63,
  level64,
  level65,
  level66,
  level67,
  level68,
  level69,
  level70,
  level36,
  level37,
  level38,
  level39,
  level40,
  level71,
  level72,
  level73,
  level74,
  level75,
  level76,
  level77,
  level78,
  level79,
  level80,
  level41,
  level42,
  level43,
  level44,
  level45,
  level81,
  level82,
  level83,
  level84,
  level85,
  level86,
  level87,
  level88,
  level89,
  level90,
  level46,
  level47,
  level48,
  level49,
  level50,
  level91,
  level92,
  level93,
  level94,
  level95,
  level96,
  level97,
  level98,
  level99,
  level100,
];
