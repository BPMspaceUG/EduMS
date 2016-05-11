<script>
/* 
* This file contains the following templates for EduMS reservation Form: 
- afterReserve for signal a complete reservation 
*/


//Modal to be shown after a reservation button click 
app.directive('afterReserve', function() {
return{
template:
`
<div class="row" style="margin-top: 10px; ">
  <div class="col-md-2"></div>
  <div class="col-md-6" style="font-size=14px" ng-if="rinfo.contactpersonemail && rinfo.courses">
    <h2>Ihr Anfrage wurde gesendet.</h2>
    <p><b>Vielen Dank </b>für die Reservierung von </p>
    <p ng-repeat="course in rinfo.courses track by $index">- {{course.course_name}} am {{course.start_date}} um {{course.start_time}}</p>
    Sie bekommen in Kürze eine E-Mail von uns an {{rinfo.contactpersonemail}} gesendet. 
    Bitte beantworten Sie diese um die Reservierung für {{rinfo.mTeilnehmerZahl}} Personen abzuschließen.    
    </div>
  <div class="col-md-6" style="font-size=14px" ng-if="!(rinfo.contactpersonemail && rinfo.courses)">
    <h2>Ihr Anfrage wurde nicht gesendet.</h2>
    <h3>Fast geschafft... </h3>
    <h4>Bitte geben Sie eine <b>E-Mail-Adresse</b> an, sodass wir Sie erreichen können und die <b>Kurse</b> die Sie besuchen möchten.</h4>
    <h4>Klicken Sie hierfür bitte auf schließen und füllen Sie die die Felder aus. Drücken Sie anschließend bitte erneut auf Anmeldung.</h4>
  </div>
</div>

`
}
});

app.directive('teilnehmer', function() {
return{
template:
`
<h4 style="margin-top: 5px;">Weitere/r Teilnehmer/in {{$index+1}}</h4>
<div class="col-md-4" >

 <div class="col-md-12">
 <div class="col-md-12"  style="margin-top: 2px;">
  <button class="btn btn-default btn-xs" ng-click="removeInput($index)">Teilnehmer entfernen</button>
 </div>
  <div class="col-md-8">
   <input class="form-control" type="text" placeholder="Vorname" ng-model="reserveparticipant.name">
  </div>
  <div class="col-md-8">
   <input class="form-control" type="text" placeholder="Nachname" required="" ng-model="reserveparticipant.sname">
  </div>
 </div>

 <div class="col-md-12">
  <div class="col-md-8">
   <input type="email" required="" class="form-control" placeholder="E-MaiL" ng-model="reserveparticipant.email">
  </div>
  <div class="col-md-10">
   <input type="checkbox" ng-model="reserveparticipant.certificate"> Anmeldung zur Prüfung
  </div>
 </div>

 </div>

`
}
});

</script>
