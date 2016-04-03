
/*SIDEBARTEMPLATES-------------------------------------------------------------------------------------------*/ 
app.directive('rightBarCourseAll', function() {//sideBarCourse = Directive Name
 return{
//Sidebarelement für allgemeine Kurse
template:
'<div class="list-group" >\
  <a class="list-group-item active" style="background-color:#333;">\
    <div class="row">\
      <div class="col-md-3" ng-if="e.eventguaranteestatus">\
        <img class="transparent" alta="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png" src="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png">\
      </div>\
      <div class="col-md-9">\
        <div class="row">\
        <div class="pull-left" style="color:#FFA639; font-size:17px;">Nächster Termin: <b>{{e.start_date}}</b></div>\
        </div>\
\
        <div class="row">\
        <div class="pull-left" style="color:#ccc; font-size:19px;"><b>{{e.course_name}}</b></div>\
        </div>\
      </div>\
    </div>\
    <div style="margin-top: 5px;">\
      <button type="button" style="width:107px;" class="btn btn-info btn-sm" ng-click= "e.btnInfo=!e.btnInfo">\
        <span class="fa-stack"><i class="fa fa-info fa-stack-1x fa-inverse" style="color:#0e0067; font-size:17px;"></i></span>Info\
      </button> \
      <div class="fa fa-caret-down" style="color:#00675a; font-size:29px;"> </div> \
      <button type="button" style="color:#333;" class="btn btn-success btn-sm" ng-model="reservate" ng-click= "e.btnRegister=!e.btnRegister">\
        <span class="fa-stack"><i class="fa fa-cart-plus fa-stack-1x fa-inverse" style="color:#1d6700; font-size:17px;"></i></span>reservieren\
      </button>\
    </div>\
    <div  ng-show="e.btnInfo">\
      <div style="color:#FFA639; font-size:17px; margin-top: 3px;"><b>Start: {{e.start_date}} {{e.start_time}} Uhr</b></div> \
      <div style="color:#FFA639; font-size:17px;"><b>Ende: {{e.finish_date}} {{e.finish_time}} Uhr</b></div> \
      <div ng-bind-html="e.location_description"></div>\
    </div>\
    <div ng-show="e.btnRegister">\
      <register-form></register-form>\
    </div>\
  </a>\
</div>'

}
});



app.directive('rightBarCourseByTopic', function() {//sideBarCourse = Directive Name
 return{
  template:
  '<div class="list-group" >\
  <a class="list-group-item active" style="background-color:#333;">\
    <div class="row">\
      <div class="col-md-3" ng-if="sbc.eventguaranteestatus">\
        <img class="transparent" alta="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png" src="https://www.mitsm.de/images/CDN/mITSM_ICON_OT_Formular_Termingarantie_klein.png">\
      </div>\
      <div class="col-md-9" >\
        <div class="row">\
          <div class="pull-left" style="color:#FFA639;"><b>{{sbc.start_date}}</b></div>\
        </div>\
        <div class="row">\
          <div style="color:#ccc;"  class="pull-left"><b>{{sbc.course_name}}</b></div>\
        </div>\
      </div>\
\
      <div style="margin-top: 5px;">\
        <button type="button" style="width:107px;" class="btn btn-info btn-sm" ng-click= "sbc.btnInfo=!sbc.btnInfo">\
          <span class="fa-stack"><i class="fa fa-info fa-stack-1x fa-inverse" style="color:#0e0067; font-size:17px;"></i></span>Info\
        </button>\
        <div class="fa fa-caret-down" style="color:#00675a; font-size:29px;"> </div>\
        <button type="button" style="color:#333;" class="btn btn-success btn-sm" ng-model="reservate" ng-click= "sbc.btnRegister=!sbc.btnRegister">\
        <span class="fa-stack"><i class="fa fa-cart-plus fa-stack-1x fa-inverse" style="color:#1d6700; font-size:17px;"></i></span>reservieren\
      </button>\
    </div>\
    <div ng-show="sbc.btnInfo">\
      \
        <div style="color:#FFA639; font-size:17px; margin-top: 3px;"><b>Start: {{sbc.start_date}} {{sbc.start_time}}</b></div>\
        <div style="color:#FFA639; font-size:17px;"><b>Ende: {{sbc.finish_date}} {{sbc.finish_time}} Uhr</b></div> \
        <div style="color:#FFA639; font-size:17px;"><b>Internet-Location-Name: {{sbc.internet_location_name}}</b></div>\
          <div ng-bind-html="sbc.location_description"></div>\
        </div>\
        <div ng-show="sbc.btnRegister">\
        <register-form-two></register-form-two>\
      </div>\
    </a>\
</div>'
 }
});






app.directive('registerForm', function() {//sideBarCourse = Directive Name
 return{
//Sidebarelement für allgemeine Kurse
template:'<form name="formReg" class="form-horizontal" novalidate>\
  <div class="form-group has-warning">\
\
    <div class="row" style="margin-top: 2px;">\
      <div class="col-md-3">{{rinfo.mVorname}} {{rinfo.mFamName}}</div>\
      <div class="col-md-3">\
        <div class="input-group" class="form-input">\
          <input type="text" style="margin-top: 5px;" class="form-control" id="inputNameId{{e.sysName}}" placeholder="Vorname" name="inputNameName{{e.sysName}}" ng-model="rinfo.mVorname">\
        </div>\
      </div>\
      <div class="col-md-3">\
        <div class="input-group" class="form-input">\
          <input type="text" style="margin-top: 5px;" class="form-control" id="inputFamNameId{{e.sysName}}" placeholder="Nachname" ng-model="rinfo.mFamName">\
        </div>\
      </div>\
    </div>\
\
    <div class="row" style="margin-top: 2px; ">\
      <div class="col-md-3">{{rinfo.mTeilnehmerZahl}} {{rinfo.mAdresse}}</div>\
      <div class="col-md-3">\
        <div class="input-group" class="form-input">\
          <input type="anzahl" class="form-control" id="inputAnzahlId{{e.sysName}}" placeholder="Teilnehmerzahl" ng-model="rinfo.mTeilnehmerZahl">\
        </div>\
      </div>\
      <div class="col-md-3">\
        <div class="input-group" class="form-input">\
          <input type="email" class="form-control" id="inputEmailId{{e.sysName}}" placeholder="Kontakt E-Mail Adresse" ng-model="rinfo.mAdresse">\
        </div>\
      </div>\
    </div>\
  </div>\
  <input type="submit" ng-click="reservate(e.sysName)" class="btn btn-success" style="color:#333;" value="Reservierungsanfrage Abschicken"/>\
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
  <div style="color:#78b433">Mwst. ({{Math.round(panelcourse.coursePrice*0.19)}},- €)</div>\
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