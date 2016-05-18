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
template:
`<div class="list-group " >
          <div class="list-group-item event">
          
            <div class="row">
              <div class="col-md-1">
                <div class="row"><br><br></div>
                <div class="row"> <i class="fa fa-caret-right fa-2x" aria-hidden="true" ></i> </div>
                </div>
                
              <div class="col-md-7" style="text-align: left;">
                <div class="row" >{{e.start_date | date:"dd/MM/yyyy"}}<br>{{e.internet_location_name}}</div>
                <div class="row" ><b>{{e.course_name}}</b></div>
                <div class="row"><button type="button" class="btn btn-block" ng-model="reservate" 
                  style="margin-top: 15px; " ng-hide="e.btnRegister" ng-click= "e.btnRegister=!e.btnRegister">
                  <i class="fa fa-caret-right" aria-hidden="true"></i> Anmelden!
                </button></div>
              </div>
              
              <div class="col-md-3">
                <div class="row" ng-if="e.eventguaranteestatus == 2">
                  <div class="panel" style=" margin-top: 10px; margin-bottom: 0px; margin-right: -10px; margin-left: 5px;">
                    <b>TERMIN-<br>GARANTIE</b>
                  </div>
                </div>
                <div class="row" ng-if="e.eventguaranteestatus == 5">
                  <div class="panel" style=" margin-top: 10px; margin-bottom: 0px; margin-right: -10px; margin-left: 5px;">
                    <b>WARTELISTE</b>
                  </div>
                </div>
              </div>
            
            </div>
            
          <div class="row">
            <div class="col-md-1" ></div>
            
              <div class="col-md-10">
                <div class="row" style="width=100%">
                  <div ng-show="e.btnRegister">
                  <register-form></register-form>
                  </div>
                </div>
              </div>
              <div class="col-md-1" ></div>
          </div>
          </div>
        </div>

 </div>
 </div>`

}
});




//Nested Sidebarelement: Inputform and button for reservate(e.sysName)
app.directive('registerForm', function() {
 return{
template:`
<form name="formReg" class="form-horizontal" novalidate>
  <div class="form-group">
    <div class="row" style="margin-top: 10px; ">

      <div class="col-md-1"> </div>

      <div class="col-md-8" >

      <div class="row">
        <div class="col-md-8" style="text-align:left"> Teilnehmerzahl </div>
        <div class="col-md-4" style="align:right">
          <input type="number" class="form-control" id="inputAnzahlId{{e.sysName}}" placeholder="1" min="1" 
           ng-model="rinfo.mTeilnehmerZahl">
        </div>
      </div>
      <div class="row" class="input-group" class="form-input">
        <div>
          <input type="email" class="form-control" style="margin-top: 10px; " id="inputEmailId{{e.sysName}}" 
           placeholder="Kontakt E-Mail" ng-model="rinfo.mAdresse">
        </div>
      </div>
      <div class="row">
        <div>
          <button type="submit"  style="margin-top: 10px; " class="btn btn-block" href="#modal-container-1" 
           data-toggle="modal" ng-click="initreslistfromsidebar(e)"><i class="fa fa-cart-plus" aria-hidden="true">
           </i> Weitere Kurse</button>
        </div>
      </div>
      <div class="row">
        <div>
          <button type="button" class="btn btn-block" ng-model="reservate" 
            style="margin-top: 6px;" ng-click="reservate(e.sysName)">
            <i class="fa fa-caret-right" aria-hidden="true" ></i> One-Click Anmeldung
          </button>
        </div>
      </div>

      </div>
	</div>

  </div>
  </form>
`//end register form template
}
});


