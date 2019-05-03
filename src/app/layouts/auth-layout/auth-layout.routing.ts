import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { QrScannerComponent } from "../../pages/qr-scanner/qr-scanner.component";
import { QrCodeComponent } from "../../pages/qr-code/qr-code.component";
import { QrStartComponent } from "../../pages/qr-start/qr-start.component";
import { RegisterEventComponent } from "../../pages/register-event/register-event.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "register-event/:id", component: RegisterEventComponent },
  { path: "qr-code", component: QrCodeComponent },
  { path: "qr-start", component: QrStartComponent },
  { path: "qr-scanner", component: QrScannerComponent }
];
