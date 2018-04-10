import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from './../pipes/pipes.module'; 
import { InvestListComponent } from './invest-list/invest-list';
import { ValidationComponent } from './validation/validation';
 import { RefurbishListComponent } from './refurbish-list/refurbish-list';

import { NetworkShowComponent } from './network-show/network-show';
import { NetworkFailComponent } from './network-fail/network-fail';
 import { DetailsFootComponent } from './details-foot/details-foot';
import { InsadeFootComponent } from './insade-foot/insade-foot';
import { CouponChildComponent } from './coupon-child/coupon-child';
import { NewDetailsFootComponent } from './new-details-foot/new-details-foot';
 
 @NgModule({
	declarations: [InvestListComponent,
    ValidationComponent,
     RefurbishListComponent,
    DetailsFootComponent,
    NetworkShowComponent,
    NetworkShowComponent,
    NetworkFailComponent,
    InsadeFootComponent,
    CouponChildComponent,
    NewDetailsFootComponent,
    
   ],
    imports: [IonicModule,PipesModule],
	exports: [InvestListComponent,
    ValidationComponent,
     RefurbishListComponent,
     DetailsFootComponent,
    NetworkShowComponent,
    NetworkShowComponent,
    NetworkFailComponent,
    InsadeFootComponent,
    CouponChildComponent,
    NewDetailsFootComponent,
   
    
]
})
export class ComponentsModule {}