/*Nested tabelement to show the info of a course*/
app.directive('coursePanelBody', function(){
 return{
  template: `
  <div>
  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active">
      <a href="#inhalt{{panelcourse.sysName}}" aria-controls="inhalt{{panelcourse.sysName}}" 
      role="tab" data-toggle="tab">Inhalt</a></li>

    <li role="presentation">
      <a href="#prüfung{{panelcourse.sysName}}" aria-controls="prüfung{{panelcourse.sysName}}" 
      role="tab" data-toggle="tab">Prüfung & Zertifizierung</a></li>

    <li role="presentation">
      <a href="#kosten{{panelcourse.sysName}}" aria-controls="kosten{{panelcourse.sysName}}" 
      role="tab" data-toggle="tab">Kosten</a></li>

    <li role="presentation">
      <a href="#termine{{panelcourse.sysName}}" aria-controls="termine{{panelcourse.sysName}}" 
      role="tab" data-toggle="tab">Termine</a></li>

  </ul>

  <!-- Tab panes -->
  <div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="inhalt{{panelcourse.sysName}}">
      <div class="panel-body" ng-if="panelcourse.test=0"> 
        <h3>{{panelcourse.courseHeadline}}</h3>
        <div ng-bind-html="panelcourse.courseDescription"></div>
      </div>
      <div ng-bind-html="panelcourse.courseDescription"></div>
    </div>

    <div role="tabpanel" class="tab-pane" id="prüfung{{panelcourse.sysName}}">
      <h3>{{panelcourse.test.courseHeadline || panelcourse.exam.courseHeadline || "\u2b55\u2b55\u2b55¯|_(ツ)_/¯\u2b55\u2b55\u2b55"}}</h3>
      <p>{{panelcourse.test.courseDescription || panelcourse.exam.courseDescription || "Hier folgt in Kürze eine Testbeschreibung"}}</p>
      <div ng-bind-html="panelcourse.test.courseDescription"></div>
    </div>
    <div role="tabpanel" class="tab-pane" id="kosten{{panelcourse.sysName}}">
      <table class="table table-responsive table-hover table-striped" style="width: 80%;">
        <thead>
            <th><h4>Kurs (Dauer)</h4></th>
            <th><h4>Nettopreis</h4></th>
            <th><h4>Bruttopreis</h4></th>
          </thead>
          <tbody>
            <tr>
              <td>{{panelcourse.course_name}}</td>
              <td>{{panelcourse.coursePrice}},- €</td>
              <td>{{panelcourse.brutto}},- €</td>
            </tr>
            <tr> 
              <td>Prüfungsvorbereitung    inklusive</td>
            </tr>
            <tr>
              <td>Prüfungsgebühr</td>
              <td>{{panelcourse.test.coursePrice || panelcourse.exam.coursePrice || "- ? "}},- €</td>
              <td>{{panelcourse.test.brutto || panelcourse.exam.coursePrice*1.19 || "- ? "}},- €</td>
            </tr>
            <tr>
              <td>Mittagessen & Pausenverpflegung   inklusive</td>
            </tr>
            <tr>
              <td>Gesamtpreis:</td>
              <td>{{panelcourse.coursePrice + panelcourse.exam.coursePrice + panelcourse.test.coursePrice}},- €</td>
              <td>{{panelcourse.brutto + panelcourse.test.brutto}},- €</td>
            </tr>
          </tbody>
      </table>
    </div>

    <div role="tabpanel" class="tab-pane" id="termine{{panelcourse.sysName}}">
      <div>
        <table class="table table-responsive table-hover table-striped" style="width: 80%;">
          <thead>
              <th><h4>Kurs</h4></th>
              <th><h4>Start</h4></th>
              <th><h4>Ende</h4></th>
              <th><h4>Ort</h4></th>
            </thead>
            <tbody>
              <tr ng-repeat="event in panelcourse.events | limitTo:5">
                <td>{{panelcourse.course_name}}</td>
                <td>{{event.start_date | date:"dd/MM/yyyy"}} {{event.start_time | date:"hh"}} Uhr</td>
                <td>{{event.finish_date | date:"dd/MM/yyyy"}}</td>
                <td>{{event.internet_location_name}}</td>
              </tr>
            </tbody>
      </table>
     </div>
    </div>
  </div>
</div>
`,
  replace: true
 }
})


