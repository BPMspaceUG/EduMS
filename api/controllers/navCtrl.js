<script  type="text/javascript">

/*
Eng: The controller navCtrl uses the $http-service to get JSON-datasets from DB-Views and reorganize them in $scope.
The templates rightBar-X show the next courses in context of the selected topic. Also there is a lorem fuction for dummytext.

Deu/Ger: Der Controller navCtrl fordert über den $http-service JSON-Datensätze DB-Views und reorganisiert sie in $scope.
Die Templates rightBarCourseByTopic und rightBarCourseAll zeigen die nächsten courses in Abhängigkeit des ausgewählten Topics an.
Die lorem function erzeugt Dummytext.

------------------------------------------------------------------------------------------------------------------------------
DB-Views: 	|	`v_all_events`							|`v_futurecourses` 						|`v_topic_coursecourse` 		
------------------------------------------------------------------------------------------------------------------------------
$scope		|	.allNextEvents**++						|++topiccourseCourselist++				|++topiclist++			
------------------------------------------------------------------------------------------------------------------------------
			|											|										|						
Bsp.Daten	|	course_id: "103"						|$$hashKey: "object:295"				|$$hashKey: "object:263"
			|	course_name: "ISO 27001 Foundation"		|courseHeadline: "course1 Headline"		|deprecated: "0"
			|	event_id: "3893"						|courseImage: null						|footer: null
			|	event_status_id: "2"					|course_description: "co(...) database"	|sideBarCourses: Array[0]
			|	eventguaranteestatus: "1"				|course_id: "1"							|sidebar_description: null
			|	finish_date: "2016-02-16"				|course_name: "course1"					|topicHeadline: ""
			|	finish_time: "17:00:00"					|course_price: "1035"					|topicImage: null
			|	internet_course_article_id: "736"		|number_of_days: "2"					|topic_description: "Topic(...)Schwoanshaxn."
			|	internet_location_article_id: "0"		|tc_course_id: "1"						|topic_id: "1"
			|	internet_location_name: "Ogox..inu"		|topic_id: "1"							|topicName: "Topic1"
			|	start_date: "2016-02-15"				|										|topic_name_raw: "Topic 1"
			|	start_time: "09:00:00"					|										|topic_nr: 0
			|	test: "0"								|										|trainer_id: "14"
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------
/getCourses:
SELECT course_id, course_name, number_of_days, internet_course_article_id, min_participants, course_description, 
	course_mail_desc, course_price, course_certificate_desc 
FROM `course` WHERE deprecated = 0
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------

*/

/*Controllers define and handle an Angular area
Ein controller wird für einen bestimmten Sinnabschnitt innerhalb von Angular definiert*/
app.controller('ngBindHtmlCtrl', ['$scope','$http', '$sce', function ngBindHtmlCtrl($scope, $http, $sce) {
$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getBrandInfo').then(function(response) {

			for (var i = 0; i < $scope.topics.length; i++) {
				$scope.topics[i].topicDescription = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescription+'</div>')
			}
		})
}])

