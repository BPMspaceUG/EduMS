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
    <div class="list-group-item">
    
      <div class="row">
        <div class="col-md-1">
          <div class="row"><br><br></div>
          <div class="row"> <i class="fa fa-caret-right fa-2x" aria-hidden="true" ></i> </div>
        </div>
          
        <div class="col-md-7 edums-event-content">
          <div class="row edums-event-date" >{{e.start_date | date:"dd/MM/yyyy"}}<br>{{e.internet_location_name}}</div>
          <div class="row edums-event-name" ><b>{{e.course_name}}</b></div>
          <div class="row"><button type="button" class="btn btn-block edums-event-btnreserve" ng-model="reservate" 
            ng-hide="e.btnRegister" ng-click= "btnRegFkt(e)">
            <i class="fa fa-caret-right" aria-hidden="true"></i> Anmelden!
          </button></div>
        </div>
        
        <div class="col-md-3">
          <div class="row edums-event-none" ng-if="e.eventguaranteestatus == 1">
            <div class="panel">
              <b>*</b>
            </div>
          </div>
          <div class="row edums-event-garantie" ng-if="e.eventguaranteestatus == 2 || e.eventguaranteestatus == 4 || e.eventguaranteestatus == 3">
            <div class="panel">
              <b>TERMIN-<br>GARANTIE</b>
            </div>
          </div>
          <div class="row edums-event-waitlist" ng-if="e.eventguaranteestatus == 3">
            <div class="panel">
              <b>3 PLÄTZE<br>FREI</b>
            </div>
          </div>
          <div class="row edums-event-onefree" ng-if="e.eventguaranteestatus == 4">
            <div class="panel">
              <b>1 PLATZ<br>FREI</b>
            </div>
          </div>
        </div>
        <div class="row edums-event-threefree" ng-if="e.eventguaranteestatus == 5">
          <div class="panel">
            <b>WARTELISTE</b>
          </div>
        </div>
      
      </div>
      
    <div class="row">
      <div class="col-md-1" ></div>
      
        <div class="col-md-10">
          <div class="row edums-event-btnregform">
            <div ng-show="e.btnRegister">
            <register-form class="edums-sideregform"></register-form>
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
    <div class="row edums-sideregform-body">

      <div class="col-md-1"> </div>

      <div class="col-md-8" >

      <div class="row">
        <div class="col-md-7 edums-sideregform-partitionertext"> Teilnehmerzahl </div>

        <div class="col-md-4 edums-sideregform-partitionernumber">
          <input type="text" class="form-control" id="inputAnzahlId{{e.sysName}}" placeholder="1" min="1" 
           ng-model="rinfo.mTeilnehmerZahl">
        </div>
              
         <i class="fa fa-caret-up" ng-mousedown="rinfo.mTeilnehmerZahl = rinfo.mTeilnehmerZahl +1" ></i><br>
         <i class="fa fa-caret-down" ng-mousedown="teilnehmerZahlcountDown()" ></i>

      </div>
      <div class="row" class="input-group" class="form-input">
        <div>
          <input type="email" class="form-control edums-sideregform-email" id="inputEmailId{{e.sysName}}" 
           placeholder="Kontakt E-Mail" ng-model="rinfo.contactpersonemail">
        </div>
      </div>
      <div class="row">
        <div>
          <button type="submit" class="btn btn-block edums-sideregform-btnta" href="#modal-container-1" 
           data-toggle="modal" ng-click="initreslistfromsidebar(e)"><i class="fa fa-cart-plus" aria-hidden="true">
           </i> Weitere Kurse</button>
        </div>
      </div>
      <div class="row">
        <div>
          <button type="button" class="btn btn-block edums-sideregform-btnreserve" ng-model="reservate" href="#modal-container-2"
           ng-click="reservate(e)" data-toggle="modal">
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


