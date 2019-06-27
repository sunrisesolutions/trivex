import { Routes, RouterModule } from "@angular/router";

import {EventLoginMember} from "../../pages/register-event/login-member/login-member.component"
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { RegisterEventComponent } from "../../pages/register-event/register-event.component";
import { NgModule } from "@angular/core";


export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "event/:id/registration", component: RegisterEventComponent },
  { path: "event/:id/login", component: EventLoginMember}
];
