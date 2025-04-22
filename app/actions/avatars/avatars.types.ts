// types/avatars.ts
export interface Avatar {
  key: string;
  url: string;
}

export interface AvatarsResponse {
  statusCode: number;
  headers: {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
  };
  body: AvatarsData;
}

export interface AvatarsData {
  avatars: Avatar[];
  count: number;
}