/*Nested tableement to show the info of a course*/
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
  <div class="tab-content" id="coursedescr{{panelcourse.course_id}}">

    <div role="tabpanel" class="tab-pane active" id="inhalt{{panelcourse.sysName}}">
      <div class="panel-body"> 
        <h3>{{panelcourse.courseHeadline}}</h3>
        <div ng-bind-html="panelcourse.courseDescription"></div>
      </div>
      
    </div>

    <div role="tabpanel" class="tab-pane" id="prüfung{{panelcourse.sysName}}">
      <div class="panel-body"> 
        <h3>{{panelcourse.exam.courseHeadline}}</h3>
        <div ng-bind-html="panelcourse.exam.courseDescription"></div>
      </div>
    </div>

    <div role="tabpanel" class="tab-pane" id="kosten{{panelcourse.sysName}}">
      <table class="table table-responsive table-hover table-striped edums-panelbody-pricetable">
        <thead>
            <th><h4>Kurs ({{panelcourse.duration}})</h4></th>
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
              <td>{{ panelcourse.exam.coursePrice || "- ? "}},- €</td>
              <td>{{ panelcourse.exam.coursePrice*1.19 || "- ? "}},- €</td>
            </tr>
            <tr>
              <td>Mittagessen & Pausenverpflegung   inklusive</td>
            </tr>
            <tr>
              <td>Gesamtpreis:</td>
              <td>{{panelcourse.exam.coursePrice*1 + panelcourse.coursePrice*1}},- €</td>
              <td>{{panelcourse.brutto + panelcourse.exam.brutto}},- €</td>
            </tr>
          </tbody>
      </table>
    </div>

    <div role="tabpanel" class="tab-pane" id="termine{{panelcourse.sysName}}">
      <div>
        <table class="table table-responsive table-hover table-striped edums-panelbody-eventtable">
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
  return{template:'<p>Mit der Registrierung, Anfrage, Reservierung erkläre ich mich einverstanden, dass meine Adresse bei der&nbsp; ACME elektronisch gespeichert wird. Privatadressen, personenbezogene Daten und E-Mail-Adressen werden selbstverständlich vertraulich behandelt und NICHT an Dritte weitergegeben.<br />Daten, die im Rahmen der Prüfungen benötigt werden, stellen wir der TÜV SÜD-Zertifizierung Service GmbH oder anderen Prüfungsinstituten (EXIN, APMG) im Rahmen der Prüfungsanmeldung zur Verfügung.</p><h2>Einsatz von Google Analytics</h2><p>„Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.<br /> Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.<br /> Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="http://tools.google.com/dlpage/gaoptout?hl=de">http://tools.google.com/dlpage/gaoptout?hl=de</a>.“</p><p><strong>ZUSATZ<br />Auf dieser Webseite wurde die IP-Anonymisierung aktiviert, so dass die IP-Adresse der Nutzer von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.</strong></p><p><a class="info" href="http://www.google.de/analytics/terms/de.html" target="_blank">Nutzungsbedingungen von Google für Analytics</a></p>'}
});

