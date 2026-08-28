import { IsOptional, IsString, MinLength } from 'class-validator';

export class ReportCheckpointDto {
  @IsString()
  @MinLength(1)
  tripId: string;

  @IsString()
  @MinLength(1)
  poolId: string;

  @IsOptional()
  @IsString()
  reportNote?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class VerifyCheckpointDto {
  @IsOptional()
  @IsString()
  verifyNote?: string;
}

export class RejectCheckpointDto {
  @IsString()
  @MinLength(1)
  verifyNote: string;
}