app.controller('navCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getBrandInfo')
	.then(function(response) {
		

		$scope.allBrand = response.data
		console.log(response.data)
		//brandinfo:	
		/*accesstoken: "5b35716ce1ff524b662dfbb160e293a3"
		brandDescription: "<h2>brand description from braest.</p>"
		brandDescriptionFooter: "<h2>FOOTices pede morbi proin.</p>"
		brandDescriptionSidebar: "<h2>SIDt felis mus saptis. Class.</p>"
		brandHeadline: "Brand with ID 9"
		brandImage: "<img class="" src="http://dummyimage.com/200x200/91B561/3D7B6B.jpg&text=Eqpajbuu ID 9"
		brand_id: "9"
		brand_name: "Eqpajbuu ID 9"
		branddeprecated: "0"
		css-style: "<style> body {background-color: ;} h1 { color:DeepSkyBlue;} h2 { color:DeepPink; margin-left: ;} </style>"
		discount: "7.00"
		event_partner_id: "1"
		login: "EqpajbuuID9"*/
		$scope.brandinfo = response.data.brandinfo

		//topiclist:
		/*$$hashKey: "object:953"
		deprecated: "0"
		footer: "<h2>FOOTER Topic description from topic with ID 1</h2><p>Iaculis vel pharetra montes parturient penatibus inceptos ultrices ligula. At.</p>"
		responsibleTrainer_id: "14"
		topicDescription: "<h2>Topic description from topic with ID 1</h2><p>Dis ad malesuada laoreet pede aliquam dictum semper mollis. Malesuada sociis penatibus tellus habitant conubia non nunc habitant.</p><p>Elementum nunc ligula hendrerit laoreet at aptent auctor dolor. Inceptos montes morbi congue ultricies facilisis praesent phasellus facilisis libero fames dui conubia adipiscing. Mi litora primis et.</p><p>Conubia augue accumsan.</p>"
		topicDescriptionSidebar: "<h2>SIDEBAR Topic description from topic with ID 1</h2><p>Ut vivamus condimentum neque nibh dis egestas molestie vestibulum. Ligula libero tempor.</p>"
		topicHeadline: "TOPIC with ID 1"
		topicImage: "data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'800'%20height%3D'800'><rect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'grey'%2F><text%20x%3D'400'%20y%3D'155'%20font-size%3D'20'%20font%3D'Verdana%2C%20sans-serif'%20fill%3D'white'%20text-anchor%3D'middle'>training%20scheme%20800%20x%20800<%2Ftext><%2Fsvg>"
		topicName: "Pkhhoaged"
		topic_id: "1"*/
		$scope.topics = response.data.topiclist



		//topiccourselist:
		/*course_id: "43"
		course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
		level: "1"
		rank: "1"
		topicName: "Pkhhoaged"
		topic_course_id: "43"
		topic_id: "1"*/
		$scope.topiccourseCourse = response.data.topiccourselist //Object.keys(response.data.topiccourselist)
		//.map(function (key) {return response.data.topiccourselist[key]}); //Topic-Course Panel

		/*for (var i = 0; i < response.data.topiccourselist.length; i++) {			
			for (var j = 0; j < response.data.courselist.length; j++) {
				if (response.data.topiccourselist[i].course_id == response.data.courselist[j].course_id) {
					$scope.topiccourseCourse[i].course_name = response.data.courselist[j].course_name
					$scope.topiccourseCourse[i].number_of_days = response.data.courselist[j].number_of_days
					$scope.topiccourseCourse[i].courseDescription = response.data.courselist[j].courseDescription
				};				
			};
		};*/
		
		//courselist:
		/*courseDescription: "<h2>Course desctae enim><p>Posuere pulvinar mus.</p>"
		courseDescriptionCertificate: "<h2><strong>[$FIRSTNAME] [$NAME]</strong></h2> <p>has visisted the coATE] with the foll/li></ul>"
		courseDescriptionMail: "<h2>Course description from conec.</p>"
		courseHeadline: "Training 43 in Topic 1 - Level-Rank 1-1"
		coursePrice: "1075"
		course_id: "43"
		course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
		internet_course_article_id: "14"
		min_participants: "3"
		number_of_days: "3"*/
		$scope.courses = response.data.courselist;

		//eventlist:
		/*courseMaxParticipants: "16"
		course_id: "74"
		course_name: "Training 74 in Topic 1 - Level-Rank 2-4"
		coursedeprecated: "0"
		event_id: "3873"
		event_status_id: "2"
		eventguaranteestatus: "2"
		eventinhouse: "0"
		finish_date: "2016-03-11"
		finish_time: "17:00:00"
		internet_location_name: "Koqlg"
		locationMaxParticipants: "16"
		location_description: "<h2>Location description from Locatos.</p>"
		location_id: "177"
		location_name: "Koqlg"
		start_date: "2016-03-09"
		start_time: "13:30:00"
		test: "0"*/	
		$scope.allNextEvents = response.data.eventlist //Termine & Anmeldung Modal
		$scope.nextEvents =  Object.keys(response.data.eventlist)
		.map(function (key) {return response.data.eventlist[key]});
		$scope.nextEvents = $scope.nextEvents.slice(0,4) //Sidebar-next 'x' Events

		for (var i = 0; i < $scope.nextEvents.length; i++) { //directive: 'rightBarCourseAll' -> helpVariables init
			$scope.nextEvents[i].btnInfo=false; //Show
			$scope.nextEvents[i].btnRegister=false; //Show
			if (i==1) {$scope.nextEvents[i].btnInfo=true}; //Sample
			$scope.nextEvents[i].sysName=$scope.nextEvents[i].course_name.replace(/\W+/g,'');
			//console.log('nextEvents['+i+']:');console.log($scope.nextEvents[i]); console.log('')
		};

		$scope.location=[]
		for (var i = 0; i < response.data.eventlist.length; i++) {
			$scope.location.push({id : response.data.eventlist[i].location_id, 
				name : response.data.eventlist[i].location_name,
				description : response.data.eventlist[i].location_description, 
				locationMaxPart : response.data.eventlist[i].locationMaxParticipants
			})
			//console.log($scope.location[$scope.location.length -1])
		}


		
		//HTML5 3.2.3.1: Das id-Attribut darf kein Leerzeichen enthalten deshalb wird der topicName nach name_raw kopiert u. anschließend die Leerzeichen entfernt
		for (var i = 0; i < $scope.topics.length; i++) {
			$scope.topics[i].topic_name_raw = $scope.topics[i].topicName;			
			$scope.topics[i].topic_nr = i;			
			$scope.topics[i].topic_name = $scope.topics[i].topicName.replace(/\s+/g,'');//löscht alle Leerzeichen			
		}
		/*Suche Kurse und weise sie den Topics zu. Suche events zu den Kursen der Topics und weise sie den Topics zu*/
		var aNE=$scope.allNextEvents
		for (var i = 0; i < $scope.topics.length; i++) { //für alle topics
			var t=$scope.topics[i]
			for (var j = 0; j < $scope.topiccourseCourse.length; j++) { //für alle topiccourCourse-Einträge
				var tcC=$scope.topiccourseCourse[j]
				//Wenn die topic_id des Elements aus der Topicliste == der topic_id des Elements aus der m:n-TopicCourses-Liste ist
				//dann lege in der Topicliste ein Array für die Sidebarelemente an. 
				//Vergleiche darauf hin die tc_course_id des TopicCourse Elements mit den course_id's aus der AllNextEvents-Liste.
				//Wenn die id's identisch sind füge dem aktuellen SidebarArray das Event hinzu
				if (t.topic_id == tcC.topic_id) {	//wenn ids gleich sind
					if (!$scope.topics[i].sideBarCourses){$scope.topics[i].sideBarCourses=[]}//lege sidebarArray für topic an
					if ($scope.topics[i].sideBarCourses.length<3) { //sidebar soll 5 elemente haben													
						for (var k = 0; k < aNE.length; k++) {	//für alle allNextEvents-Einträge
							if (tcC.tc_course_id == aNE[k].course_id) { //nur Events die zur aktuellen course_id passen
								$scope.topics[i].sideBarCourses.push(aNE[k]) //befülle SideBar-Array
								$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1]//Definiere ID-name ohne Leerzeichen
								.sysName=$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,'');
							};								
						};
					};
				};					
			};
		};

		//};
		//console.log('fertiges $scope.topics: (Auskommentiert)');//console.log($scope.topics);	
		},function(response) {$scope.topics = 'Fehler in topicCtrl-$http: '+response}
	)


	





