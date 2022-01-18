import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
// import { CodingeventsComponent } from "./codingevents/codingevents.component";
// import { AlleventsComponent } from "./allevents/allevents.component";
// import { BootcampeventsComponent } from "./bootcampevents/bootcampevents.component";
// import { WebinarsComponent } from "./webinars/webinars.component";
// import { WorkshopsComponent } from "./workshops/workshops.component";

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent}
  // { path: 'codingevents', component: CodingeventsComponent },
  // { path: 'bootcampevents', component: BootcampeventsComponent },
  // { path: 'webinars', component: WebinarsComponent },
  // { path: 'workshops', component: WorkshopsComponent }
  // ,
  // { path: '/upcoming', component: AlleventsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
