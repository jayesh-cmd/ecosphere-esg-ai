import React, { createContext, useContext, useState, useMemo } from 'react';
import * as mockData from '../data/mockData';

const GlobalStateContext = createContext(null);

export function GlobalStateProvider({ children }) {
  const [departments, setDepartments] = useState(mockData.departments);
  const [carbonTransactions, setCarbonTransactions] = useState(mockData.carbonTransactions);
  const [csrActivities, setCsrActivities] = useState(mockData.csrActivities);
  const [employeeParticipation, setEmployeeParticipation] = useState(mockData.employeeParticipation);
  const [complianceIssues, setComplianceIssues] = useState(mockData.complianceIssues);
  const [policies, setPolicies] = useState(mockData.policies);
  const [leaderboard, setLeaderboard] = useState(mockData.leaderboard);
  const [sustainabilityGoals, setSustainabilityGoals] = useState(mockData.sustainabilityGoals);
  const [activeChallenges, setActiveChallenges] = useState(mockData.activeChallenges);
  const [badges, setBadges] = useState(mockData.badges);
  const [rewards, setRewards] = useState(mockData.rewards);
  const [scoreTrend, setScoreTrend] = useState(mockData.scoreTrend);

  const [dismissedAnomalies, setDismissedAnomalies] = useState(new Set());

  const anomalies = useMemo(() => {
    const emissionsByDept = {};
    carbonTransactions.forEach(t => {
      if (t.amount < 0) {
        if (!emissionsByDept[t.department]) emissionsByDept[t.department] = [];
        emissionsByDept[t.department].push(t);
      }
    });

    const detected = [];
    const activeGoal = sustainabilityGoals.some(g => g.progress < 100 && g.title.toLowerCase().includes('reduce'));

    for (const [dept, entries] of Object.entries(emissionsByDept)) {
      if (entries.length < 3) continue;
      
      const sorted = entries.sort((a, b) => new Date(a.date) - new Date(b.date));
      const latest = sorted[sorted.length - 1];
      const previous = sorted.slice(0, sorted.length - 1);
      
      const sum = previous.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
      const avg = sum / previous.length;
      const latestVal = Math.abs(latest.amount);

      if (latestVal > avg * 1.5) {
        const pct = Math.round(((latestVal - avg) / avg) * 100);
        detected.push({
          id: `${dept}-spike-${latest.id}`,
          department: dept,
          message: `${dept} emissions spiked ${pct}% this period${activeGoal ? ' despite active reduction goals' : ''}.`
        });
      }
    }

    return detected.filter(a => !dismissedAnomalies.has(a.id));
  }, [carbonTransactions, sustainabilityGoals, dismissedAnomalies]);

  const dismissAnomaly = (id) => {
    setDismissedAnomalies(prev => new Set(prev).add(id));
  };

  // Derived overall scores based on department averages
  const esgScores = useMemo(() => {
    if (!departments.length) return { environmental: 0, social: 0, governance: 0, overall: 0 };
    const sums = departments.reduce((acc, dept) => ({
      env: acc.env + dept.environmental,
      soc: acc.soc + dept.social,
      gov: acc.gov + dept.governance,
    }), { env: 0, soc: 0, gov: 0 });

    const len = departments.length;
    const environmental = Math.round(sums.env / len);
    const social = Math.round(sums.soc / len);
    const governance = Math.round(sums.gov / len);
    const overall = Math.round((environmental + social + governance) / 3);

    return { environmental, social, governance, overall };
  }, [departments]);

  const updateDepartmentScore = (deptName, type, delta) => {
    setDepartments(prev => prev.map(d => {
      if (d.name !== deptName) return d;
      const newVal = Math.min(100, Math.max(0, d[type] + delta));
      const newD = { ...d, [type]: newVal };
      newD.total = Math.round((newD.environmental + newD.social + newD.governance) / 3);
      return newD;
    }));
  };

  const addCarbonEntry = (entry) => {
    setCarbonTransactions(prev => [...prev, entry]);
    // +/- 12 ensures that the average across 7 departments changes by > 1.5, guaranteeing a visible change in the top-level metric
    const delta = entry.amount > 0 ? 12 : -12;
    updateDepartmentScore(entry.department, 'environmental', delta);
  };

  const addParticipation = (entry) => {
    setEmployeeParticipation(prev => [...prev, entry]);
    // Find department for this employee
    const emp = leaderboard.find(l => l.employee === entry.employee);
    const dept = emp ? emp.department : 'HR'; // fallback
    if (entry.status === 'Completed') {
      updateDepartmentScore(dept, 'social', 4);
    }
  };

  const addIssue = (entry) => {
    setComplianceIssues(prev => [...prev, entry]);
    let delta = 0;
    if (entry.severity === 'Critical') delta = -6;
    if (entry.severity === 'High') delta = -4;
    if (entry.severity === 'Medium') delta = -2;
    updateDepartmentScore(entry.owner, 'governance', delta);
  };

  return (
    <GlobalStateContext.Provider value={{
      esgScores, scoreTrend, departments, carbonTransactions, sustainabilityGoals,
      csrActivities, employeeParticipation, complianceIssues, policies,
      leaderboard, activeChallenges, badges, rewards, anomalies,
      addCarbonEntry, addParticipation, addIssue, dismissAnomaly
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
