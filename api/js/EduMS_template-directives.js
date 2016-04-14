<script>
/*SIDEBARTEMPLATES-------------------------------------------------------------------------------------------*/ 
app.directive('rightBarCourseAll', function() {//sideBarCourse = Directive Name
 return{
//Sidebarelement für allgemeine Kurse
template:
'<div class="list-group " >\
  <div class="list-group-item event">\
  \
    <div class="row">\
      <div class="col-md-1" ></div>\
	  \
      <div class="col-md-10">\
        <div class="row" style="width=100%">\
			<div class="pull-left"><b>{{e.start_date}} - Location</b></div>\
        </div>\
		\
        <div class="row">\
			<div class="pull-left" style="text-align: left;" ><b>{{e.course_name}}</b></div>\
			<div style="margin-top: 5px;">\
			<button type="button" class="btn btn-success btn-block" ng-model="reservate" ng-click= "e.btnRegister=!e.btnRegister">\
			<i class="fa fa-cart-plus fa-stack-3x fa-inverse"></i> Anmelden!\
			</button>\
		</div>\
      <div class="col-md-1" ></div>\
	  \
    </div>\
		\
	<div class="row">\
		<div class="col-md-1" ></div>\
		\
			<div class="col-md-10">\
				<div class="row" style="width=100%">\
					<div ng-show="e.btnRegister">\
					<register-form></register-form>\
					</div>\
				</div>\
			</div>\
			<div class="col-md-1" ></div>\
	</div>\
  </div>\
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
    <div class="row" style="margin-top: 10px; ">\
\
      <div class="col-md-3">\
	  <div class="row">Anzahl</div>\
      <div class="input-group" class="form-input">\
          <input type="anzahl" class="form-control" sytle="width:100%" id="inputAnzahlId{{e.sysName}}" placeholder="1" ng-model="rinfo.mTeilnehmerZahl">\
      </div>\
      </div>\
      <div class="col-md-9">\
	  <div class="row" style="text-align: left; margin-left: 3px;" >E-Mail</div>\
        <div class="input-group" class="form-input">\
          <input type="email" class="form-control" sytle="width:100%" id="inputEmailId{{e.sysName}}" placeholder="name@domain.tld" ng-model="rinfo.mAdresse">\
        </div>\
      </div>\
	</div>\
	<div class="row" style="margin-top: 10px; ">\
		<div class="col-md-6">\
			<input type="submit" ng-click="reservate(e.sysName)" class="btn btn-default btn-block" style="color:#333;" value="abschicken"/>\
		</div>\
		<div class="col-md-6">\
			<input type="submit" class="btn btn-default btn-block" value="Weitere Kurse" href="#modal-container-1" data-toggle="modal" ng-click="initreslistfromsidebar(e)"/>\
		</div>\
    </div>\
  </div>\
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



app.directive('agb', function() {//sideBarCourse = Directive Name
  return{template:'<p>Mit der Registrierung, Anfrage, Reservierung erkläre ich mich einverstanden, dass meine Adresse bei der&nbsp; ACME elektronisch gespeichert wird. Privatadressen, personenbezogene Daten und E-Mail-Adressen werden selbstverständlich vertraulich behandelt und NICHT an Dritte weitergegeben.<br />Daten, die im Rahmen der Prüfungen benötigt werden, stellen wir der TÜV SÜD-Zertifizierung Service GmbH oder anderen Prüfungsinstituten (EXIN, APMG) im Rahmen der Prüfungsanmeldung zur Verfügung.</p><h2>Einsatz von Google Analytics</h2><p style="text-align: justify;">„Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. („Google“). Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.<br /> Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Die IP-Anonymisierung ist auf dieser Website aktiv. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.<br /> Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <a href="http://tools.google.com/dlpage/gaoptout?hl=de">http://tools.google.com/dlpage/gaoptout?hl=de</a>.“</p><p style="text-align: justify;"><strong>ZUSATZ<br />Auf dieser Webseite wurde die IP-Anonymisierung aktiviert, so dass die IP-Adresse der Nutzer von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.</strong></p><p><a class="info" href="http://www.google.de/analytics/terms/de.html" target="_blank">Nutzungsbedingungen von Google für Analytics</a></p>'}
});

app.directive('datenschutzerklaerung', function() {//sideBarCourse = Directive Name
  return{template:'<p><span style="font-size: 12pt;">Bedingungen für Seminare ACME</span></p><p><strong>Allgemeines</strong><br />Allen Leistungen im Rahmen unserer Seminare liegen diese "Allgemeinen Geschäftsbedingungen für Seminare" der ACME zugrunde.</p><p><strong>Anmeldungen</strong><br />Sie können sich telefonisch, schriftlich, per Fax und im Internet anmelden. Sie erhalten von uns umgehend eine Anmeldebestätigung (Zeitpunkt des Vertragsabschlusses). Da die Teilnehmerzahl für unsere Seminare begrenzt ist, berücksichtigen wir die Anmeldungen in der Reihenfolge ihres Eingangs. Ihre Daten werden für interne Zwecke elektronisch gespeichert und im Rahmen der Prüfungen an den TÜV Akademie Süddeutschland weitergegeben.</p><p><strong>Absagen und Widerrufsrecht</strong><br />Sie können Ihre Anmeldung bis 15 Werktage vor Seminarbeginn kostenfrei widerrufen. Wenn Sie Ihre Anmeldung erst innerhalb von 14 Werktagen vor Seminarbeginn (dabei wird der Tag des Seminarbeginns nicht mitgerechnet) stornieren oder zum Seminar nicht erscheinen, stellen wir Ihnen die volle Seminargebühr in Rechnung. Wir behalten uns Absagen aus organisatorischen Gründen (etwa bei Nichterreichen der vom Seminartyp abhängigen Mindestteilnehmerzahl oder kurzfristigem, krankheitsbedingten Ausfall des Referenten) vor. Bei einer Absage durch uns werden wir versuchen, Sie auf einen anderen Termin und/oder einen anderen Veranstaltungsort umzubuchen, sofern Sie hiermit einverstanden sind. Andernfalls erhalten Sie Ihre bezahlten Gebühren zurück; weitergehende Ansprüche bestehen nicht.</p><p><strong>Gebühren</strong><br />Die Gebühren für den Besuch unserer Seminare sind in Euro zu entrichten und 14 Tage vor dem Seminartermin fällig. Eine nur zeitweise Teilnahme an unseren Seminaren berechtigt Sie nicht zu einer Minderung der Seminargebühr.</p><p><strong>Durchführungsabweichung</strong><br />Wir behalten uns vor, Termine und Durchführungsorte zu ändern.</p><p><strong>Termin- und Standortgarantie</strong><br />Für Schulungstermine und -standorte, die mit dem Zusatz "Termin- bzw. Standortgarantie" gekennzeichnet sind, gilt die Garantie für die Durchführung des Termins und für das Stattfinden der Schulung am benannten Schulungsort (z. B. München). Änderungen auf Grund höherer Gewalt behalten wir uns vor.</p><p><strong><strong>Copyright</strong><br /></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form - auch nicht für Zwecke der Unterrichtsgestaltung -reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong><strong><strong>Urheber- und Markenrechte</strong><br /></strong></strong>Alle Rechte, auch die der Übersetzung, des Nachdrucks und der Vervielfältigung der Trainingsunterlagen oder von Teilen daraus behalten wir uns vor. Kein Teil der Trainingsunterlagen darf – auch auszugsweise - ohne unsere schriftliche Genehmigung in irgendeiner Form, auch nicht für Zwecke der Unterrichtsgestaltung, reproduziert, insbesondere unter Verwendung elektronischer Systeme verarbeitet, vervielfältigt, verbreitet oder zu öffentlichen Wiedergaben benutzt werden.</p><p><strong>Haftung</strong><br />In unseren Seminaren werden Unterricht und Übungen so gestaltet, dass ein aufmerksamer Teilnehmer die Seminarziele erreichen kann. Für den Schulungserfolg haften wir jedoch nicht. Soweit nicht durch § 309 Nr. 7 und 8 BGB geregelt, haften wir für von unseren Mitarbeitern vorsätzlich oder grob fahrlässig verursachte Schäden - gleich aus welchem Rechtsgrund – einmalig bis zu einem Gesamtbetrag in Höhe der Gesamtvergütung, höchstens jedoch insgesamt bis zu einem Betrag von EUR 10.000. Eine weitergehende Haftung ist ausgeschlossen. Die ACME haftet nicht für Schäden, die durch Viren auf kopierten Datenträgern entstehen können. Dies gilt auch für public domain Software. Von Teilnehmern mitgebrachte Datenträger dürfen grundsätzlich nicht auf unsere Rechner aufgespielt werden. Sollte der ACME durch eine Zuwiderhandlung hiergegen ein Schaden entstehen, behält sie sich die Geltendmachung von Schadensersatzansprüchen vor</p><p><strong>Eingetragene Warenzeichen</strong><br />Wir übernehmen keine Gewähr dafür, dass die erwähnten Produkte, Verfahren und sonstige Namen frei von Schutzrechten Dritter sind.</p><p><strong>Sonstiges</strong><br />Auf das Vertragsverhältnis und seine Durchführung findet ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss der Regelungen des CISG Anwendung. Diese Rechtswahl gilt auch für Verbraucherverträge, sofern Art. 29 EGBGB nicht entgegensteht.</p>'}
});

app.directive('impressum', function() {//sideBarCourse = Directive Name
  return{template:'<p>Bruce Wayne (bat.man<i class="fa fa-at"></i>gotham.xx)</p><p>Clark Kent (super.man<i class="fa fa-at"></i>krypton.S)</p><p><strong>Registergericht </strong><br />HRB 12 34 56; Handelsregister Atlantis</p><p><strong>Datenschutzbeauftragter</strong><br />Sheldon Cooper (sh.cooper<i class="fa fa-at"></i>physX.com)</p><p><strong>Umsatzsteuer-Identifikationsnummer </strong><br />Ust. - Ident-Nr.: DE 333 0815 99</p><p><strong>Verantwortlich f&uuml;r den Inhalt</strong><br />ist die ACME</p><p><strong>&copy; 2016 ACME A company makes everything</strong></p><p>Die Website edums.de sowie die einzelnen Beiträge sind urheberrechtlich geschützt. Übersetzung, Druck, Vervielfältigung sowie Speicherung in Datenverarbeitungsanlagen o.ä. werden nur mit ausdrücklicher Genehmigung der ACME gestattet. Auch das Frame-Linking bedarf der Zustimmung.<br />Die Marke ACME ist Eigentum von Bruce Wayne.<br />Die ACME übernimmt keinerlei Gewähr für Vollständigkeit, Richtigkeit und Aktualität. Jegliche Haftung ist ausgeschlossen. Insbesondere ist die ACME nicht verantwortlich für Inhalte externer Internetseiten.</p>'}
});


</script>
