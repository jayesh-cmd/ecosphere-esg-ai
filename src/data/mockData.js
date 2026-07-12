// ============================================================
// EcoSphere — All Mock Data
// ============================================================

// --- ESG Scores ---
export const esgScores = {
  environmental: 78,
  social: 85,
  governance: 72,
  overall: 78,
};

// --- Score Trend (last 6 months) ---
export const scoreTrend = [
  { month: 'Feb', environmental: 65, social: 70, governance: 60, overall: 65 },
  { month: 'Mar', environmental: 68, social: 74, governance: 63, overall: 68 },
  { month: 'Apr', environmental: 71, social: 78, governance: 67, overall: 72 },
  { month: 'May', environmental: 74, social: 80, governance: 69, overall: 74 },
  { month: 'Jun', environmental: 76, social: 83, governance: 70, overall: 76 },
  { month: 'Jul', environmental: 78, social: 85, governance: 72, overall: 78 },
];

// --- Department Rankings ---
export const departments = [
  { id: 1, name: 'Engineering',    environmental: 83, social: 87, governance: 79, total: 83 },
  { id: 2, name: 'HR',             environmental: 74, social: 93, governance: 77, total: 81 },
  { id: 3, name: 'IT',             environmental: 80, social: 84, governance: 82, total: 82 },
  { id: 4, name: 'Marketing',      environmental: 71, social: 89, governance: 66, total: 75 },
  { id: 5, name: 'Sales',          environmental: 67, social: 88, governance: 64, total: 73 },
  { id: 6, name: 'Logistics',      environmental: 61, social: 76, governance: 71, total: 69 },
  { id: 7, name: 'Manufacturing',  environmental: 58, social: 72, governance: 68, total: 66 },
];

// --- Carbon Transactions ---
export const carbonTransactions = [
  { id: 1, department: 'Engineering',  amount: -120, date: '2026-07-01', source: 'Server Power'        },
  { id: 2, department: 'Operations',   amount: -100, date: '2026-06-25', source: 'Fleet Vehicles'      },
  { id: 3, department: 'Operations',   amount: -110, date: '2026-06-28', source: 'Fleet Vehicles'      },
  { id: 4, department: 'Operations',   amount: -105, date: '2026-07-02', source: 'Fleet Vehicles'      },
  { id: 5, department: 'Operations',   amount: -450, date: '2026-07-10', source: 'Fleet Vehicles'      }, // Anomaly spike!
  { id: 6, department: 'Marketing',    amount:  +80, date: '2026-07-03', source: 'Carbon Offset Buy'   },
  { id: 7, department: 'Finance',      amount:  -50, date: '2026-07-04', source: 'Office HVAC'         },
  { id: 8, department: 'HR',           amount: +150, date: '2026-07-05', source: 'Tree Planting Drive' },
  { id: 9, department: 'Engineering',  amount:  +60, date: '2026-07-07', source: 'Solar Panel Output'  },
  { id: 10, department: 'Legal',       amount:  -30, date: '2026-07-08', source: 'Office Equipment'    },
];

// --- Sustainability Goals ---
export const sustainabilityGoals = [
  { id: 1, title: 'Reduce Carbon Emissions 30%',       progress: 68, target: '2026-12-31', color: 'green'  },
  { id: 2, title: 'Achieve 50% Renewable Energy',      progress: 45, target: '2027-06-30', color: 'green'  },
  { id: 3, title: 'Zero Waste to Landfill',            progress: 32, target: '2027-12-31', color: 'emerald'},
  { id: 4, title: 'Plant 10,000 Trees',                progress: 87, target: '2026-09-30', color: 'teal'   },
  { id: 5, title: 'Water Usage Reduction 20%',         progress: 55, target: '2026-12-31', color: 'cyan'   },
];

// --- CSR Activities ---
export const csrActivities = [
  { id: 1, name: 'Community Clean-Up Drive',     category: 'Environment', points: 200, status: 'Approved'  },
  { id: 2, name: 'Digital Literacy Workshop',    category: 'Education',   points: 150, status: 'Approved'  },
  { id: 3, name: 'Blood Donation Camp',          category: 'Health',      points: 300, status: 'Pending'   },
  { id: 4, name: 'Women Entrepreneurship Fair',  category: 'Diversity',   points: 250, status: 'Approved'  },
  { id: 5, name: 'Food Bank Volunteering',       category: 'Community',   points: 180, status: 'Rejected'  },
  { id: 6, name: 'Coding Bootcamp for Youth',    category: 'Education',   points: 220, status: 'Pending'   },
];

