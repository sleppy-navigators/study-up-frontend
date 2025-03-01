import { useState } from 'react';

export interface BountyItem {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  amount: number;
  claimed: boolean;
}

export function useBounty(
  initialBounties: Omit<BountyItem, 'claimed' | 'id'>[]
) {
  const [bounties, setBounties] = useState<BountyItem[]>(
    initialBounties.map((bounty, index) => ({
      ...bounty,
      id: `bounty-${index}`,
      claimed: false,
    }))
  );

  const claimBounty = (id: string) => {
    setBounties((prev) =>
      prev.map((bounty) =>
        bounty.id === id ? { ...bounty, claimed: true } : bounty
      )
    );
  };

  const totalAvailable = bounties
    .filter((bounty) => !bounty.claimed)
    .reduce((sum, bounty) => sum + bounty.amount, 0);

  return {
    bounties,
    claimBounty,
    totalAvailable,
  };
}
