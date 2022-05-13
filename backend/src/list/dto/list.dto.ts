import { ItemDto } from "@item/dto/item.dto";
import { UserDto } from "@user/dto/user.dto";

export class ListDto {  
    id: string;
    title: string;
    items?: ItemDto[];
    owner?: UserDto;
}
