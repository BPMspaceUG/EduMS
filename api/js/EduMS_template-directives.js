<script>
/* 
* This file contains the following templates for EduMS: 
- rightBarCourseAll for repeatet sidebarelements
- registerForm for forms in sidebarelements
- coursePanelBody for content in the topic-tabPanel-acordion
- agb, datenschutzerklaerung, impressum for huge text in "sonstiges" 
- afterReserve for signal a complete reservation 
*/
//Sidebarelement
app.directive('rightBarCourseAll', function() {
 return{
template:'<div class="well well-sm">\
\
  <div class="col-xs-12 col-sm-12 hiden-md col-md-12 hidden-lg col-lg-12 ">\
    <div class="row edums-event-none" ng-if="e.eventguaranteestatus == 1">\
      <strong> </strong>\
    </div>\
    <div class="row edums-event-garantie" ng-if="e.eventguaranteestatus == 2 || e.eventguaranteestatus == 4 || e.eventguaranteestatus == 3">\
    <span class=\
    "label edums-guaranteelabel label-success"><strong>{{stateinfo.guaranteed.eventguaranteestatus}}</strong></span>\
    </div>\
    <div class="row edums-event-waitlist" ng-if="e.eventguaranteestatus == 3">\
      <span class=\
      "label edums-guaranteelabel label-primary"><strong>{{e.guaranteelabel}}</strong></span>\
    </div>\
    <div class="row edums-event-onefree" ng-if="e.eventguaranteestatus == 4">\
      <span class="label edums-guaranteelabel label-warning"><strong>{{e.guaranteelabel}}</strong></span>\
    </div>\
    <div class="row edums-event-threefree" ng-if="e.eventguaranteestatus == 5">\
      <span class="label edums-guaranteelabel label-danger"><strong>{{e.guaranteelabel}}</strong></span>\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="hidden-xs hidden-sm col-md-1 col-lg-1">\
      <div class="row">\
        <br>\
        <br>\
      </div>\
      <div class="row">\
        <i aria-hidden="true" class="fa fa-caret-right fa-2x"></i>\
      </div>\
    </div>\
    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 edums-event-content">\
      <div class="row edums-event-date">\
        {{e.start_date | date:"dd/MM/yyyy"}}<br>\
        {{e.internet_location_name}}\
      </div>\
      <div class="row edums-event-name">\
        <strong>{{e.course_name}}</strong>\
      </div>\
      <div class="row">\
        <button class="btn btn-block edums-event-btnreserve" ng-click="btnRegFkt(e)" ng-hide="e.btnRegister" ng-model="reservate" type="button"><i aria-hidden="true" class="fa fa-caret-right"></i>\
        Anmelden!</button>\
      </div>\
    </div>\
\
    <div class="hidden-xs hidden-sm hidden-md col-md-3 col-lg-3 ">\
      <div class="row edums-event-none" ng-if="e.eventguaranteestatus == 1">\
        <strong> </strong>\
      </div>\
      <div class="row edums-event-garantie" ng-if="e.eventguaranteestatus == 2 || e.eventguaranteestatus == 4 || e.eventguaranteestatus == 3">\
      <span class=\
      "label edums-guaranteelabel label-success"><strong>{{stateinfo.guaranteed.eventguaranteestatus}}</strong></span>\
      </div>\
      <div class="row edums-event-waitlist" ng-if="e.eventguaranteestatus == 3">\
        <span class=\
        "label edums-guaranteelabel label-primary"><strong>{{e.guaranteelabel}}</strong></span>\
      </div>\
      <div class="row edums-event-onefree" ng-if="e.eventguaranteestatus == 4">\
        <span class="label edums-guaranteelabel label-warning"><strong>{{e.guaranteelabel}}</strong></span>\
      </div>\
      <div class="row edums-event-threefree" ng-if="e.eventguaranteestatus == 5">\
        <span class="label edums-guaranteelabel label-danger"><strong>{{e.guaranteelabel}}</strong></span>\
      </div>\
    </div>\
\
  </div>\
\
\
  <div class="row">\
    <div class="col-xs-12 hidden-xs col-sm-1 col-md-1"></div>\
    <div class="col-xs-12 col-sm-11 col-md-11">\
      <div class="row edums-event-btnregform">\
        <div ng-show="e.btnRegister">\
          <register-form class="edums-sideregform"></register-form>\
        </div>\
      </div>\
    </div>\
    <div class="col-xs-12 hidden-xs col-sm-1 col-md-1"></div>\
  </div>\
\
</div>'

}
});





