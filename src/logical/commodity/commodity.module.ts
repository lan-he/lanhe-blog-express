import { Module } from '@nestjs/common';
import { CommodityService } from './commodity.service';
@Module({
  providers: [CommodityService],
  exports: [CommodityService],
})
export class CommodityModule {}
