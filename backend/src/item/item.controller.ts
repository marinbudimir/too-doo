import { Controller, Get, Post, Delete, Body, Param, UseGuards, Put, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ItemService } from '@item/item.service';
import { ItemDto } from '@item/dto/item.dto';
import { CreateItemDto } from '@item/dto/create-item.dto';
import { UserDto } from '@user/dto/user.dto';

@Controller('list/:list/item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Get()
    async findAll(@Param('list') listId: string): Promise<ItemDto[]> {
        return await this.itemService.findAll(listId);
    }

    @Post()
    @UseGuards(AuthGuard())
    async create( @Param('list') listId: string, @Body() createItemDto: CreateItemDto, @Req() req: any ): Promise<ItemDto> {
        const user = req.user as UserDto;
        return await this.itemService.create(listId, createItemDto, user);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async update(@Param("id") id: string, @Body() itemDto: ItemDto, @Req() req: any): Promise<ItemDto> { 
        const user = req.user as UserDto;
        return await this.itemService.update(id, itemDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async destory(@Param('id') id: string, @Req() req: any): Promise<ItemDto> {
        const user = req.user as UserDto;
        return await this.itemService.delete(id, user);
    }
}
