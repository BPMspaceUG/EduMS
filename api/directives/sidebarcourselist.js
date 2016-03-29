
/*SIDEBARTEMPLATES-------------------------------------------------------------------------------------------*/ 
app.directive('rightBarCourseAll', function() {//sideBarCourse = Directive Name
 return{
//Sidebarelement für allgemeine Kurse
template:'<div class="list-group" >\
  <a class="list-group-item active" style="background-color:#333;">\
  <div class="row">\
  <div class="col-md-3" ng-if="e.eventguaranteestatus">\
  <img class="transparent" alta="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png" src="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png"></div>\
  <div class="col-md-9" ><h5 class="list-group-item-heading" style="color:#FFA639;" class="pull-left"><b>{{e.start_date}}</b></h5></div>\
  <div class="row"><h4 class="list-group-item-heading" style="color:#ccc;">{{e.course_name}}</h4></div>'+

'<div>\
<button type="button" class="btn btn-info btn-sm" ng-click= "e.btnInfo=!e.btnInfo">\
<span class="fa-stack">\
<i class="fa fa-info fa-stack-1x fa-inverse"></i>\
</span>Info</button> - <button type="button" class="btn btn-success btn-sm" ng-model="reservate" ng-click= "e.btnRegister=!e.btnRegister">\
<span class="fa-stack">\
<i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i>\
</span>reservieren</button>\
</div>'+

'<div  ng-show="e.btnInfo">\
<h3>Start: {{e.start_date}} {{e.start_time}}</h3> \
<h3>Ende: {{e.finish_date}} {{e.finish_time}}</h3>\
<h3>Internet-Location-Name: {{e.internet_location_name}}</h3>\
<div ng-bind-html="e.location_description"></div>\
</div>'+  
'<div  ng-show="e.btnRegister">\
<register-form></register-form>\
</div>'+
'</a>\
</div>'

}
});
app.directive('registerForm', function() {//sideBarCourse = Directive Name
 return{
//Sidebarelement für allgemeine Kurse
template:'<form name="formReg" class="form-horizontal" novalidate>\
<div class="form-group has-warning">\
<div class="row" style="margin-top: 2px;">\
<div class="col-md-2">{{rinfo.mVorname}} {{rinfo.mFamName}}</div>\
<div class="col-md-4">\
<div class="input-group" class="form-input">\
<input type="text" style="margin-top: 5px;" class="form-control" id="inputNameId{{e.sysName}}" placeholder="Vorname" name="inputNameName{{e.sysName}}" ng-model="rinfo.mVorname">\
</div>\
</div>\
<div class="col-md-4">\
<div class="input-group" class="form-input">\
<input type="text" style="margin-top: 5px;" class="form-control" id="inputFamNameId{{e.sysName}}" placeholder="Nachname" ng-model="rinfo.mFamName">\
</div>\
</div>\
</div>\
<div class="row" style="margin-top: 2px; ">\
<div class="col-md-2">{{rinfo.mTeilnehmerZahl}} {{rinfo.mAdresse}}</div>\
<div class="col-md-4">\
<div class="input-group" class="form-input">\
<input type="anzahl" class="form-control" id="inputAnzahlId{{e.sysName}}" placeholder="Teilnehmerzahl" ng-model="rinfo.mTeilnehmerZahl">\
</div>\
</div>\
<div class="col-md-4">\
<div class="input-group" class="form-input">\
<input type="email" class="form-control" id="inputEmailId{{e.sysName}}" placeholder="Kontakt E-Mail Adresse" ng-model="rinfo.mAdresse">\
</div>\
</div>\
</div>\
</div>\
<input type="submit" ng-click="reservate(e.sysName)" class="btn btn-default" value="Reservierungsanfrage Abschicken"/>\
</form>'
}
});