//Long text
app.directive('agb', function() {
  return{template:'<p>Mit der Registrierung, Anfrage, Reservierung erkläre ich mich einverstanden, dass meine Adresse bei der&nbsp; ACME elektronisch gespeichert wird. Privatadressen, personenbezogene Daten und E-Mail-Adressen werden selbstverständlich vertraulich behandelt und NICHT an Dritte weitergegeben.<br />Daten, die im Rahmen der Prüfungen benötigt werden, stellen wir der TÜV SÜD-Zertifizierung Service GmbH oder anderen Prüfungsinstituten (EXIN, APMG) im Rahmen der Prüfungsanmeldung zur Verfügung.</p><h2>Einsatz von Google Analytics</h2><p style="text-align: justify;">„Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.<br /> Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.<br /> Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="http://tools.google.com/dlpage/gaoptout?hl=de">http://tools.google.com/dlpage/gaoptout?hl=de</a>.“</p><p style="text-align: justify;"><strong>ZUSATZ<br />Auf dieser Webseite wurde die IP-Anonymisierung aktiviert, so dass die IP-Adresse der Nutzer von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.</strong></p><p><a class="info" href="http://www.google.de/analytics/terms/de.html" target="_blank">Nutzungsbedingungen von Google für Analytics</a></p>'}
});

//Long text
app.directive('datenschutzerklaerung', function() {
  return{template:'<p><span style="font-size: 12pt;">Bedingungen für Seminare ACME</span></p><p><strong>Allgemeines</strong><br />Allen Leistungen im Rahmen unserer Seminare liegen diese "Allgemeinen Geschäftsbedingungen für Seminare" der ACME zugrunde.</p><p><strong>Anmeldungen</strong><br />Sie können sich telefonisch, schriftlich, per Fax und im Internet anmelden. Sie erhalten von uns umgehend eine Anmeldebestätigung (Zeitpunkt des Vertragsabschlusses). Da die Teilnehmerzahl für unsere Seminare begrenzt ist, berücksichtigen wir die Anmeldungen in der Reihenfolge ihres Eingangs. Ihre Daten werden für interne Zwecke elektronisch gespeichert und im Rahmen der Prüfungen an den TÜV Akademie Süddeutschland weitergegeben.</p><p><strong>Absagen und Widerrufsrecht</strong><br />Sie können Ihre Anmeldung bis 15 Werktage vor Seminarbeginn kostenfrei widerrufen. Wenn Sie Ihre Anmeldung erst innerhalb von 14 Werktagen vor Seminarbeginn (dabei wird der Tag des Seminarbeginns nicht mitgerechnet) stornieren oder zum Seminar nicht erscheinen, stellen wir Ihnen die volle Seminargebühr in Rechnung. Wir behalten uns Absagen aus organisatorischen Gründen (etwa bei Nichterreichen der vom Seminartyp abhängigen Mindestteilnehmerzahl oder kurzfristigem, krankheitsbedingten Ausfall des Referenten) vor. Bei einer Absage durch uns werden wir versuchen, Sie auf einen anderen Termin und/oder einen anderen Veranstaltungsort umzubuchen, sofern Sie hiermit einverstanden sind. Andernfalls erhalten Sie Ihre bezahlten Gebühren zurück; weitergehende Ansprüche bestehen nicht.</p><p><strong>Gebühren</strong><br />Die Gebühren für den Besuch unserer Seminare sind in Euro zu entrichten und 14 Tage vor dem Seminartermin fällig. Eine nur zeitweise Teilnahme an unseren Seminaren berechtigt Sie nicht zu einer Minderung der Seminargebühr.</p><p><strong>Durchführungsabweichung</strong><br />Wir behalten uns vor, Termine und Durchführungsorte zu ändern.</p><p><strong>Termin- und Standortgarantie</strong><br />Für Schulungstermine und -standorte, die mit dem Zusatz "Termin- bzw. Standortgarantie" gekennzeichnet sind, gilt die Garantie für die Durchführung des Termins und für das Stattfinden der Schulung am benannten Schulungsort (z. B. München). Änderungen auf Grund höherer Gewalt behalten wir uns vor.</p><p><strong><strong>Copyright</strong><br /></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form - auch nicht für Zwecke der Unterrichtsgestaltung -reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong><strong><strong>Urheber- und Markenrechte</strong><br /></strong></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form, auch nicht für Zwecke der Unterrichtsgestaltung, reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong>Haftung</strong><br />In unseren Seminaren werden Unterricht und Übungen so gestaltet, dass ein aufmerksamer Teilnehmer die Seminarziele erreichen kann. Für den Schulungserfolg haften wir jedoch nicht. Soweit nicht durch § 309 Nr. 7 und 8 BGB geregelt, haften wir für von unseren Mitarbeitern vorsätzlich oder grob fahrlässig verursachte Schäden - gleich aus welchem Rechtsgrund – einmalig bis zu einem Gesamtbetrag in Höhe der Gesamtvergütung, höchstens jedoch insgesamt bis zu einem Betrag von EUR 10.000. Eine weitergehende Haftung ist ausgeschlossen. Die ACME haftet nicht für Schäden, die durch Viren auf kopierten Datenträgern entstehen können. Dies gilt auch für public domain Software. Von Teilnehmern mitgebrachte Datenträger dürfen grundsätzlich nicht auf unsere Rechner aufgespielt werden. Sollte der ACME durch eine Zuwiderhandlung hiergegen ein Schaden entstehen, behält sie sich die Geltendmachung von Schadensersatzansprüchen vor</p><p><strong>Eingetragene Warenzeichen</strong><br />Wir übernehmen keine Gewähr dafür, dass die erwähnten Produkte, Verfahren und sonstige Namen frei von Schutzrechten Dritter sind.</p><p><strong>Sonstiges</strong><br />Auf das Vertragsverhältnis und seine Durchführung findet ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss der Regelungen des CISG Anwendung. Diese Rechtswahl gilt auch für Verbraucherverträge, sofern Art. 29 EGBGB nicht entgegensteht.</p>'}
});

