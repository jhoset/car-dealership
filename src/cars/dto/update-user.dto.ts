import { IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateCarDto {

    @IsUUID()
    @IsString()
    @IsOptional()
    public readonly id: string;

    @IsOptional()
    @IsString()
    public readonly brand?: string;

    @IsString()
    // @MinLength(3)
    public readonly model: string;
}