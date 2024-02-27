import { IsString, MinLength } from "class-validator";

export class CreateBrandDto {
    @MinLength(4)
    @IsString()
    name: string;
}
