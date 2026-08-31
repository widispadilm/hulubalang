export type ShipmentType = 'TOWING' | 'SELF_DRIVE';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED';
export type TripStatus =
  | 'REQUESTED'
  | 'ASSIGNED'
  | 'VEHICLE_PICKED_UP'
  | 'IN_TRANSIT'
  | 'REPORTED_AT_POOL'
  | 'AT_POOL'
  | 'AT_ORIGIN_PORT'
  | 'ON_VESSEL'
  | 'AT_DESTINATION_PORT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'DELAY'
  | 'CANCELED'
  | 'CLAIM'
  | 'HOLD';
export type CheckpointStatus = 'REPORTED' | 'VERIFIED' | 'REJECTED';

export interface Customer {
  id: string;
  companyName: string;
  pic: string;
  email: string;
  phone?: string | null;
}

export interface InternalUserRef {
  id: string;
  name: string;
  email?: string;
  role?: string;
}

export interface Pool {
  id: string;
  name: string;
  address: string;
}

export interface TripCheckpoint {
  id: string;
  tripId?: string;
  poolId?: string;
  status: CheckpointStatus;
  reportedBy: InternalUserRef;
  reportedAt: string;
  reportNote?: string | null;
  photoUrl?: string | null;
  verifiedBy?: InternalUserRef | null;
  verifiedAt?: string | null;
  verifyNote?: string | null;
  pool: Pool;
  trip?: Trip;
}

export interface Trip {
  id: string;
  tripNumber: string | null;
  orderId: string;
  shipmentType: ShipmentType;
  vehicleBrand: string;
  vehicleModel: string;
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
  status: TripStatus;
  eta: string | null;
  driver?: InternalUserRef | null;
  assignedBy?: InternalUserRef | null;
  checkpoints: TripCheckpoint[];
  order?: Order;
}

export interface Order {
  id: string;
  orderNumber: string | null;
  customerId?: string;
  customer?: Customer;
  pic: string;
  originCity: string;
  destinationCity: string;
  requestPickupDate: string;
  specialInstruction?: string | null;
  status: OrderStatus;
  confirmedBy?: InternalUserRef | null;
  trips: Trip[];
  createdAt: string;
}