//Nested Sidebarelement: Inputform and button for reservate(e.sysName)
app.directive('registerForm', function() {
 return{
template:
'<form name="formReg" class="form-horizontal" novalidate>\
  <div class="form-group">\
    <div class="row edums-sideregform-body">\
\
      <div class="col-xs-12 hidden-xs col-sm-12 hidden-sm col-md-1 col-lg-1"> </div>\
\
      <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8" >\
\
      <div class="row">\
        <div class="col-xs-12 col-sm-6 col-md-6 edums-sideregform-partitionertext"> Teilnehmerzahl </div>\
\
        <div class="col-xs-9 col-sm-4 col-md-4 edums-sideregform-partitionernumber">\
          <input type="text" class="form-control edums-partitionernumber" id="inputAnzahlId{{e.sysName}}" placeholder="1" min="1" \
           ng-model="rinfo.mTeilnehmerZahl">\
        </div>\
              \
        <div class="col-xs-2 col-sm-1 col-md-1 edums-sideregform-partitionernumberarrows pull-left">\
         <i class="fa fa-caret-up" ng-mousedown="rinfo.mTeilnehmerZahl = rinfo.mTeilnehmerZahl +1" ></i><br>\
         <i class="fa fa-caret-down" ng-mousedown="teilnehmerZahlcountDown()" ></i>\
        </div>\
\
      </div>\
      <div class="row" class="input-group" class="form-input">\
        <div>\
          <input type="email" class="form-control edums-sideregform-email" id="inputEmailId{{e.sysName}}" \
           placeholder="Kontakt E-Mail" ng-model="rinfo.contactpersonemail">\
        </div>\
      </div>\
      <div class="row">\
        <div>\
          <button type="submit" class="btn btn-block edums-sideregform-btnta" href="#modal-container-1" \
           data-toggle="modal"><i class="fa fa-cart-plus" aria-hidden="true">\
           </i> Weitere Kurse</button>\
        </div>\
      </div>\
      <div class="row">\
        <div>\
          <button type="button" class="btn btn-block edums-sideregform-btnreserve" ng-model="reservate" href="#modal-container-5"\
           ng-click="reservate(e)" data-toggle="modal">\
            <i class="fa fa-caret-right" aria-hidden="true" ></i> One-Click Anmeldung\
          </button>\
\
        </div>\
      </div>\
\
      </div>\
  </div>\
\
  </div>\
  </form>'
}
});


