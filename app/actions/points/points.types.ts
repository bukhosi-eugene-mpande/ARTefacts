export interface Player {
  username: string;
  avatar: string;
  position: number;
  points: number;
}

export interface UserStats {
  username: string;
  avatar: string;
  points: number;
  position: number;
}

export interface Leaderboard {
  top_users: Player[];
  user_stats?: UserStats;
}

export interface PointsUpdateResponse {
  message: string;
  userId: string;
  points: number;
  action: string;
}
