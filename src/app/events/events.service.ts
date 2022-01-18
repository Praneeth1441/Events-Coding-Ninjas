import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as EventConstants from './event-constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  validateQueryParams(event_category : any, event_sub_category:any, page : number) {
    if(this.isNullOrUndefined(event_category)){
      return false
    }
    if(this.isNullOrUndefined(event_sub_category)){
      return false
    }
    if(this.isNullOrUndefined(page)){
      return false
    }
    return true
  }

  isNullOrUndefined(val : any){
    if(val == null || val == undefined){
      return true;
    }
    return false;
  }

  constructQueryParams(event_category : any, event_sub_category:any, tag_list : any, page : number){
    let routeParams:any = {}
    routeParams['event_category'] = event_category
    routeParams['event_sub_category'] = event_sub_category
    routeParams['page'] = page
    if(!this.isNullOrUndefined(tag_list)){
       routeParams['tag_list'] = tag_list
    }
    return routeParams;
  }

  constructHttpParams(event_category : any, event_sub_category:any, tag_list : any, page : number){
    let routeParams:any = {}
    routeParams['event_category'] = event_category
    routeParams['event_sub_category'] = event_sub_category
    routeParams['offset'] = (page-1)*EventConstants.PAGE_SIZE
    if(this.isNullOrUndefined(tag_list)){
      routeParams['tag_list'] = ''
    }
    else{
      routeParams['tag_list'] = tag_list
    }
    return routeParams;
  }

  getEventInfo(params : any){
    let url = EventConstants.BASE_URL + EventConstants.BASE_EVENT_INFO_URL
    return this.httpClient.get(url, {params : params});
  }

  getEventtagsInfo(){
    let url = EventConstants.BASE_URL + EventConstants.BASE_EVENT_TAG_INFO_URL
    return this.httpClient.get(url);
  }
}