/*Nested tableement to show the info of a course*/
app.directive('coursePanelBody', function(){
 return{
  template: '\
  <div class="edums-collapse-navtabs">\
  <!-- Nav tabs -->\
  <ul class="nav nav-tabs" role="tablist">\
    <li role="presentation" class="active">\
      <a href="#inhalt{{panelcourse.sysName}}" aria-controls="inhalt{{panelcourse.sysName}}" \
      role="tab" data-toggle="tab">Inhalt</a></li>\
\
    <li role="presentation">\
      <a href="#prüfung{{panelcourse.sysName}}" aria-controls="prüfung{{panelcourse.sysName}}" \
      role="tab" data-toggle="tab">Prüfung & Zertifizierung</a></li>\
\
    <li role="presentation">\
      <a href="#kosten{{panelcourse.sysName}}" aria-controls="kosten{{panelcourse.sysName}}" \
      role="tab" data-toggle="tab">Kosten</a></li>\
\
    <li role="presentation">\
      <a href="#termine{{panelcourse.sysName}}" aria-controls="termine{{panelcourse.sysName}}" \
      role="tab" data-toggle="tab">Termine</a></li>\
\
  </ul>\
\
  <!-- Tab panes -->\
  <div class="tab-content" id="coursedescr{{panelcourse.course_id}}">\
\
    <div role="tabpanel" class="tab-pane active" id="inhalt{{panelcourse.sysName}}">\
      <div class="panel-body"> \
        <h3>{{panelcourse.courseHeadline}}</h3>\
        <div ng-bind-html="panelcourse.courseDescription"></div>\
      </div>\
      \
    </div>\
\
    <div role="tabpanel" class="tab-pane" id="prüfung{{panelcourse.sysName}}">\
      <div class="panel-body"> \
        <h3>{{panelcourse.exam.courseHeadline}}</h3>\
        <div ng-bind-html="panelcourse.exam.courseDescription"></div>\
      </div>\
    </div>\
\
    <div role="tabpanel" class="tab-pane" id="kosten{{panelcourse.sysName}}">\
      <table class="table table-responsive table-hover table-striped edums-panelbody-pricetable">\
        <thead>\
            <th><h4>Kurs</h4></th>\
            <th><h4>Nettopreis</h4></th>\
            <th><h4>Bruttopreis</h4></th>\
          </thead>\
          <tbody>\
            <tr>\
              <td>{{panelcourse.course_name}}</td>\
              <td>{{panelcourse.coursePrice | number : 2}} €</td>\
              <td>{{panelcourse.brutto | number : 2}} €</td>\
            </tr>\
            <tr> \
              <td>Prüfungsvorbereitung    inklusive</td>\
            </tr>\
            <tr>\
              <td>Prüfungsgebühr</td>\
              <td>{{ panelcourse.exam.coursePrice || "- ? " | number : 2}} €</td>\
              <td>{{ panelcourse.exam.coursePrice*1.19 || "- ? " | number : 2}} €</td>\
            </tr>\
            <tr>\
              <td>Mittagessen & Pausenverpflegung   inklusive</td>\
            </tr>\
            <tr>\
              <td>Gesamtpreis:</td>\
              <td>{{panelcourse.exam.coursePrice + panelcourse.coursePrice | number : 2}} €</td>\
              <td>{{panelcourse.brutto + panelcourse.exam.brutto | number : 2}} €</td>\
            </tr>\
          </tbody>\
      </table>\
    </div>\
\
    <div role="tabpanel" class="tab-pane" id="termine{{panelcourse.sysName}}">\
    <right-bar-course-all ng-repeat="e in panelcourse.events"  class="edums-allevents-event"></right-bar-course-all>\
    \
      <!--div>\
        <table class="table table-responsive table-hover table-striped edums-panelbody-eventtable">\
          <thead>\
              <th><h4>Status</h4></th>\
              <th><h4>Kurs</h4></th>\
              <th><h4>Start</h4></th>\
              <th><h4>Ort</h4></th>\
            </thead>\
            <tbody>\
              <tr ng-repeat="event in panelcourse.events">\
                <td>\
                  <div class="row edums-event-garantie" ng-if="event.eventguaranteestatus == 2 || event.eventguaranteestatus == 4 || event.eventguaranteestatus == 3">\
                    <span class="label edums-guaranteelabel label-success">\
                      <strong>TERMIN-GARANTIE</strong>\
                    </span>\
                  </div>\
                  <div class="row edums-event-waitlist" ng-if="event.eventguaranteestatus == 3">\
                    <span class="label edums-guaranteelabel label-primary">\
                      <strong>3 PLÄTZE FREI</strong>\
                    </span>\
                  </div>\
                  <div class="row edums-event-onefree" ng-if="event.eventguaranteestatus == 4">\
                    <span class="label edums-guaranteelabel label-warning">\
                      <strong>1 PLATZ FREI</strong>\
                    </span>\
                  </div>\
                </div>\
                <div class="row edums-event-threefree" ng-if="event.eventguaranteestatus == 5">\
                  <span class="label edums-guaranteelabel label-danger">\
                    <strong>WARTELISTE</strong>\
                  </span>\
                </div>\
                </td>\
                <td>{{panelcourse.course_name}}</td>\
                <td>{{event.start_date | date:"dd/MM/yyyy"}}</td>\
                <td>{{event.internet_location_name}}</td>\
              </tr>\
            </tbody>\
      </table>\
     </div-->\
    </div>\
  </div>\
</div>\
',
  replace: true
 }
})


//Long text
app.directive('agb', function() {
return{
template:'\
<div ng-if="!terms_and_conditions" class="edums-warning">Warnung: Keine AGB verfügbar.</div>\
<div ng-bind-html="terms_and_conditions"></div>\
'
}
});

//Long text
app.directive('datenschutzerklaerung', function() {
return{
template:'<div ng-if="!protection_of_data_privacy" class="edums-warning">Warnung: Keine Datenschutzerklärung verfügbar.</div><div ng-bind-html="protection_of_data_privacy">a</div>'}
});

//Long text
app.directive('impressum', function() {
return{
template:'\
<div ng-if="!imprint" class="edums-warning">Warnung: Kein Impressum verfügbar.</div>\
<div ng-bind-html="imprint"></div>\
'}
});



