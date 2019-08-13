import { Routes, RouterModule } from "@angular/router";

import { EventLoginMember } from "../../pages/register-event/login-member/login-member.component"
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { RegisterEventComponent } from "../../pages/register-event/register-event.component";
import { NgModule } from "@angular/core";
import { LoginAcccessTokenComponent } from "src/app/pages/login-acccess-token/login-acccess-token.component";
import { EventsComponent } from "src/app/pages/events/events.component";


export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  // { path: 'login/access-token?token', component: LoginAcccessTokenComponent },
  { path: "register", component: RegisterComponent },
  { path: 'events/:id', component: EventsComponent },
  { path: "events/:id/registration", component: RegisterEventComponent },
  { path: "events/:id/login", component: EventLoginMember }
];

