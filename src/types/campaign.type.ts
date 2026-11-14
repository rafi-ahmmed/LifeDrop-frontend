
export interface Campaign {
  id: string;
  title: string;
  goalAmount: number;
  raisedAmount: number;
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED"
    | "EXPIRED";
  createdAt: string;
  hospitalName?: string;
}
