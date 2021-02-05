interface id {
  id: string
}

export interface user {
  id: string;
}

export interface emoji {
  emoji: id;
}

export interface ICollector {
  (r: emoji, u: user);
}