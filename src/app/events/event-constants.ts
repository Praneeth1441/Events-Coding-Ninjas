
export const BASE_URL = "https://api.codingninjas.com/"
export const BASE_EVENT_INFO_URL = "api/v3/events";
export const BASE_EVENT_TAG_INFO_URL = "api/v3/event_tags";

export const DEFAULT_ROUTE_PARAMS = {
    'event_category' : 'ALL_EVENTS',
    'event_sub_category' : 'Upcoming',
    'page' : 1
};

export const PAGE_SIZE = 20
export const DEFAULT_SUB_CATEGORY = "Upcoming"

export const DEFAULT_EVENTS = [{
      'key' : 'ALL_EVENTS',
      'displayName' : 'All Events'
},
{
      'key' : 'CODING_EVENT',
      'displayName' : 'Coding Events'
},
{
      'key' : 'BOOTCAMP_EVENT',
      'displayName' : 'Bootcamp Events'
},
{
      'key' : 'WORKSHOP',
      'displayName' : 'Workshops'
},
{
      'key' : 'WEBINAR',
      'displayName' : 'Webinars'
}];

export const DEFAULT_SUB_EVENTS = [{
      'key' : 'Upcoming',
      'displayName' : 'Upcoming'
},
{
      'key' : 'Archived',
      'displayName' : 'Archived'
},
{
      'key' : 'All Time Favorites',
      'displayName' : 'All Time Favorites'
}];
