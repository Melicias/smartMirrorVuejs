export class Season {
  season_id?: number;
  name?: string;
  is_current?: boolean;
  country_id?: number;
  league_id?: number;
  start_date?: Date;
  end_date?: Date;
}
export class Standing {
  team_id?: number;
  position?: number;
  points?: number;
  status?: string;
  result?: string;
  overall?: {
    games_played: number;
    won: number;
    draw: number;
    lost: number;
    goals_diff: number;
    goals_scored: number;
    goals_against: number;
  };
  team_name?: string;
  team_logo?: string;
}

export class Team {
  team_id?: number;
  name?: string;
  short_code?: string;
  logo?: string;
  country?: {
    country_id: number;
    name: string;
    country_code: string;
    continent: string;
  };
}
