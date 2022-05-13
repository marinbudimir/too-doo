import { ListDto } from "@list/dto/list.dto";
import { ItemDto } from "@item/dto/item.dto";
import { ListEntity } from "@list/list.entity";
import { ItemEntity } from "@item/item.entity";
import { UserEntity } from "@user/user.entity";
import { UserDto } from "@user/dto/user.dto";

export const toListDto = (data: ListEntity): ListDto => {  
  const { id, title, items } = data;

  let listDto: ListDto = {
    id,
    title
  };
    
  if (items) {
    listDto = {
      ...listDto,
      items: items.map((item: ItemEntity) => toItemDto(item)),
    };
  }
    
  return listDto;
};

export const toItemDto = (data: ItemEntity): ItemDto => {
  const { id, text, checked } = data;
  let itemDto: ItemDto = { id, text, checked };

  return itemDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, name, email } = data;
  let userDto: UserDto = { id, name, email };

  return userDto;
}