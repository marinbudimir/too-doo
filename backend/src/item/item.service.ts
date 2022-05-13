import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toItemDto } from '@shared/mapper';
import { ItemEntity } from '@item/item.entity';
import { ItemDto } from '@item/dto/item.dto';
import { CreateItemDto } from '@item/dto/create-item.dto';
import { ListEntity } from '@list/list.entity';
import { UserDto } from '@user/dto/user.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepo: Repository<ItemEntity>,
        @InjectRepository(ListEntity)
        private readonly listRepo: Repository<ListEntity>,
    ) {}

    async findAll(id: string): Promise<ItemDto[]> {
        const items: ItemEntity[] = await this.itemRepo.find({
            where: { list: { id } },
            relations: ['list'],
            order: {
                checked: "ASC",
                createdOn: "ASC"
            }
        });
    
        return items.map(item => toItemDto(item));
    }
    
    async create(listId: string, itemDto: CreateItemDto, owner: UserDto): Promise<ItemDto> {
        const { text } = itemDto;
    
        const list: ListEntity = await this.listRepo.findOne({
          where: { id: listId },
          relations: ['owner']
        });

        if(list.owner.id != owner.id) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }

        const item: ItemEntity = this.itemRepo.create({ text, list });
    
        await this.itemRepo.save(item);
    
        return toItemDto(item);
    }

    async update(id: string, itemDto: ItemDto, owner: UserDto): Promise<ItemDto>{
        let { text, checked } = itemDto;
        let item: ItemEntity = await this.itemRepo.findOne({ 
            where: { id },
            relations: ['list', 'list.owner']
        });

        if (!item) {
            throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST, );
        }
        if(item.list.owner.id != owner.id) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
        
        if(text == null) {
            text = item.text;
        }
        if(checked == null) {
            checked = item.checked;
        }
        item = {
          id,
          text,
          checked
        };

        await this.itemRepo.update({ id }, item);
        item = await this.itemRepo.findOne({ where: { id } });
    
        return toItemDto(item);
    }

    
    async delete(id: string, owner: UserDto): Promise<ItemDto> {
        const item: ItemEntity = await this.itemRepo.findOne({
             where: { id },
             relations: ['list', 'list.owner']
        });
    
        if (!item) {
            throw new HttpException("Item doesn't exist", HttpStatus.BAD_REQUEST);
        }
        if(item.list.owner.id != owner.id) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
    
        await this.itemRepo.delete({ id });
    
        return toItemDto(item);
    }
}
