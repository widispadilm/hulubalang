import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export enum ShipmentTypeDto {
  TOWING = 'TOWING',
  SELF_DRIVE = 'SELF_DRIVE',
}

export class OrderVehicleDto {
  @IsEnum(ShipmentTypeDto)
  shipmentType: ShipmentTypeDto;

  @IsString()
  @MinLength(1)
  vehicleBrand: string;

  @IsString()
  @MinLength(1)
  vehicleModel: string;

  @IsString()
  @MinLength(1)
  plateNumber: string;

  @IsString()
  @MinLength(1)
  chassisNumber: string;

  @IsString()
  @MinLength(1)
  engineNumber: string;
}

export class CreateOrderDto {
  @IsString()
  @MinLength(1)
  pic: string;

  @IsString()
  @MinLength(1)
  originCity: string;

  @IsString()
  @MinLength(1)
  destinationCity: string;

  @IsDateString()
  requestPickupDate: string;

  @IsOptional()
  @IsString()
  specialInstruction?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderVehicleDto)
  vehicles: OrderVehicleDto[];
}
