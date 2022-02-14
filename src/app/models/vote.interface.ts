export interface Vote {
  userEmail: string;
  games: { gameId: string, points: number }[];
}
