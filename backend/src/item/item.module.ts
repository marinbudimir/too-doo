import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from '@item/item.controller';
import { ItemService } from '@item/item.service';
import { ItemEntity } from '@item/item.entity';
import { ListEntity } from '@list/list.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ItemEntity, ListEntity]), UserModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
