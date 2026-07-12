import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';

const userXP = 4850;

export default function RewardsCatalog() {
  const { rewards: initialRewards } = useGlobalState();
  const [rewards, setRewards] = useState(initialRewards);
  const [redeemed, setRedeemed] = useState(new Set());

  const handleRedeem = id => setRedeemed(prev => new Set(prev).add(id));

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Rewards Catalog</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Redeem XP for perks</p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          {userXP.toLocaleString()} XP available
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {rewards.map(reward => {
          const canAfford = userXP >= reward.points;
          const isDone    = redeemed.has(reward.id);
          const outOfStock = reward.stock === 0;

          return (
            <div
              key={reward.id}
              className="card-hover rounded-lg p-4"
              style={{ border: '1px solid #e5e7eb', background: '#ffffff' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl shrink-0">{reward.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug" style={{ color: '#111827' }}>{reward.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{reward.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>
                      {reward.points.toLocaleString()} XP
                    </span>
                    <span className="text-xs" style={{ color: '#d1d5db' }}>·</span>
                    <span className="text-xs" style={{ color: '#9ca3af' }}>{reward.stock} left</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRedeem(reward.id)}
                disabled={!canAfford || isDone || outOfStock}
                className="w-full py-2 rounded-lg text-xs font-semibold"
                style={
                  isDone
                    ? { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }
                    : !canAfford || outOfStock
                    ? { background: '#f9fafb', color: '#9ca3af', border: '1px solid #e5e7eb', cursor: 'not-allowed' }
                    : { background: '#111827', color: '#ffffff', border: 'none' }
                }
              >
                {isDone
                  ? '✓ Redeemed'
                  : outOfStock
                  ? 'Out of stock'
                  : !canAfford
                  ? `${(reward.points - userXP).toLocaleString()} XP short`
                  : 'Redeem'
                }
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