// --- Employee Participation ---
export const employeeParticipation = [
  { id: 1, employee: 'Priya Sharma',    activity: 'Community Clean-Up Drive',    status: 'Completed', points: 200 },
  { id: 2, employee: 'Rohan Mehta',     activity: 'Digital Literacy Workshop',   status: 'Completed', points: 150 },
  { id: 3, employee: 'Ananya Patel',    activity: 'Blood Donation Camp',         status: 'Pending',   points: 0   },
  { id: 4, employee: 'Vikram Singh',    activity: 'Women Entrepreneurship Fair', status: 'Completed', points: 250 },
  { id: 5, employee: 'Kavya Reddy',     activity: 'Food Bank Volunteering',      status: 'Rejected',  points: 0   },
  { id: 6, employee: 'Arjun Nair',      activity: 'Coding Bootcamp for Youth',   status: 'In Progress', points: 0 },
  { id: 7, employee: 'Deepa Krishnan',  activity: 'Community Clean-Up Drive',    status: 'Completed', points: 200 },
];

// --- Compliance Issues ---
export const complianceIssues = [
  { id: 1, description: 'GDPR Data Retention Policy Breach',     severity: 'Critical', owner: 'Legal',    dueDate: '2026-07-05', status: 'Overdue'     },
  { id: 2, description: 'ISO 14001 Audit Documentation Missing', severity: 'High',     owner: 'Ops',      dueDate: '2026-07-20', status: 'In Progress'  },
  { id: 3, description: 'Fire Safety Drill Not Conducted',       severity: 'Medium',   owner: 'HR',       dueDate: '2026-07-15', status: 'Overdue'      },
  { id: 4, description: 'Supplier Code of Conduct Unsigned',     severity: 'Low',      owner: 'Finance',  dueDate: '2026-07-30', status: 'Open'         },
  { id: 5, description: 'Whistleblower Policy Update Required',  severity: 'High',     owner: 'Legal',    dueDate: '2026-08-10', status: 'Open'         },
  { id: 6, description: 'Board Meeting Minutes Not Filed',       severity: 'Medium',   owner: 'Legal',    dueDate: '2026-07-28', status: 'In Progress'  },
];

// --- Policies ---
export const policies = [
  { id: 1, name: 'Anti-Bribery & Corruption Policy',     version: 'v2.3', acknowledged: 92, total: 100, lastUpdated: '2025-11-01' },
  { id: 2, name: 'Environmental Management Policy',      version: 'v1.8', acknowledged: 87, total: 100, lastUpdated: '2026-01-15' },
  { id: 3, name: 'Data Privacy & GDPR Policy',           version: 'v3.1', acknowledged: 98, total: 100, lastUpdated: '2026-03-20' },
  { id: 4, name: 'Health & Safety Policy',               version: 'v2.0', acknowledged: 75, total: 100, lastUpdated: '2025-09-10' },
  { id: 5, name: 'Diversity & Inclusion Policy',         version: 'v1.5', acknowledged: 89, total: 100, lastUpdated: '2026-02-28' },
  { id: 6, name: 'Whistleblower Protection Policy',      version: 'v1.2', acknowledged: 60, total: 100, lastUpdated: '2025-12-05' },
];

// --- Leaderboard ---
export const leaderboard = [
  { rank: 1, employee: 'Priya Sharma',    department: 'HR',          xp: 4850, badges: 12, level: 'Diamond'  },
  { rank: 2, employee: 'Vikram Singh',    department: 'Engineering', xp: 4200, badges: 10, level: 'Platinum' },
  { rank: 3, employee: 'Deepa Krishnan',  department: 'Operations',  xp: 3900, badges: 9,  level: 'Platinum' },
  { rank: 4, employee: 'Rohan Mehta',     department: 'Product',     xp: 3450, badges: 8,  level: 'Gold'     },
  { rank: 5, employee: 'Ananya Patel',    department: 'Marketing',   xp: 3100, badges: 7,  level: 'Gold'     },
  { rank: 6, employee: 'Arjun Nair',      department: 'Finance',     xp: 2750, badges: 6,  level: 'Silver'   },
  { rank: 7, employee: 'Kavya Reddy',     department: 'Legal',       xp: 2400, badges: 5,  level: 'Silver'   },
  { rank: 8, employee: 'Sanjay Kumar',    department: 'Engineering', xp: 2100, badges: 4,  level: 'Bronze'   },
];