$scope.reservateCourse = function(part) {
	//var reserveInfo = document.getElementById($scope['inputNameId'+part]).mVorname
	var reserveInfo = part

	console.log('reservepush: '+ reserveInfo)
	$http.post('/EduMS/api/index.php/'+bname+'/'+pw+'/reserve', reserveInfo)
	$http.post('localhost:4041', reserveInfo)
}
}])




/*this.scope.topics[1].topicDescription*/
		//for (i=0;i<$scope.topics.length;i++) {
		app.directive('topicDescription',  function($compile, $parse){
		//console.log(topics[1].topicDescription)
			return{
				link: function(scope, element, attr){
					var parsed = $parse(attr.topicDescription);
					function getStringValue(){
						return (parsed(scope) || '').toString();
					}
					scope.$watch(getStringValue, function(){
						$compile(element, null, -9999)(scope);
					})
				}
				/*restrict: 'AECM',
				controller: 'navCtrl',
				replace: true,
				template: '<div ng-bind-html="topics[1].topicDescription" compile-template></div>'*/

				/*'<div>a<div ng-include="\'t.topicDescription\'"></div>b<div ng-include="\'topics[1].topicDescription\'"></div>\
				<div>c{{t.topicDescription}}**~~---d:{{topics[1].topicDescription}}</div>'+
				
				'e<div ng-bind-template="topics[1].topicDescription"></div>f<div ng-bind-template="{{$compile(t.topicDescription)}}">\
				g</div><div ng-bind-template="\'topics[1].topicDescription\'"></div>'+

				'G<div ng-bind-html="topics[1].topicDescription" compile-template></div>H<div ng-bind-html="{{t.topicDescription}}" compile-template>\
				I</div><div ng-bind-html="t.topicDescription" compile-template></div>'+

				'h<div ng-include="topics[1].topicDescription"></div>i<div ng-include="{{$compile(t.topicDescription)}}">\
				j</div><div ng-include="\'topics[1].topicDescription\'"></div></div>'*///<h2>Topic description from topic with ID 1</h2><p>Dis ad malesuada laoreet conubia non nunc habitant.</p></div>'
			}
		})