//Modal to be shown after a reservation button click 
app.directive('afterReserve', function() {
return{
template:
'\
<div>\
\
<div ng-if="!send.contactpersonemail" class="">\
  <div class="row">\
    <div class="">\
      <h4>Bitte geben Sie eine <strong>E-Mail-Adresse</strong> an, sodass wir Sie erreichen können.</h4>\
    </div>\
  </div>\
</div>\
\
<div ng-if="!(send.eventIds.length > 0)" class="">\
  <div class="row">\
    <div class="">\
      <h4>Bitte setzen Sie einen <strong>Haken</strong> rechts in der <strong>Auswahl</strong>, sodass wir wissen welche <strong>Kurse</strong> wir für sie Reservieren können.</h4>\
    </div>\
  </div>\
</div>\
\
<div class="row edums-finishmodal-content" ng-if="rinfo.finish">\
  <div class="row">\
    <div class="col-xs-12">\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="col-xs-12">\
      <h2>Ihre Reservierung wurde gesendet.</h2>\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="col-xs-11 col-sm-11 col-md-11 col-xs-offset-1 col-sm-offset-1 col-md-offset-1">\
    <div ng-bind-html="after_reservation_text_pre"></div>\
      <p ng-if="!after_reservation_text_pre"><strong>Vielen Dank </strong>für die Reservierung.</p>\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="col-xs-11 col-sm-11 col-md-11 col-xs-offset-1 col-sm-offset-1 col-md-offset-1">\
      <p>Teilnehmerzahl: {{send.mTeilnehmerZahl}}</p>\
    </div>\
  </div>\
\
  <div class="row">\
    <div class="col-xs-12 col-sm-12 col-md-9 col-md-offset-3">\
      <div ng-repeat="course in rinfo.courses track by $index">\
        <p><strong>{{course.course_name}}</strong></p><br>\
        <p>{{course.internet_location_name}}, {{course.start_date}} - {{course.finish_date}}</p><br>\
        <div class="row" ng-if="course.checked">\
          <div class="col-xs-12 col-sm-12 col-md-4">Kurs:</div>\
          <div class="col-xs-12 col-sm-12 col-md-8">{{course.price * 1.19 | number : 2}} €</div>\
        </div>\
        <div class="row" ng-if="course.exam.checked">\
          <div class="col-xs-12 col-sm-12 col-md-4">Prüfung:</div>\
          <div class="col-xs-12 col-sm-12 col-md-8">{{course.exam.brutto | number : 2}} €</div>\
        </div>\
      </div>\
    </div>\
  </div>  \
\
    <div ng-bind-html="after_reservation_text_post"></div>\
  <div class="row" ng-if="send.finish">\
    <div class="col-xs-12" ng-if="!after_reservation_text_post">\
      <p>Sie bekommen in Kürze eine E-Mail von uns an {{send.contactpersonemail}} gesendet.</p> \
      <p>Wir melden uns in Kürze mit weiteren Informationen zum Kurs und einer Platzbestätigung.</p><br><br>\
      <p>Mit freundlichen Grüßen</p> \
      <p>Das TEAM von {{send.brand}}</p> \
    </div>\
  </div>\
</div>\
\
\
\
\
</div>'


}
});

//mitsm location-element
app.directive('mitsm', function() {
  return{
    template:
'\
<h3>mITSM &nbsp;Schulungsstandort</h3>\
\
<p>Die Schulungen in M&uuml;nchen finden im mITSM Schulungszentrum in der N&auml;he des Heimeranplatzes (S/U) statt. Die genaue Adresse ist&nbsp;</p>\
\
<p style="margin-left: 40px;">Hansapark<br />\
<a href="https://goo.gl/maps/2UmJuErCSkx" target="_blank">Landaubogen 1 (ehemals Leonhard-Moll-Bogen 1)<br />\
81373 M&uuml;nchen</a><br />\
Tel +49 89 55 27 55 70<br />\
Fax +49 89 55 27 55 71</p>\
\
<h3>&Ouml;ffentliche Verkehrsmittel und PKW</h3>\
\
<p>Wir empfehlen, mit &ouml;ffentlichen Verkehrsmitteln anzureisen. Parkpl&auml;tze in der Tiefgarage stehen leider nicht zur Verf&uuml;gung. Wer trotzdem mit dem Auto kommen m&ouml;chte, hat in der Siegenburger Stra&szlig;e noch die beste Chance auf einen freien Parkplatz. Alternativ ist die n&auml;heste P+R Tiefgarage Heimeranplatz (Garmischer Stra&szlig;e 19) nur wenige Gehminuten entfernt, Preise und Modalit&auml;ten entnehmen Sie bitte der Homepage.</p>\
\
<p style="margin-left: 40px;">S-Bahn: S7, S20, S27 Haltestelle Heimeranplatz<br />\
U-Bahn: U4, U5 Haltestelle Heimeranplatz<br />\
Bus: 62, 131 Haltestelle Hansapark</p>\
\
<p>Zur Fahrplanauskunft des <a href="http://efa.mvv-muenchen.de/index.html#trip@enquiry" name="MVV München" target="_blank" title="MVV München">MVV M&uuml;nchen</a></p>\
'
}
});
</script>