// --- Active Challenges ---
export const activeChallenges = [
  { id: 1, title: 'Zero Waste Week',                xpReward: 500, difficulty: 'Hard',   status: 'Active',    joined: false },
  { id: 2, title: 'Bike to Work Challenge',         xpReward: 300, difficulty: 'Medium', status: 'Active',    joined: true  },
  { id: 3, title: 'Energy Saving Sprint',           xpReward: 250, difficulty: 'Easy',   status: 'Active',    joined: true  },
  { id: 4, title: 'CSR Activity Streak (5 days)',   xpReward: 400, difficulty: 'Medium', status: 'Active',    joined: false },
  { id: 5, title: 'Policy Champion Quiz',           xpReward: 200, difficulty: 'Easy',   status: 'Completed', joined: true  },
  { id: 6, title: 'Carbon Neutrality Month',        xpReward: 1000, difficulty: 'Hard',  status: 'Active',    joined: false },
];

// --- Badges ---
export const badges = [
  { id: 1,  name: 'Green Pioneer',      icon: '🌱', unlockCondition: 'Log 10 carbon entries',         unlocked: true  },
  { id: 2,  name: 'Solar Champion',     icon: '☀️', unlockCondition: 'Achieve 50% renewable energy',  unlocked: true  },
  { id: 3,  name: 'CSR Hero',           icon: '🤝', unlockCondition: 'Complete 5 CSR activities',     unlocked: true  },
  { id: 4,  name: 'Compliance Star',    icon: '⭐', unlockCondition: 'Zero overdue issues for 30d',   unlocked: false },
  { id: 5,  name: 'Tree Hugger',        icon: '🌳', unlockCondition: 'Plant 100 trees contribution',  unlocked: true  },
  { id: 6,  name: 'Data Guardian',      icon: '🛡️', unlockCondition: 'Complete GDPR training',        unlocked: true  },
  { id: 7,  name: 'Zero Waste Warrior', icon: '♻️', unlockCondition: 'Achieve Zero Waste Week goal',  unlocked: false },
  { id: 8,  name: 'Policy Pro',         icon: '📋', unlockCondition: 'Acknowledge all 6 policies',    unlocked: false },
  { id: 9,  name: 'Streak Master',      icon: '🔥', unlockCondition: 'Login 30 days in a row',        unlocked: true  },
  { id: 10, name: 'Impact Maker',       icon: '💥', unlockCondition: 'Earn 5000 XP total',            unlocked: false },
  { id: 11, name: 'Community Builder',  icon: '🏘️', unlockCondition: 'Recruit 5 colleagues to CSR',  unlocked: true  },
  { id: 12, name: 'Diamond Legend',     icon: '💎', unlockCondition: 'Reach Diamond rank',            unlocked: false },
];

// --- Rewards Catalog ---
export const rewards = [
  { id: 1, name: 'Extra Day Off',          points: 5000, stock: 10, category: 'Work-Life',   icon: '🏖️' },
  { id: 2, name: 'Amazon Gift Card ₹500',  points: 2000, stock: 25, category: 'Shopping',    icon: '🎁' },
  { id: 3, name: 'Organic Meal Kit',       points: 1500, stock: 30, category: 'Lifestyle',   icon: '🥗' },
  { id: 4, name: 'EV Charging Credits',    points: 1000, stock: 50, category: 'Transport',   icon: '⚡' },
  { id: 5, name: 'Online Course Access',   points: 800,  stock: 100,category: 'Learning',    icon: '📚' },
  { id: 6, name: 'Eco-Friendly Hamper',    points: 3000, stock: 15, category: 'Lifestyle',   icon: '🌿' },
  { id: 7, name: 'Company Swag Kit',       points: 600,  stock: 200,category: 'Merch',       icon: '👕' },
  { id: 8, name: 'Carbon Offset Certificate', points: 2500, stock: 20, category: 'Impact',  icon: '🌍' },
];
