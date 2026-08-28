import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ShipmentTypeDto } from '../../orders/dto/create-order.dto';

export class AssignTripDto {
  @IsString()
  @MinLength(1)
  driverId: string;

  @IsDateString()
  eta: string;

  @IsOptional()
  @IsEnum(ShipmentTypeDto)
  shipmentType?: ShipmentTypeDto;
}

export enum ManualTripStatusDto {
  IN_TRANSIT = 'IN_TRANSIT',
  AT_ORIGIN_PORT = 'AT_ORIGIN_PORT',
  ON_VESSEL = 'ON_VESSEL',
  AT_DESTINATION_PORT = 'AT_DESTINATION_PORT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  DELAY = 'DELAY',
  CANCELED = 'CANCELED',
  CLAIM = 'CLAIM',
  HOLD = 'HOLD',
}

export class UpdateTripStatusDto {
  @IsEnum(ManualTripStatusDto)
  status: ManualTripStatusDto;
}