//Long text
app.directive('impressum', function() {
  return{template:'<p>Bruce Wayne (bat.man<i class="fa fa-at"></i>gotham.xx)</p><p>Clark Kent (super.man<i class="fa fa-at"></i>krypton.S)</p><p><strong>Registergericht </strong><br />HRB 12 34 56; Handelsregister Atlantis</p><p><strong>Datenschutzbeauftragter</strong><br />Sheldon Cooper (sh.cooper<i class="fa fa-at"></i>physX.com)</p><p><strong>Umsatzsteuer-Identifikationsnummer </strong><br />Ust. - Ident-Nr.: DE 333 0815 99</p><p><strong>Verantwortlich f&uuml;r den Inhalt</strong><br />ist die ACME</p><p><strong>&copy; 2016 ACME A company makes everything</strong></p><p>Die Website edums.de sowie die einzelnen Beiträge sind urheberrechtlich geschützt. Übersetzung, Druck, Vervielfältigung sowie Speicherung in Datenverarbeitungsanlagen o.ä. werden nur mit ausdrücklicher Genehmigung der ACME gestattet. Auch das Frame-Linking bedarf der Zustimmung.<br />Die Marke ACME ist Eigentum von Bruce Wayne.<br />Die ACME übernimmt keinerlei Gewähr für Vollständigkeit, Richtigkeit und Aktualität. Jegliche Haftung ist ausgeschlossen. Insbesondere ist die ACME nicht verantwortlich für Inhalte externer Internetseiten.</p>'}
});


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

</script>
