import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';



@NgModule({
    exports: [ MatInputModule, MatBadgeModule, MatSelectModule, MatDialogModule,MatSlideToggleModule, MatButtonModule]
})
export class MaterialCustomModule {}