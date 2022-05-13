import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toListDto } from '@shared/mapper';
import { ListEntity } from '@list/list.entity';
import { ListDto } from '@list/dto/list.dto';
import { CreateListDto } from '@list/dto/create-list.dto';
import { UserDto } from '@user/dto/user.dto';
import { UserService } from '@user/user.service';
import { ItemService } from '@item/item.service';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListEntity)
        private readonly listRepo: Repository<ListEntity>,
        private readonly userService: UserService,
        private readonly itemService: ItemService
    ) {}

    async findAll(owner: UserDto):  Promise<ListDto[]> {
        const lists = await this.listRepo.find({ 
            where: { owner }
        });

        return lists.map(list => toListDto(list));
    }

    async findOne(id: string): Promise<ListDto> {    
        const list = await this.listRepo.findOne({
            where: { id },
        });

        list.items = await this.itemService.findAll(id);
        if (!list) {
            throw new HttpException(`List doesn't exist`, HttpStatus.BAD_REQUEST);
        }
      
        return toListDto(list);
    }

    async create(createListDto: CreateListDto, { email }: UserDto): Promise<ListDto>{    
        const { title } = createListDto;
        const owner: UserDto = await this.userService.findOne({ where: { email } });
        const list: ListEntity = this.listRepo.create({ title, owner });
        await this.listRepo.save(list);

        return toListDto(list);
    }

    async update(id: string, listDto: ListDto, owner: UserDto): Promise<ListDto>{
        const { title } = listDto;
        let list: ListEntity = await this.listRepo.findOne({ 
            where: { id }, 
            relations: ['owner'] 
        }); 
        if (!list) {
            throw new HttpException("List doesn't exist", HttpStatus.BAD_REQUEST);
        }
        if(list.owner.id != owner.id) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }

        list = {
          id,
          title
        };
        await this.listRepo.update({ id }, list);
        list = await this.listRepo.findOne({ where: { id } });
    
        return toListDto(list);
    }

    async delete(id: string, owner: UserDto): Promise<ListDto>{
        const list: ListEntity = await this.listRepo.findOne({
            where: { id },
            relations: ['owner']
        });
        if (!list) {
            throw new HttpException("List doesn't exist", HttpStatus.BAD_REQUEST);
        }
        if(list.owner.id != owner.id) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
      
        await this.listRepo.delete({ id });

        return toListDto(list);
    }
}