/*SIDEBARTEMPLATES-------------------------------------------------------------------------------------------*/	
app.directive('rightBarCourseAll', function() {//sideBarCourse = Directive Name
	return{
//Sidebarelement für allgemeine Kurse
template:'<div class="list-group">\
	<a class="list-group-item active">\
		<h3 class="list-group-item-heading">{{e.course_name}} \
			<span class="label label-danger"> {{e.start_date}} </span>\
		</h3>'+

		'<div>\
			<button type="button" class="btn btn-info" ng-click= "e.btnInfo=!e.btnInfo">\
				<span class="fa-stack">\
					<i class="fa fa-info fa-stack-1x fa-inverse"></i>\
				</span>Info</button> - <button type="button" class="btn btn-success" ng-model="reservate" ng-click= "e.btnRegister=!e.btnRegister">\
				<span class="fa-stack">\
					<i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i>\
				</span>reservieren</button>\
		</div>'+

		'<div  ng-show="e.btnInfo">\
		<h3>Start: {{e.start_date}} {{e.start_time}}</h3> \
		<h3>Ende: {{e.finish_date}} {{e.finish_time}}</h3>\
		<h3>Internet-Location-Name: {{e.internet_location_name}}</h3>\
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
				 <div class="col-md-2">{{mVorname}} {{mFamName}}</div>\
				  <div class="col-md-4">\
				    <div class="input-group" class="form-input">\
				      <input type="text" class="form-control" id="inputNameId{{e.sysName}}" placeholder="Vorname" name="inputNameName{{e.sysName}}" ng-model="mVorname">\
				    </div>\
				  </div>\
				  <div class="col-md-4">\
				    <div class="input-group" class="form-input">\
				      <input type="text" class="form-control" id="inputFamNameId{{e.sysName}}" placeholder="Nachname" ng-model="mFamName">\
				     	</div>\
				  </div>\
				</div>\
	    		<div class="row" style="margin-top: 2px; ">\
	    		<div class="col-md-2">{{mTeilnehmerZahl}} {{mAdresse}}</div>\
				  	<div class="col-md-4">\
					  	<div class="input-group" class="form-input">\
		    				<input type="anzahl" class="form-control" id="inputAnzahlId{{e.sysName}}" placeholder="Teilnehmerzahl" ng-model="mTeilnehmerZahl">\
		    			</div>\
	    			</div>\
	    			<div class="col-md-4">\
		    			<div class="input-group" class="form-input">\
		    				<input type="email" class="form-control" id="inputEmailId{{e.sysName}}" placeholder="Kontakt E-Mail Adresse" ng-model="mAdresse">\
		    			</div>\
	    			</div>\
	    		</div>\
	  		</div>\
	  		<input type="submit" ng-click="reservateCourse(e.sysName)" class="btn btn-default" value="Reservierungsanfrage Abschicken"/>\
			</form>'
	}
});




