import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    exports: [ MatInputModule, MatBadgeModule, MatSelectModule, MatDialogModule,MatSlideToggleModule, MatButtonModule, MatMenuModule, MatSidenavModule, MatSnackBarModule, MatTableModule, CdkTableModule ]
})
export class MaterialCustomModule {}