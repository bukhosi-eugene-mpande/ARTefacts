import type { Leaderboard } from './points.types';

import { getLeaderboard as fetchLeaderboardAPI } from './points';

type Callback = (leaderboard: Leaderboard) => void;

let subscribers: Callback[] = [];

export const subscribeToLeaderboard = (cb: Callback) => {
  subscribers.push(cb);

  return () => {
    subscribers = subscribers.filter((sub) => sub !== cb);
  };
};

export const notifySubscribers = (leaderboard: Leaderboard) => {
  for (const cb of subscribers) {
    cb(leaderboard);
  }
};

export const getLeaderboard = async (accessToken?: string) => {
  const data = await fetchLeaderboardAPI(accessToken);

  notifySubscribers(data);

  return data;
};
