import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as EventConstants from './event-constants';
import { EventsService } from './events.service'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  // event_category_list

  event_category: any;
  event_sub_category: any;
  tag_list: any;
  page: number;
  eventEnums: any;
  routeParamSubscription: any;
  subEventCategories: any;
  eventInfo: any;
  throbber: any = false;
  event_tags: any;
  page_count: any;
  event_tags_limit: number = 0;
  remaining_tags_count: number = 0;

  tag_list_array: string[];

  constructor(private route: ActivatedRoute, private router: Router, private eventService : EventsService) {
    this.page = 1;
    this.tag_list_array = [];
    this.event_tags_limit = 10;
    this.remaining_tags_count = 10;
    // this.event_tags = [];
  }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.queryParams.subscribe(params => {
      // console.log(params);
      this.event_category  = params['event_category'];
      this.event_sub_category = params['event_sub_category'];
      this.tag_list = params['tag_list'];
      this.page = Number(params['page']);
      if(!this.eventService.validateQueryParams(this.event_category,this.event_sub_category,this.page)){
            this.router.navigate(['/events'],{queryParams:EventConstants.DEFAULT_ROUTE_PARAMS});
      }
      this.getEventInfo();
    });
    this.eventEnums = EventConstants.DEFAULT_EVENTS;
    this.subEventCategories = EventConstants.DEFAULT_SUB_EVENTS;
    this.getEventtagsInfo();
    // console.log(this.event_tags)
  }

  ngOnDestroy(): void {
     this.routeParamSubscription.unsubscribe();
  }

  routeToEventPage(event : any){
     this.tag_list = '';
     this.tag_list_array = [];
     this.intializeTaglimit();
     let queryParams = this.eventService.constructQueryParams(event.key,EventConstants.DEFAULT_SUB_CATEGORY,this.tag_list,1);
     this.router.navigate(['/events'],{queryParams:queryParams});
     // console.log(this.page_count);
  }

  routeToSubCatPage(subCat : any){
    this.tag_list = '';
    this.tag_list_array = [];
    this.intializeTaglimit();
    let queryParams = this.eventService.constructQueryParams(this.event_category,subCat.key,this.tag_list,1);
    this.router.navigate(['/events'],{queryParams:queryParams});
  }

  isActiveEvent(event : any){
    if(this.event_category == event.key){
      return true;
    }
    return false;
  }

  isActiveSubCat(subCat : any){
    if(this.event_sub_category == subCat.key){
      return true;
    }
    return false;
  }

  getEventInfo(){
    let httpParams = this.eventService.constructHttpParams(this.event_category,this.event_sub_category,this.tag_list,this.page);
    this.throbber = true;
    this.eventService.getEventInfo(httpParams).subscribe(resp => {
      this.throbber = false;
      this.eventInfo = JSON.parse(JSON.stringify(resp)).data.events;
      this.page_count = JSON.parse(JSON.stringify(resp)).data.page_count;
      // console.log(this.eventInfo)
    });
  }

  getEventtagsInfo(){
    this.eventService.getEventtagsInfo().subscribe(resp => {
      this.event_tags = JSON.parse(JSON.stringify(resp)).data.tags;
      // console.log(this.event_tags)
      this.intializeTaglimit();
    });
  }

  routeToNewPage(){
    if(!this.validPage())
      this.page = 1;
    // console.log("page : " + this.page);
    let queryParams = this.eventService.constructQueryParams(this.event_category,this.event_sub_category,this.tag_list,this.page);
    this.router.navigate(['/events'],{queryParams:queryParams});
  }
  validPage(){
    if(this.page < 1 || this.page > this.page_count){
      return false;
    }
    return true;
  }
  UpPage(){
    // console.log(typeof(this.page))
    this.page = this.page + 1;
    this.routeToNewPage();
  }
  DownPage(){
    // console.log(typeof(this.page))
    this.page = this.page - 1;
    this.routeToNewPage();
  }
  findtag(tag: any){
    for(var i = 0;i<this.tag_list_array.length;i++){
      if(this.tag_list_array[i] == tag){
        return i;
      }
    }
    return -1;
  }
  UpdateActiveTagList(tag: any){
    // console.log(tag);
    // console.log(typeof(tag));
    if(this.findtag(tag) == -1){
      this.tag_list_array.push(tag);
    }
    else{
      this.tag_list_array.splice(this.findtag(tag),1);
    }
    this.tag_list = this.tag_list_array.join(",");
    let queryParams = this.eventService.constructQueryParams(this.event_category,this.event_sub_category,this.tag_list,this.page);
    this.router.navigate(['/events'],{queryParams:queryParams});
  }
  showMoreTags(){
    this.event_tags_limit = this.event_tags_limit + 10;
    this.checkTaglimit();
    this.remaining_tags_count = this.event_tags.length - this.event_tags_limit;
    this.checkTaglimit();
  }
  checkTaglimit(){
    if(this.event_tags_limit > this.event_tags.length)
      this.event_tags_limit = this.event_tags.length;
  }
  checkRemainingTaglimit(){
    if(this.remaining_tags_count > 10)
      this.remaining_tags_count = 10;
  }
  intializeTaglimit(){
    this.event_tags_limit = 10;
    this.checkTaglimit();
    this.remaining_tags_count = this.event_tags.length - this.event_tags_limit;
    this.checkRemainingTaglimit();
  }
}
