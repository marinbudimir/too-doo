import { Controller , Get, Put, Post, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { ListDto } from './dto/list.dto';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
    @UseGuards(AuthGuard())
    async findAll(@Req() req: any): Promise<ListDto[]> {   
        const user = req.user as UserDto;
        return await this.listService.findAll(user);
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<ListDto> {   
        return await this.listService.findOne(id);  
    }
    
    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() listCreateDto: CreateListDto, @Req() req: any): Promise<ListDto> {    
        const user = req.user as UserDto;
        return await this.listService.create(listCreateDto, user);  
    }
    
    @Put(":id")
    @UseGuards(AuthGuard())
    async update(@Param("id") id: string, @Body() listDto: ListDto, @Req() req: any): Promise<ListDto> {
        const user = req.user as UserDto;
        return await this.listService.update(id, listDto, user);  
    }
    
    @Delete(":id")
    @UseGuards(AuthGuard())
    async remove(@Param("id") id: string, @Req() req: any): Promise<ListDto> {
        const user = req.user as UserDto;
        return await this.listService.delete(id, user);  
    }
}
