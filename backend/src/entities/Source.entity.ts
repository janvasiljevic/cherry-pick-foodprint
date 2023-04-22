import { Entity } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
// 'FOOD COMMODITY GROUP', 'Food commodity ITEM',
//        'Carbon Footprint kg CO2eq/kg or l of food ITEM',
//        'CO2 Footprint Uncertainty', 'Suggested CF value',
//        'Food commodity TYPOLOGY',
//        'Carbon Footprint g CO2eq/g o cc of food TYPOLOGY',
//        'Food commodity sub-TYPOLOGY',
//        'Carbon Footprint g CO2eq/g o cc of food sub-TYPOLOGY',
//        'Water Footprint liters water/kg o liter of food ITEM',
//        'Water Footprint cc water/g o cc of food sub-TYPOLOGY',
//        'Water Footprint Uncertainty'
// @Entity()
// export class Source extends CustomBaseEntity {}

@Entity()
export class Source extends CustomBaseEntity {}
