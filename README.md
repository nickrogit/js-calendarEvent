# js-calendarEvent
js事件日历,基于jquery

```
var datajson=[{date:"2018-01-28",text:"2018-01-28事件名称"},{date:"2018-01-02",text:"2018-01-02事件名称"}];
var el=$('#ce_list')
var This_year = This_time.getFullYear();
var This_month = This_time.getMonth() +1;
creatCe(el,datajson,This_year,This_month);
````