app.directive('registerFormTwo', function() {
 return{
  template:'<form name="formReg" class="form-horizontal" novalidate>\
  <div class="form-group has-warning">\
  <div class="row" style="margin-top: 2px;">\
  <div class="col-md-2">{{rinfo.mVorname}} {{rinfo.mFamName}}</div>\
  <div class="col-md-4">\
  <div class="input-group" class="form-input">\
  <input type="text" class="form-control" style="margin-top: 5px;" id="inputNameId{{sbc.sysName}}" placeholder="Vorname" name="inputNameName{{sbc.sysName}}" ng-model="rinfo.mVorname">\
  </div>\
  </div>\
  <div class="col-md-4">\
  <div class="input-group" class="form-input">\
  <input type="text" class="form-control" style="margin-top: 5px;" id="inputFamNameId{{sbc.sysName}}" placeholder="Nachname" ng-model="rinfo.mFamName">\
  </div>\
  </div>\
  </div>\
  <div class="row" style="margin-top: 2px; ">\
  <div class="col-md-2">{{rinfo.mTeilnehmerZahl}} {{rinfo.mAdresse}}</div>\
  <div class="col-md-4">\
  <div class="input-group" class="form-input">\
  <input type="anzahl" class="form-control" id="inputAnzahlId{{sbc.sysName}}" placeholder="Teilnehmerzahl" ng-model="rinfo.mTeilnehmerZahl">\
  </div>\
  </div>\
  <div class="col-md-4">\
  <div class="input-group" class="form-input">\
  <input type="email" class="form-control" id="inputEmailId{{sbc.sysName}}" placeholder="Kontakt E-Mail Adresse" ng-model="rinfo.mAdresse">\
  </div>\
  </div>\
  </div>\
  </div>\
  <input type="submit" ng-click="reservate(sbc.sysName)" class="btn btn-default" value="Reservierungsanfrage Abschicken"/>\
  </form>'
 }
});


app.directive('rightBarCourseByTopic', function() {//sideBarCourse = Directive Name
 return{
  template:'<div class="list-group" >\
  <a class="list-group-item active" style="background-color:#333;">\
  <div class="row">\
  <div class="col-md-3" ng-if="sbc.eventguaranteestatus"><img class="transparent" alta="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png" src="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png"></div>\
  <div class="col-md-9" ><h5 class="list-group-item-heading" style="color:#FFA639;" class="pull-left"><b>{{sbc.start_date}}</b></h5></div>\
  <div class="row"><h4 class="list-group-item-heading" style="color:#ccc;">{{sbc.course_name}}</h4></div>\
  <div><button type="button" class="btn btn-info btn-sm" ng-click= "sbc.btnInfo=!sbc.btnInfo"><span class="fa-stack"><i class="fa fa-info fa-stack-1x fa-inverse"></i></span><b>Info</b></button> - <button type="button" class="btn btn-success btn-sm" ng-model="reservate" ng-click= "sbc.btnRegister=!sbc.btnRegister">\
  <span class="fa-stack"><i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i></span><b>reservieren</b></button></div><div ng-show="sbc.btnInfo">\
  <h3>Start: {{sbc.start_date}} {{sbc.start_time}}</h3>\
  <h3>Ende: {{sbc.finish_date}} {{sbc.finish_time}}</h3>\
  <h3>Internet-Location-Name: {{sbc.internet_location_name}}\
  <div ng-bind-html="sbc.location_description"></div>\
  </h3></div><div ng-show="sbc.btnRegister">\
  <register-form-two> orange FFA639 hellgrau ccc hintergrundgrau #333</register-form-two></div></a></div>'
 }
});



app.directive('courseList', function(){
 return{
  template: '<div class="container" style="width: 98%;">\
  <div class="panel-group" id="t.topic_name_raw">\
  <div class="panel panel-default">\
  <div class="panel-heading with panel-primary">\
  <h3><a data-toggle="collapse" href="#{{panelcourse.sysName}}">{{panelcourse.courseHeadline}}</a></h3>\
  </div>\
  <div id="{{panelcourse.sysName}}"" class="panel-collapse collapse">\
  <div class="panel-body" ng-if="panelcourse.test=0">Kurs: {{panelcourse.courseHeadline}}{{panelcourse.courseDescription}}{{panelcourse.coursePrice}}{{panelcourse.number_of_days}}{{panelcourse.min_participants}}</div>\
  <div class="panel-body" ng-if="panelcourse.test=1"> \
  <h3>Test: {{panelcourse.courseHeadline}}</h3>\
  <div ng-bind-html="panelcourse.courseDescription"></div>\
  <h4 style="color:#78b433">Preis: {{panelcourse.coursePrice}},- €</h4>\
  <h4 style="color:#78b433">Brutto: {{Math.round(panelcourse.coursePrice*1.19)}},- €</h4>\
  <h4 style="color:136b26">Dauer: {{panelcourse.number_of_days}} Tage</h4>\
  <h4 style="color:#FFA639">Mindestteilnehmerzahl: {{panelcourse.min_participants}} Personen</h4></div>\
  </div>\
  </div>\
  </div> \
  </div>',
  replace: true
 }
})


</script>