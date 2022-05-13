import { IsNotEmpty } from 'class-validator'; 

export class CreateItemDto {
    @IsNotEmpty()
    text: string;
}
