import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { QrCodeComponent } from '../../pages/qr-code/qr-code.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'qr-code', component: QrCodeComponent },
    { path: 'qr-scanner', component: QrScannerComponent }
];
