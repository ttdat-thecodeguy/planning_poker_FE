import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    exports: [ MatInputModule, MatBadgeModule, MatSelectModule ]
})
export class MaterialCustomModule {}