//Long text
app.directive('datenschutzerklaerung', function() {
  return{template:'<p><span>Bedingungen für Seminare ACME</span></p><p><strong>Allgemeines</strong><br />Allen Leistungen im Rahmen unserer Seminare liegen diese "Allgemeinen Geschäftsbedingungen für Seminare" der ACME zugrunde.</p><p><strong>Anmeldungen</strong><br />Sie können sich telefonisch, schriftlich, per Fax und im Internet anmelden. Sie erhalten von uns umgehend eine Anmeldebestätigung (Zeitpunkt des Vertragsabschlusses). Da die Teilnehmerzahl für unsere Seminare begrenzt ist, berücksichtigen wir die Anmeldungen in der Reihenfolge ihres Eingangs. Ihre Daten werden für interne Zwecke elektronisch gespeichert und im Rahmen der Prüfungen an den TÜV Akademie Süddeutschland weitergegeben.</p><p><strong>Absagen und Widerrufsrecht</strong><br />Sie können Ihre Anmeldung bis 15 Werktage vor Seminarbeginn kostenfrei widerrufen. Wenn Sie Ihre Anmeldung erst innerhalb von 14 Werktagen vor Seminarbeginn (dabei wird der Tag des Seminarbeginns nicht mitgerechnet) stornieren oder zum Seminar nicht erscheinen, stellen wir Ihnen die volle Seminargebühr in Rechnung. Wir behalten uns Absagen aus organisatorischen Gründen (etwa bei Nichterreichen der vom Seminartyp abhängigen Mindestteilnehmerzahl oder kurzfristigem, krankheitsbedingten Ausfall des Referenten) vor. Bei einer Absage durch uns werden wir versuchen, Sie auf einen anderen Termin und/oder einen anderen Veranstaltungsort umzubuchen, sofern Sie hiermit einverstanden sind. Andernfalls erhalten Sie Ihre bezahlten Gebühren zurück; weitergehende Ansprüche bestehen nicht.</p><p><strong>Gebühren</strong><br />Die Gebühren für den Besuch unserer Seminare sind in Euro zu entrichten und 14 Tage vor dem Seminartermin fällig. Eine nur zeitweise Teilnahme an unseren Seminaren berechtigt Sie nicht zu einer Minderung der Seminargebühr.</p><p><strong>Durchführungsabweichung</strong><br />Wir behalten uns vor, Termine und Durchführungsorte zu ändern.</p><p><strong>Termin- und Standortgarantie</strong><br />Für Schulungstermine und -standorte, die mit dem Zusatz "Termin- bzw. Standortgarantie" gekennzeichnet sind, gilt die Garantie für die Durchführung des Termins und für das Stattfinden der Schulung am benannten Schulungsort (z. B. München). Änderungen auf Grund höherer Gewalt behalten wir uns vor.</p><p><strong><strong>Copyright</strong><br /></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form - auch nicht für Zwecke der Unterrichtsgestaltung -reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong><strong><strong>Urheber- und Markenrechte</strong><br /></strong></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form, auch nicht für Zwecke der Unterrichtsgestaltung, reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong>Haftung</strong><br />In unseren Seminaren werden Unterricht und Übungen so gestaltet, dass ein aufmerksamer Teilnehmer die Seminarziele erreichen kann. Für den Schulungserfolg haften wir jedoch nicht. Soweit nicht durch § 309 Nr. 7 und 8 BGB geregelt, haften wir für von unseren Mitarbeitern vorsätzlich oder grob fahrlässig verursachte Schäden - gleich aus welchem Rechtsgrund – einmalig bis zu einem Gesamtbetrag in Höhe der Gesamtvergütung, höchstens jedoch insgesamt bis zu einem Betrag von EUR 10.000. Eine weitergehende Haftung ist ausgeschlossen. Die ACME haftet nicht für Schäden, die durch Viren auf kopierten Datenträgern entstehen können. Dies gilt auch für public domain Software. Von Teilnehmern mitgebrachte Datenträger dürfen grundsätzlich nicht auf unsere Rechner aufgespielt werden. Sollte der ACME durch eine Zuwiderhandlung hiergegen ein Schaden entstehen, behält sie sich die Geltendmachung von Schadensersatzansprüchen vor</p><p><strong>Eingetragene Warenzeichen</strong><br />Wir übernehmen keine Gewähr dafür, dass die erwähnten Produkte, Verfahren und sonstige Namen frei von Schutzrechten Dritter sind.</p><p><strong>Sonstiges</strong><br />Auf das Vertragsverhältnis und seine Durchführung findet ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss der Regelungen des CISG Anwendung. Diese Rechtswahl gilt auch für Verbraucherverträge, sofern Art. 29 EGBGB nicht entgegensteht.</p>'}
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
<div class="row edums-finishmodal-content">
  
  <div class="col-md-6" ng-if="rinfo.contactpersonemail && rinfo.courses">
    <h2>Ihr Anfrage wurde gesendet.</h2>
    <p><b>Vielen Dank </b>für die Reservierung von </p>
    <p ng-repeat="course in rinfo.courses track by $index">- {{course.course_name}} am {{course.start_date}} um {{course.start_time}}</p>
    Sie bekommen in Kürze eine E-Mail von uns an {{rinfo.contactpersonemail}} gesendet. 
    Bitte beantworten Sie diese um die Reservierung für {{rinfo.mTeilnehmerZahl}} Personen abzuschließen.    
    </div>
  <div class="col-md-6" ng-if="!(rinfo.contactpersonemail && rinfo.courses)">
    <h2>Ihr Anfrage wurde nicht gesendet.</h2>
    <h3>Fast geschafft... </h3>
    <h4>Bitte geben Sie eine <b>E-Mail-Adresse</b> an, sodass wir Sie erreichen können und die <b>Kurse</b> die Sie besuchen möchten.</h4>
    <h4>Klicken Sie hierfür bitte auf schließen und füllen Sie die die Felder aus. Drücken Sie anschließend bitte erneut auf Anmeldung.</h4>
  </div>
</div>

`
}
});

//Long text
app.directive('mitsm', function() {
  return{
    template:
`<article class="item" data-permalink="http://www.mitsm.de/standorte">            <header>        <h1 class="title">Standorte</h1>          </header>              <div class="content clearfix">    <h2>mITSM Firmensitz und Schulungszentrum</h2><img style="float:left; margin-right:10px;" src="https://www.mitsm.de/images/CDN/standort_leonhard-moll-bogen-icon.png" alt="mITSM Standort Leonhard-Moll-Bogen" /><p>  <br />  Hansapark <br />  Landaubogen 1 (ehemals Leonhard-Moll-Bogen 1)<br />  81373 München<br />  Tel   +49 89 55 27 55 70<br />  Fax +49 89 55 27 55 71</p><h2>Öffentliche Verkehrsmittel und PKW</h2><p>Wir empfehlen, mit öffentlichen Verkehrsmitteln anzureisen. <b>Parkplätze in der Tiefgarage stehen leider nicht zur Verfügung.</b> Wer trotzdem mit dem Auto kommen möchte, hat in der Siegenburger Straße noch die beste Chance auf einen freien Parkplatz. Alternativ ist die näheste P+R Tiefgarage Heimeranplatz (Garmischer Straße 19) nur wenige Gehminuten entfernt, Preise und Modalitäten entnehmen Sie bitte der <a href="http://www.parkundride.de/heimeranplatz.html" target="_blank">Homepage</a>.<br /><br />  S-Bahn: S7, S20, S27 Haltestelle Heimeranplatz<br />  U-Bahn: U4, U5 Haltestelle Heimeranplatz<br />  Bus: 62, 131 Haltestelle Hansapark<br /><br /><a title="MVV München" href="http://efa.mvv-muenchen.de/index.html#trip@enquiry" target="_blank"> Zur Fahrplanauskunft des MVV München</a><br />  <a title="Hotels in der Nähe mITSM " href="http://goo.gl/maps/YuAfS" target="_blank">Hotels in der Nähe</a></p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= mitsm, Leonhard-Moll-Bogen 1,81373 München&z=15&output=embed&hl=de&t=m'></iframe><br /><a href="https://goo.gl/maps/dR4oy" target="_blank">Größere Kartenansicht</a></p><h2>Weitere Standorte</h2><div class="rl_sliders nn_sliders accordion panel-group" id="set-rl_sliders-1"><a id="rl_sliders-scrollto_1" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_berlin-büroturm-b82-bessemerstraße-82" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#berlin-büroturm-b82-bessemerstraße-82" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="berlin-büroturm-b82-bessemerstraße-82" data-parent="#set-rl_sliders-1"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">Berlin Büroturm B82 Bessemerstraße 82</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="berlin-büroturm-b82-bessemerstraße-82"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">Berlin Büroturm B82 Bessemerstraße 82</h2><h2>Berlin - Schulungsräume im B82</h2><img style="float:left; margin-right:10px;" src="https://www.mitsm.de/images/CDN/standort_berlin-bessemnastrasse-icon.png" alt="mITSM Standort Berlin Bessemnastraße" /><p>  <br /><br />  Büroturm B82<br />  Bessemerstraße 82<br />  12103 Berlin</p><h2>Öffentliche Verkehrsmittel</h2><p>  S-Bahn: S2, S25 Haltestelle Priesterweg<br />  Bus: 106 Haltestelle Bessermerstraße<br />  <a href="http://www.bvg.de" target="_blank">BVG</a></p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q=beredsam GmbH, Bessemerstraße 82, 12103 Berlin&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div></div><div class="rl_sliders nn_sliders accordion panel-group" id="set-rl_sliders-2"><a id="rl_sliders-scrollto_2" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_münchen-augustenstraße" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#münchen-augustenstraße" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="münchen-augustenstraße" data-parent="#set-rl_sliders-2"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">München Augustenstraße</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="münchen-augustenstraße"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">München Augustenstraße</h2><h2>mITSM Schulungszentrum</h2><img style="float:left; margin-right:10px;" src="https://www.mitsm.de/images/CDN/standort_olympiapark-icon.png" alt="mITSM Standort Olympiapark" /><p>  <br /><br />  Augustenstr. 79 <br />  80333 München<br />  +49(89)55275570</p><h2>Öffentliche Verkehrsmittel und PKW</h2><p>  U-Bahn: U2, U8 Haltestelle Theresienstraße<br />  <a title="MVV München" href="http://www.mvv-muenchen.de/" target="_blank">MVV München</a><br />  In der Regel mehrere freie Plätze in der Umgebung, Parklizenzbereich</p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= JoJo Wassersport, Augustenstr. 79, 80333 München&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div></div><div class="rl_sliders nn_sliders accordion panel-group" id="set-rl_sliders-3"><a id="rl_sliders-scrollto_3" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_tüv-süd-akademie-prüfungsstandort" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#tüv-süd-akademie-prüfungsstandort" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="tüv-süd-akademie-prüfungsstandort" data-parent="#set-rl_sliders-3"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">TÜV SÜD Akademie Prüfungsstandort</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="tüv-süd-akademie-prüfungsstandort"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">TÜV SÜD Akademie Prüfungsstandort</h2><h2>TÜV SÜD Akademie Prüfungsstandort</h2><img style="float:left; margin-right:10px;" src="https://www.mitsm.de/images/CDN/standort_frauenkirche-icon.png" alt="mITSM Standort Frauenkirche" /><p>  <br /><br />  Raum Eibsee, Geb. A, 0.005<br />  Westendstr. 199<br />  80686 München</p><h2>Öffentliche Verkehrsmittel</h2><p>  U-Bahn: U4, U5 Haltestelle Westendstraße<br />  Trambahn: 18 Haltestelle Westendstraße<br />  <a title="MVV München" href="http://www.mvv-muenchen.de/" target="_blank">MVV München</a></p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= TÜV Süd Zentrale, Westendstr. 199, 80686 München&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div></div><div class="rl_sliders nn_sliders accordion panel-group" id="set-rl_sliders-4"><a id="rl_sliders-scrollto_4" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_schulungszentrum-wien" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#schulungszentrum-wien" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="schulungszentrum-wien" data-parent="#set-rl_sliders-4"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">Schulungszentrum Wien</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="schulungszentrum-wien"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">Schulungszentrum Wien</h2><h2>mITSM Schulungszentrum Wien</h2><img style="float:left; margin-right:10px;" src="https://www.mitsm.de/images/CDN/standort_gasometer-wien-icon.png" alt="mITSM Standort Gasometer Wien" /><p>  <br /><br />  Dresdner Straße 108/5<br />  bei PNC Professionelle Netzwerke und Computersysteme GmbH<br />  1200 Wien<br />  +43(1)7431777</p><h2>Öffentliche Verkehrsmittel und PKW</h2><p>  U-Bahn: U6 Haltestelle Dresdner Straße<br />  Schnellbahn: S1, S2, S3, S7, S Haltestelle Wien Traisengasse<br />  Straßenbahnlinie: 2 Haltestelle Traisengasse Bahnhast<br />  <a title="Wiener Linien" href="http://www.wienerlinien.at/eportal/" target="_blank">Wiener Linien</a><br />  Traisengasse; ganztägige Kurzparkzone</p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= PNC, Dresdner Straße 108/5, 1200 Wien&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div></div><div class="rl_sliders nn_sliders accordion panel-group" id="set-rl_sliders-5"><a id="rl_sliders-scrollto_5" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_schulungszentrum-hamburg" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#schulungszentrum-hamburg" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="schulungszentrum-hamburg" data-parent="#set-rl_sliders-5"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">Schulungszentrum Hamburg</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="schulungszentrum-hamburg"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">Schulungszentrum Hamburg</h2><h2>mITSM Schulungszentrum Hamburg</h2><p>  <br />  <strong>bei MASTERS Consulting GmbH</strong><br />  Am Sandtorkai 23<br />  D-20457 Hamburg</p><h2>Öffentliche Verkehrsmittel</h2><p>  Magellan-Terrasse<br />  Singapurstraße<br />  Am Sandtorkai<br />  <a href="http://www.hvv.de/" target="_blank">HVV</a></p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= MASTERS Consulting, Am Sandtorkai 23, 20457 Hamburg&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div><div class="accordion-group panel rl_sliders-group nn_sliders-group icon"><a id="rl_sliders-scrollto_schulungszentrum-amsterdam" class="anchor rl_sliders-scroll nn_sliders-scroll"></a><div class="accordion-heading panel-heading"><a href="https://www.mitsm.de/standorte#schulungszentrum-amsterdam" class="accordion-toggle rl_sliders-toggle nn_sliders-toggle" data-toggle="collapse" data-id="schulungszentrum-amsterdam" data-parent="#set-rl_sliders-5"><span class="rl_sliders-toggle-inner nn_sliders-toggle-inner">Schulungszentrum Amsterdam</span></a></div><div class="accordion-body rl_sliders-body nn_sliders-body collapse" id="schulungszentrum-amsterdam"><div class="accordion-inner panel-body"><h2 class="rl_sliders-title nn_sliders-title">Schulungszentrum Amsterdam</h2><h2>mITSM Schulungszentrum Amsterdam</h2><p>  <br />  <strong>bei EGI.eu</strong><br />  Science Park 140<br />  NL-1098 Amsterdam</p><h2>Anreise</h2><p>Informationen unter <a href="http://www.egi.eu/about/contacts/directions.html" target="_blank">www.egi.eu/about/contacts/directions.html</a></p><p><iframe width='640' height='400' style='border: 0px solid #000000' src='https://maps.google.com/?q= EGI.eu, Science Park 140, Amsterdam, Niederlande&z=15&output=embed&hl=de&t=m'></iframe></p></div></div></div></div>    </div>   </article>`
}
});
</script>
