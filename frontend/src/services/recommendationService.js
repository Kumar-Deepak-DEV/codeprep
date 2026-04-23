// Curated benchmark problems per DSA pattern
const CURATED_PROBLEMS = [
  // Arrays & Hashing
  {
    id: "two-sum",
    title: "Two Sum",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Array,Hash Table",
    link: "https://leetcode.com/problems/two-sum/",
    pattern: "Arrays & Hashing",
    rationale: "Foundational hash map lookup pattern"
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Array,Hash Table,String",
    link: "https://leetcode.com/problems/group-anagrams/",
    pattern: "Arrays & Hashing",
    rationale: "Essential frequency & sorting hashing technique"
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Array,Hash Table,Heap",
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
    pattern: "Arrays & Hashing",
    rationale: "Bucket sort & frequency counting benchmark"
  },

  // Two Pointers
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Two Pointers,String",
    link: "https://leetcode.com/problems/valid-palindrome/",
    pattern: "Two Pointers",
    rationale: "Classic two-pointer convergence pattern"
  },
  {
    id: "3sum",
    title: "3Sum",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Two Pointers,Array,Sorting",
    link: "https://leetcode.com/problems/3sum/",
    pattern: "Two Pointers",
    rationale: "Two pointers with sorting and duplicate handling"
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Two Pointers,Array,Greedy",
    link: "https://leetcode.com/problems/container-with-most-water/",
    pattern: "Two Pointers",
    rationale: "Greedy two-pointer optimization"
  },

  // Sliding Window
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Array,Dynamic Programming",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    pattern: "Sliding Window",
    rationale: "Fundamental single-pass running minimum window"
  },
  {
    id: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Sliding Window,Hash Table,String",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    pattern: "Sliding Window",
    rationale: "Core dynamic-size sliding window with hash set"
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    platform: "leetcode",
    difficulty: "Hard",
    topic: "Sliding Window,Hash Table,String",
    link: "https://leetcode.com/problems/minimum-window-substring/",
    pattern: "Sliding Window",
    rationale: "Advanced frequency constraint window matching"
  },

  // Binary Search
  {
    id: "binary-search",
    title: "Binary Search",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Binary Search,Array",
    link: "https://leetcode.com/problems/binary-search/",
    pattern: "Binary Search",
    rationale: "Baseline O(log n) divide and conquer pattern"
  },
  {
    id: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Binary Search,Array,Matrix",
    link: "https://leetcode.com/problems/search-a-2d-matrix/",
    pattern: "Binary Search",
    rationale: "Virtual 1D mapping on sorted matrices"
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Binary Search,Array",
    link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    pattern: "Binary Search",
    rationale: "Rotated array inflection point detection"
  },

  // Trees & BST
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Tree,Depth-First Search,Binary Tree",
    link: "https://leetcode.com/problems/invert-binary-tree/",
    pattern: "Trees",
    rationale: "Foundational recursive tree manipulation"
  },
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Tree,Breadth-First Search,Binary Tree",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    pattern: "Trees",
    rationale: "Queue-based BFS level-by-level traversal"
  },
  {
    id: "lowest-common-ancestor-of-a-binary-search-tree",
    title: "Lowest Common Ancestor of a BST",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Tree,BST,Binary Search Tree",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    pattern: "Trees",
    rationale: "Leveraging BST ordering properties"
  },
  {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Tree,Depth-First Search,BST",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
    pattern: "Trees",
    rationale: "Range boundary propagation in BSTs"
  },

  // Graphs
  {
    id: "number-of-islands",
    title: "Number of Islands",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Graph,Depth-First Search,Breadth-First Search,Matrix",
    link: "https://leetcode.com/problems/number-of-islands/",
    pattern: "Graphs",
    rationale: "Classic 2D grid connected components search"
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Graph,Depth-First Search,Breadth-First Search,Hash Table",
    link: "https://leetcode.com/problems/clone-graph/",
    pattern: "Graphs",
    rationale: "Graph copying with cycle detection via hash map"
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Graph,Topological Sort,Depth-First Search",
    link: "https://leetcode.com/problems/course-schedule/",
    pattern: "Graphs",
    rationale: "Directed cycle detection & Topological Sort"
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Graph,Depth-First Search,Matrix",
    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    pattern: "Graphs",
    rationale: "Multi-source reverse traversal on matrices"
  },

  // Dynamic Programming
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    platform: "leetcode",
    difficulty: "Easy",
    topic: "Dynamic Programming,Math",
    link: "https://leetcode.com/problems/climbing-stairs/",
    pattern: "Dynamic Programming",
    rationale: "Introduction to overlapping subproblems & tabulation"
  },
  {
    id: "house-robber",
    title: "House Robber",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Dynamic Programming,Array",
    link: "https://leetcode.com/problems/house-robber/",
    pattern: "Dynamic Programming",
    rationale: "1D DP choice optimization (pick vs skip)"
  },
  {
    id: "coin-change",
    title: "Coin Change",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Dynamic Programming,Breadth-First Search",
    link: "https://leetcode.com/problems/coin-change/",
    pattern: "Dynamic Programming",
    rationale: "Unbounded Knapsack & minimum cost state transition"
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Dynamic Programming,Binary Search",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/",
    pattern: "Dynamic Programming",
    rationale: "Classic O(n^2) DP transitioning to O(n log n) with binary search"
  },

  // Heaps / Priority Queue
  {
    id: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Heap,Priority Queue,Array,Quickselect",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    pattern: "Heaps",
    rationale: "Min-heap maintenance for top-K elements"
  },
  {
    id: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    platform: "leetcode",
    difficulty: "Hard",
    topic: "Heap,Priority Queue,Design",
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
    pattern: "Heaps",
    rationale: "Two-heap balancing for continuous median queries"
  },

  // Backtracking
  {
    id: "subsets",
    title: "Subsets",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Backtracking,Array,Bit Manipulation",
    link: "https://leetcode.com/problems/subsets/",
    pattern: "Backtracking",
    rationale: "Power set generation with decision tree traversal"
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Backtracking,Array",
    link: "https://leetcode.com/problems/combination-sum/",
    pattern: "Backtracking",
    rationale: "Target search with reusable candidate elements"
  },
  {
    id: "word-search",
    title: "Word Search",
    platform: "leetcode",
    difficulty: "Medium",
    topic: "Backtracking,Matrix,Array",
    link: "https://leetcode.com/problems/word-search/",
    pattern: "Backtracking",
    rationale: "2D matrix path exploration with visited state rollback"
  }
];

