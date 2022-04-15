import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
    exports: [ MatInputModule, MatBadgeModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatDialogModule ]
})
export class MaterialCustomModule {}
