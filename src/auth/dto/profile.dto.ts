export type UserPayload = {
  user_id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN'; // Assuming role can be either USER or ADMIN
  iat: number; // Issued at (usually a Unix timestamp)
  exp: number; // Expiry (usually a Unix timestamp)
};
