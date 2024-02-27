import { IsString } from "class-validator";


export class CreateCarDto {

    // @IsNotEmpty()
    @IsString({ message: `Brand must be a string` })
    public readonly brand: string;
    @IsString()
    // @MinLength(3)
    public readonly model: string;

}