app.directive('rightBarCourseByTopic', function() {//sideBarCourse = Directive Name
	return{
		template:'<div class="list-group"><a class="list-group-item active"><h3 class="list-group-item-heading">{{sbc.course_name}}\
		<span class="label label-danger"> {{sbc.start_date}}\
		 </span></h3><div><button type="button" class="btn btn-info" ng-click= "sbc.btnInfo=!sbc.btnInfo">\
		 <span class="fa-stack"><i class="fa fa-info fa-stack-1x fa-inverse"></i></span>Info</button> - <button type="button" class="btn btn-success" ng-model="reservate" ng-click= "sbc.btnRegister=!sbc.btnRegister">\
		 <span class="fa-stack"><i class="fa fa-cart-plus fa-stack-1x fa-inverse"></i></span>reservieren</button></div><div ng-show="sbc.btnInfo">\
		 <h3>Start: {{sbc.start_date}} {{sbc.start_time}}</h3>\
		 <h3>Ende: {{sbc.finish_date}} {{sbc.finish_time}}</h3>\
		 <h3>Internet-Location-Name: {{sbc.internet_location_name}}\
		 </h3></div><div ng-show="sbc.btnRegister">\
		 <register-form-two></register-form-two></div></a></div>'
	}
});
app.directive('registerFormTwo', function() {//sideBarCourse = Directive Name
	return{
//Sidebarelement für allgemeine Kurse
template:'<form name="formReg" class="form-horizontal" novalidate>\
	  		<div class="form-group has-warning">\
	  			<div class="row" style="margin-top: 2px;">\
				 <div class="col-md-2">{{mVorname}} {{mFamName}}</div>\
				  <div class="col-md-4">\
				    <div class="input-group" class="form-input">\
				      <input type="text" class="form-control" id="inputNameId{{sbc.sysName}}" placeholder="Vorname" name="inputNameName{{sbc.sysName}}" ng-model="mVorname">\
				    </div>\
				  </div>\
				  <div class="col-md-4">\
				    <div class="input-group" class="form-input">\
				      <input type="text" class="form-control" id="inputFamNameId{{sbc.sysName}}" placeholder="Nachname" ng-model="mFamName">\
				     	</div>\
				  </div>\
				</div>\
	    		<div class="row" style="margin-top: 2px; ">\
	    		<div class="col-md-2">{{mTeilnehmerZahl}} {{mAdresse}}</div>\
				  	<div class="col-md-4">\
					  	<div class="input-group" class="form-input">\
		    				<input type="anzahl" class="form-control" id="inputAnzahlId{{sbc.sysName}}" placeholder="Teilnehmerzahl" ng-model="mTeilnehmerZahl">\
		    			</div>\
	    			</div>\
	    			<div class="col-md-4">\
		    			<div class="input-group" class="form-input">\
		    				<input type="email" class="form-control" id="inputEmailId{{sbc.sysName}}" placeholder="Kontakt E-Mail Adresse" ng-model="mAdresse">\
		    			</div>\
	    			</div>\
	    		</div>\
	  		</div>\
	  		<input type="submit" ng-click="reservateCourse(sbc.sysName)" class="btn btn-default" value="Reservierungsanfrage Abschicken"/>\
			</form>'
	}
});

app.directive('coursePrizeList', function(){
	return{
		restrict: 'AECM',
		template: '<tr>\
 	<td>\
 		<h3>\
 			<button type="button" class="btn btn-info btn-lg">Nr({{$index +1}}) Eine {{course.course_name}} Schulung findet ab einer Teilnehmerzahl von {{course.min_participants}} statt. Sie dauert im Regelfall {{course.number_of_days}} Tage.</button>\
 		</h3>\
 	</td>\
 	<td>\
 		<span class="label label-success ">Price: </span>\
 	</td>\
</tr>',
		replace: true,
		scope:{
			courselist: '='
			//courseFormatingFunction: '&'
		}
	}
})





