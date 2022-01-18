import { CodingeventsComponent } from "./codingevents/codingevents.component";
import { AlleventsComponent } from "./allevents/allevents.component";
import { provideRouter } from "@angular/router";

const APP_ROUTES = [
  { path: 'codingevents', component: CodingeventsComponent },
  { path: '', component: AlleventsComponent }
];

export const APP_ROUTES_PROVIDER = [
  provideRouter(APP_ROUTES)
];