// Target benchmark solve count per topic for standard interview readiness
const TOPIC_BENCHMARKS = {
  "Array": 20,
  "Hash Table": 15,
  "Two Pointers": 10,
  "Sliding Window": 10,
  "Binary Search": 12,
  "Tree": 15,
  "Depth-First Search": 15,
  "Breadth-First Search": 12,
  "Graph": 12,
  "Dynamic Programming": 15,
  "Heap": 8,
  "Backtracking": 8,
  "Greedy": 10,
  "String": 15
};

const COMPLETED_KEY = "codeprep_completed_recs";
const SKIPPED_KEY = "codeprep_skipped_recs";
const BOOKMARKS_KEY = "codeprep_bookmarked_recs";

export const getStoredList = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

export const setStoredList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (err) {
    console.error("Storage error:", err);
  }
};

/* Analyze topic counts against benchmarks to identify weak areas */
export const getWeakTopics = (topicCounts = {}) => {
  const topics = Object.entries(TOPIC_BENCHMARKS).map(([topic, benchmark]) => {
    // Look up topic case-insensitively or via partial match
    let current = 0;
    Object.keys(topicCounts).forEach((k) => {
      if (k.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(k.toLowerCase())) {
        current = Math.max(current, topicCounts[k] || 0);
      }
    });

    const percent = Math.min(100, Math.round((current / benchmark) * 100));
    return {
      topic,
      current,
      benchmark,
      percent,
      deficit: Math.max(0, benchmark - current)
    };
  });

  // Sort by lowest percentage/highest deficit first
  return topics.sort((a, b) => a.percent - b.percent);
};

/* Generate personalized practice recommendations based on solved history */
export const getRecommendations = (solvedProblems = [], topicCounts = {}, limit = 4) => {
  const completedStored = new Set(getStoredList(COMPLETED_KEY));
  const skippedStored = new Set(getStoredList(SKIPPED_KEY));
  const bookmarkedStored = new Set(getStoredList(BOOKMARKS_KEY));

  // Build a set of solved problem slugs and titles (normalized)
  const solvedSet = new Set();
  solvedProblems.forEach((p) => {
    if (p.problemNumber) solvedSet.add(p.problemNumber.toLowerCase());
    if (p.title) solvedSet.add(p.title.toLowerCase().replace(/[^a-z0-9]/g, ""));
  });

  const weakTopics = getWeakTopics(topicCounts);
  const weakTopicNames = new Set(weakTopics.slice(0, 5).map((w) => w.topic.toLowerCase()));

  // Filter available curated problems
  const available = CURATED_PROBLEMS.filter((p) => {
    const normalizedTitle = p.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (solvedSet.has(p.id.toLowerCase()) || solvedSet.has(normalizedTitle)) return false;
    if (completedStored.has(p.id)) return false;
    return true;
  });

  // Score problems: prioritize weak topics, non-skipped, and bookmarked
  const scored = available.map((problem) => {
    let score = 50;
    const isBookmarked = bookmarkedStored.has(problem.id);
    const isSkipped = skippedStored.has(problem.id);

    // Check if problem topics intersect with weak topics
    const problemTopics = problem.topic.toLowerCase().split(",");
    const isWeak = problemTopics.some((t) =>
      Array.from(weakTopicNames).some((w) => t.includes(w) || w.includes(t))
    );

    if (isWeak) score += 40;
    if (isBookmarked) score += 30;
    if (isSkipped) score -= 30;

    let reason = problem.rationale;
    if (isWeak) {
      reason = `Targeted practice for under-represented topic (${problem.pattern})`;
    }

    return {
      ...problem,
      score,
      isBookmarked,
      isWeak,
      reason
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
};

export const markRecommendationCompleted = (problemId) => {
  const list = getStoredList(COMPLETED_KEY);
  if (!list.includes(problemId)) {
    list.push(problemId);
    setStoredList(COMPLETED_KEY, list);
  }
};

export const markRecommendationSkipped = (problemId) => {
  const list = getStoredList(SKIPPED_KEY);
  if (!list.includes(problemId)) {
    list.push(problemId);
    setStoredList(SKIPPED_KEY, list);
  }
};

export const toggleBookmarkProblem = (problemId) => {
  let list = getStoredList(BOOKMARKS_KEY);
  if (list.includes(problemId)) {
    list = list.filter((id) => id !== problemId);
  } else {
    list.push(problemId);
  }
  setStoredList(BOOKMARKS_KEY, list);
  return list.includes(problemId);
};