/*Dummytextgenerator
* max = Zahl der Rückgabewörter
* return = String 
*/
var lorem = function(max) {
	var lw = ['abenteuerlich','aktiv','angenehm','animalisch','anmutig','anregend','anspruchsvoll','anziehend','aphrodisierend','atemberaubend','athletisch','attraktiv','aufreizend','ausgelassen','außergewöhnlich','außerordentlich','bedeutend','beeindruckend','beflügelt','befreiend','begehrenswert','begeisternd','beglückend','belebt','berauschend','berühmt','besonders','bewundernswert','bezaubernd','bildlich','brillant','charismatisch','charmant','dominant','duftend','dynamisch','','[adjektivebuchbanner]','echt','edel','ehrlich','einfühlsam','einzigartig','ekstatisch','elegant','emotional','empfehlenswert','entzückend','erfrischend','erhellend','erotisch','erregend','erstaunlich','erstklassig','exklusiv','extravagant','exzellent','fabelhaft','fantastisch','faszinierend','fein','fesselnd','feurig','freizügig','freudig','freundlich','frisch','fröhlich','geborgen','geheim','geheimnisvoll','geliebt','genüsslich','geschmackvoll','gespannt','gigantisch','glänzend','glücklich','grandios','gravierend','grenzenlos','großartig','harmonisch','heißblütig','hell','hemmungslos','herrlich','hervorragend','hübsch','hüllenlos','','[adjektivebuchbanner]','humorvoll','ideal','imponierend','individuell','Instinktiv','intelligent','intensiv','interessant','klar','knallig','komfortabel','königlich','kostbar','kraftvoll','kunstvoll','lebendig','lebhaft','leidenschaftlich','leuchtend','liebenswert','lüstern','lustvoll','luxuriös','mächtig','magisch','märchenhaft','maximal','mitreißend','mysteriös','mystisch','packend','perfekt','persönlich','phänomenal','phantastisch','pikant','positiv','potent','prächtig','prall','rasant','real','reich','rein','reizend','riesig','riskant','romantisch','schamlos','scharf','schön','selbstlos','selbstsicher','selten','sensationell','sensibel','sexuell','sinnlich','spannend','spektakulär','sprachlos','spürbar','stark','stilvoll','stürmisch','sündig','sympathisch','traumhaft','überlegen','überwältigend','unfassbar','unglaublich','unsterblich','unwiderstehlich','verblüffend','verführerisch','verlockend','verwöhnt','vital','warm','weiblich','wertvoll','wild','wohlklingend','wohlriechend','wunderbar','wunderschön','wundervoll','zaghaft','zärtlich','zuverlässig','zwischenmenschlich','Anruf','Anzug','Apfel','April','Arm','Arzt','August','Ausweis','Bahnhof','Balkon','Baum','Berg','Beruf','Bildschirm','Bus','Computer','Dezember','Dienstag','Durst','Drucker','Eintrittskarte','Einwohner','Fahrschein','Februar','Fernseher','Finger','Flughafen','Flur','Frühling','Füller','Fuß','Fußboden','Garten','Gast','Geburtstag','Hafen','Hamburger','Herbst','Herr','Himmel','Hut','Hunger','Januar','Juli','Juni','Kaffee','Kakao','Keller','Kellner','Kleiderhaken','Koch','Kognak','Kuchen','Kugelschreiber','Kuchen','Kunde','Laden','Lehrer','Locher','Löffel','Mai','März','Mann','Markt','Marktplatz','Monitor','Name','November','Oktober','Opa','Park','Pass','Passant','Platz','Projektor','Pullover','Radiergummi','Regen','Rock','Schinken','Schlüssel','Schnaps','Schnee','Schrank','September','Sessel','Sommer','Star','Strumpf','Stuhl','Supermarkt','Tag','Tee','Teppich','Test','Tisch','Tourist','Urlaub','Vater','Wagen','Wein','Wind','Winter','Wunsch','Zeiger','Zucker','Zug','Zuschauer	Adresse','Apfelsine','Apotheke','Bank','Bankkarte','Bedienung','Beschreibung','Bestellung','Bibliothek','Bluse','Brille','Brücke','City','Cola','Decke','Diskette','Dolmetscherin','Dose','Dusche','Eile','Einladung','Etage','Fahrkarte','Festung','Fotografie','Frage','Funktion','Gabel','Garage','Gardine','Gasse','Gitarre','Größe','Hilfe','Hose','Hütte','Information','Kasse','Kassette','Kirche','Krawatte','Kreditkarte','Kreide','Küche','Kultur','Lampe','Landkarte','Landschaft','Mandarine','Maschine','Maus','Milch','Mutter','Mütze','Nachricht','Nacht','Nase','Natur','Nummer','Oma','Oper','Ordnung','Pause','Pflanze','Pizza','Polizistin','Post','Postkarte','Prüfung','Reparatur','Reservierung','Sache','Sahne','Schule','Sehenswürdigkeit','SMS','Socke','Sonne','Straße','Straßenbahn','Tasche','Tasse','Toilette','Torte','U-Bahn','Überraschung','Übung','Uhr','Umwelt','Universität','Verbindung','Wand','Wanderung','Welt','Werbung','Werkstatt','Wirtschaft','Woche','Wurst','Zeitung	Auge','Auto','Bad','Bein','Bett','Bier','Bild','Brötchen','Buch','Café','Einkaufszentrum','Fahrrad','Fest','Flugzeug','Foto','Fräulein','Frühstück','Gefühl','Gemüse','Geschäft','Glas','Gleis','Handy','Haus','Heft','Hemd','Hotel','Huhn','Kännchen','Internet','Kind','Kino','Kleid','Klo','Leben','Mädchen','Messer','Motorrad','Museum','Radio','Regal','Restaurant','Schiff','Schnitzel','Sofa','Spiel','Steak','Stück','Taxi','Telefon','Theater','Ticket','Tonbandgerät','Warenhaus','Wasser','Wetter','Wunder','Aids','Antibiotikum','Apartheid','Atombombe','Autobahn','Automatisierung','Beat','Beton','Bikini','Blockwart','Bolschewismus','Camping','Comics','Computer','Demokratisierung','Demonstration','Demoskopie','Deportation','Design','Doping','Dritte Welt','Drogen','Eiserner Vorhang','Emanzipation','Energiekrise','Entsorgung','Faschismus','Fernsehen','Film','Fließband','Flugzeug','Freizeit','Friedensbewegung','Führer','Fundamentalismus','Gen','Globalisierung','Holocaust','Image','Inflation','Information','Jeans','Jugendstil','Kalter Krieg','Kaugummi','Klimakatastrophe','Kommunikation','Konzentrationslager','Kreditkarte','Kugelschreiber','Luftkrieg','Mafia','Manipulation','Massenmedien','Molotowcocktail','Mondlandung','Oktoberrevolution','Panzer','Perestroika','Pille','Planwirtschaft','Pop','Psychoanalyse','Radar','Radio','Reißverschluss','Relativitätstheorie','Rock and Roll','Satellit','Säuberung','Schauprozess','Schreibtischtäter','Schwarzarbeit','Schwarzer Freitag','schwul','Selbstverwirklichung','Sex','Single','Soziale Marktwirtschaft','Sport','Sputnik','Star','Stau','Sterbehilfe','Stress','Terrorismus','U-Boot','Umweltschutz','Urknall','Verdrängung','Vitamin','Völkerbund','Völkermord','Volkswagen','Währungsreform','Weltkrieg','Wende','Werbung','Wiedervereinigung','Wolkenkratzer']
	var a = Math.floor(Math.random()*max), b='';
	for (var i = 0; i < a; i++) {
		b= b + ' ' + lw[Math.floor(Math.random()*lw.length)]
	}
	return b
}

</script>