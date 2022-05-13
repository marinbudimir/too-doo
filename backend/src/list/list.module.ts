import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from '@list/list.entity';
import { ListController } from '@list/list.controller';
import { ListService } from '@list/list.service';
import { ItemEntity } from '@item/item.entity';
import { UserModule } from '@user/user.module';
import { UserEntity } from '@user/user.entity';
import { ItemModule } from '@item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListEntity, UserEntity, ItemEntity]), 
    UserModule,
    ItemModule
  ],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
