<script  type="text/javascript">

/*
Eng: The controller navCtrl uses the $http-service to get JSON-datasets from DB-Views and reorganize them in $scope.
The templates rightBar-X show the next courses in context of the selected topic. Also there is a lorem fuction for dummytext.

Deu/Ger: Der Controller navCtrl fordert über den $http-service JSON-Datensätze DB-Views und reorganisiert sie in $scope.
Die Templates rightBarCourseByTopic und rightBarCourseAll zeigen die nächsten courses in Abhängigkeit des ausgewählten Topics an.
Die lorem function erzeugt Dummytext.
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------
*/

/*Controllers define and handle an Angular area
Ein controller wird für einen bestimmten Sinnabschnitt innerhalb von Angular definiert*/

app.controller('navCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
	//https://docs.angularjs.org/api/ngSanitize/service/$sanitize
$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getBrandInfo')
	.then(function(response) {

		//brandinfo:
		/*accesstoken: "5b35793a3",brandDescription: "<h2>description</p>",brandDescriptionFooter: "<h2>FOOTices proin.</p>",brandDescriptionSidebar: "<h2>SIDt felis</p>",
		brandHeadline: "Brand with ID 9",brandImage: "<img class="" src="http://dummyimage.com/200x200/91B561/3D7B6B.jpg&text=Eqpajbuu ID 9",brand_id: "9",brand_name: "Eqpajbuu ID 9",
		branddeprecated: "0",css-style: "<style> body {background-color: ;}</style>",discount: "7.00",event_partner_id: "1",login: "EqpajbuuID9"*/
		$scope.brandinfo = response.data.brandinfo
		$scope.brandinfo.brandDescription = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescription+'</div>')
		$scope.brandinfo.brandDescriptionFooter = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescriptionFooter+'</div>')
		$scope.brandinfo.brandDescriptionSidebar = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescriptionSidebar+'</div>')
		$scope.brandinfo.brandImage = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandImage+'</div>')


		//topiclist: 
		/*$$hashKey: "object:953", deprecated: "0", footer: "<h2>FOOTER Topic ligula. At.</p>", responsibleTrainer_id: "14", topicDescription: "<h2>Topic with ID 1</h2>", 
		topicDescriptionSidebar: "<h2>with ID 1</h2>", topicHeadline: "TOPIC with ID 1", topicImage: "data:image/svg+xml;charset=utf-8,<svg><%2Fsvg>", topicName: "Pkhhoaged", topic_id: "1"*/
		$scope.topics = response.data.topiclist
			for (var i = 0; i < $scope.topics.length; i++) {
				$scope.topics[i].footer = $sce.trustAsHtml('<div>'+$scope.topics[i].topicFooter+'</div>')
				$scope.topics[i].topicDescription = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescription+'</div>')
				$scope.topics[i].topicDescriptionSidebar = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionSidebar+'</div>')
				$scope.topics[i].topicImage = $sce.trustAsHtml('<div>'+$scope.topics[i].topicImage+'</div>')
			}
















		//topiccourselist:
		/*course_id: "43", course_name: "Training 43 in Topic 1 - Level-Rank 1-1", level: "1", rank: "1", topicName: "Pkhhoaged", topic_course_id: "43", topic_id: "1"*/
		$scope.topiccourseCourse = response.data.topiccourselist 

		


		//courselist:
		/*courseDescription: "<p>Posuere mus.</p>",	courseDescriptionCertificate: "<h2>adfadf</ul>", courseDescriptionMail: "<h2>Course description from conec.</p>"
		courseHeadline: "Training 43 in Topic 1 - Level-Rank 1-1", coursePrice: "1075",	course_id: "43",  course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
		internet_course_article_id: "14",min_participants: "3", number_of_days: "3"*/
		$scope.courses = response.data.courselist;
		for (var i = 0; i < $scope.courses.length; i++) {
				$scope.courses[i].courseDescription = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescription+'</div>')
				$scope.courses[i].courseDescriptionCertificate = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionCertificate+'</div>')
				$scope.courses[i].courseDescriptionMail = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionMail+'</div>')
				
				if ($scope.courses[i].courseHeadline.length<2) {
					$scope.courses[i].courseHeadline=$scope.courses[i].course_name
					
				};
			}

		//coursetotestlist:
		/*v_testcourse	-	course_id:1, test_id:44*/
		$scope.courseToTest = response.data.coursetotestlist;


















		//$scope.courseToTest:
		/*v_testcourse	-	course_id:1, test_id:44*/

		//$scope.topiccourseCourse:
		/*course_id: "43", level: "1", rank: "1",  topic_course_id: "43", topic_id: "1"*/

		//$scope.courses:
		/*courseDescription: "<p>Posuere mus.</p>",	courseDescriptionCertificate: "<h2>adfadf</ul>", courseDescriptionMail: "<h2>Course description from conec.</p>"
		courseHeadline: "Training 43 in Topic 1 - Level-Rank 1-1", coursePrice: "1075",	course_id: "43",  course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
		internet_course_article_id: "14",min_participants: "3", number_of_days: "3"*/
		// function defPrizeList (courses, ctoTest, level) {
		// 	// console.log(level[1])//'\n l:'+l)
		// 	pl=[],	maxlvl=1, maxrank=1;
		// 	for (var t = 0; t < level.length; t++) {
		// 		if (level[t].level>maxlvl) {maxlvl=level[t].level}
		// 		if (level[t].rank>maxrank) {maxrank=level[t].rank}
		// 	}
		// console.log('max lvl & rank:'+maxlvl+' |'+maxrank)

		// 	for (var l = 1; l < maxlvl; l++) {//4
		// 		console.log('\n\n\n lvl'+l+' von '+maxlvl)
		// 		// console.log(''++''++''++''++''++''++)
		// 		for (var r = 1; r < maxrank; r++) {//5
		// 			console.log('rank '+r+' von'+maxrank)
		// 			if (!pl['level'+l]) {pl['level'+l]=[]}; 
		// 			console.log('starte suche in lvlListe')
		// 			for (var i = 0; i < level.length; i++) {						
		// 				console.log('Eintrag '+i+' von'+level.length)
		// 				//gehe der reihe nach alle level und ranks durch
		// 				if(level[i].level==l && level[i].rank==r){
		// 				console.log('Match bei '+i+', l&r:'+l+' '+r+'\n..starte courseSuche nach cid '+level[i].course_id)
		// 				// console.log()						
		// 				// console.log('Eintrag für l'+l+' r'+r)
		// 					for (var j = 0; j < courses.length; j++) {
		// 					// console.log('i:'+i+' l:'+l+' r:'+r+' j:'+j)
		// 						if (courses[j].course_id == level[i].course_id) {
		// 							console.log('add to l '+l+' r'+r)
		// 							console.log(' courses['+j+']: ')
		// 							console.log(courses[j])

		// 							pl['level'+l].push( courses[j])
		// 							/*if(!=test){

		// 							}esle{

		// 							}
		// 						};
								
		// 					};
		// 				}
		// 			};
		// 		}
		// 	};
		// 							return pl
		// }
		// console.log(defPrizeList($scope.courses, $scope.courseToTest, $scope.topiccourseCourse))





















		//eventlist:
		/*courseMaxParticipants: "16", course_id: "74", course_name: "Training 74 in Topic 1 - Level-Rank 2-4", coursedeprecated: "0", event_id: "3873", event_status_id: "2"
		eventguaranteestatus: "2", eventinhouse: "0", finish_date: "2016-03-11", finish_time: "17:00:00", internet_location_name: "Koqlg", locationMaxParticipants: "16"
		location_description: "<h2>Location description from Locatos.</p>", location_id: "177", location_name: "Koqlg", start_date: "2016-03-09", start_time: "13:30:00", test: "0"*/	
		$scope.eventlist = response.data.eventlist
		for (var i = 0; i < response.data.eventlist.length; i++) {
				$scope.eventlist[i].location_description = $sce.trustAsHtml('<div>'+response.data.eventlist[i].location_description+'</div>')
			}

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
				locationMaxPart : response.data.eventlist[i].locationMaxParticipants,
				width: (function(){return Math.round((100*i)/response.data.eventlist.length)})()
			})
		}


		      	pl=[];
		      var createCourseList = function (top,mn,cou, mnctt){
		        for (var i = 0; i < top.length; i++) {//Jedes Topic bekommt eine Kursliste
				// pl[i]=[]
		          top[i].courseList = (function(){
		                      var courseList = [];
		                      for (var j = 0; j < mn.length; j++) {//gehe Topic-Course m:n Tabelle durch
		                        if (mn[j].topic_id == top[i].topic_id) { //Wenn m:n-Eintrag = dem aktuellen Topic ist
		                          for (var k = 0; k < cou.length; k++) {//gehe Kurstabelle durch
		                            if(mn[j].course_id == cou[k].course_id){// Wenn m:n-Eintrag (T-C) = dem aktuellen Kurs ist
		                            	//Zuteilung
		                            	cou[k].level = mn[j].level //Anzeigereihenfolge in Panel
		                            	cou[k].rank = mn[j].rank
		                            	cou[k].sysName = cou[k].course_name.replace(/\W+/g,''); //PanelIds
		                            	cou[k].test=(function() {for (var m = 0; m < mnctt.length; m++) {	if (cou[k].course_id==mnctt[m].test_id) {return 1}} return 0})()
		                            	cou[k].test_id=(function() {for (var m = 0; m < mnctt.length; m++) {	if (cou[k].course_id==mnctt[m].course_id) {return mnctt[m].test_id}} return false})()
// console.log('\nt'+i+' tcc'+j+' k'+k+'.test:'+cou[k].test)

	                              		pl.push({name: cou[k].course_name,
	                              			    sysname: cou[k].sysName,
	                              			    level: cou[k].level,
	                              			    rank: cou[k].rank,
	                              			    test: cou[k].test,
	                              			    test_id: cou[k].test_id,
	                              			    price: cou[k].coursePrice,
	                              				topic: i})


		                              		courseList.push(cou[k])
		                            	/*if (cou[k].test != '0'){
		                            	}else{
		                            	}*/
		                            }
		                          };
		                        };
		                      };
		                      // console.log(top[i].testblock)
		                      return courseList})()
		        };
		      }
			createCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)


				/*gehe courseliste durch
					wenn kurs: ordne Kurs seiner Gruppe zu
						gehe coursliste durch
							wenn kurs.test_id == courseliste[j].course_id
							hänge Kurs an ende an
							hänge gruppensumme an ende an*/
			$scope.pricelist=[]
			var createPrizeList = function(pl){
				for (var coursenr = 0; coursenr < pl.length; coursenr++) {
						if(!$scope.pricelist[pl[coursenr].topic]){$scope.pricelist[pl[coursenr].topic]=[]}

						var coursenow = pl[coursenr]

						if(!$scope.pricelist[ coursenow.topic ][ coursenow.level ]){$scope.pricelist[ coursenow.topic ][ coursenow.level ]=[]}

						if (coursenow.test==0) {
							$scope.pricelist[ coursenow.topic ][ coursenow.level ].push(coursenow)
						};
				};
				console.log($scope.pricelist)

				for (var topicnr = 0; topicnr < $scope.pricelist.length; topicnr++) {
					// console.log('a')
					// console.log( $scope.pricelist.length)
					for (var level = 0; level < $scope.pricelist[topicnr].length; level++) {
					// 	console.log('b')
					// console.log( $scope.pricelist[topicnr].length)
					// console.log( level)
					// console.log( $scope.pricelist[topicnr][level])
					var price = 0
					if (level>0) {
						for (var coursenow = 0; coursenow < $scope.pricelist[topicnr][level].length; coursenow++) {
							console.log(price = price + $scope.pricelist[topicnr][level][coursenow].price*1)
						};						
					$scope.pricelist[topicnr][level].price = price	
					};
					};
				};				
			} 
			createPrizeList(pl)



			/*search matches in course- and eventlist and push them to the Topic*/
			var cereateEventList = function(top, eve){
			  for (var i = 0; i < top.length; i++) {
			  	top[i].eventList=[]
			    for (var j = 0; j < top[i].courseList.length; j++) {
			      for (var k = 0; k < eve.length; k++) {
			        if (eve[k].course_id == top[i].courseList[j].course_id) {
			          top[i].eventList.push(eve[k])
			        };        
			      };      
			    };
			  };
			}
			cereateEventList($scope.topics, $scope.eventlist)
			 // console.log('\nel: ')
			 // console.log($scope.topics[1].eventList)



		//HTML5 3.2.3.1: Das id-Attribut darf kein Leerzeichen enthalten deshalb wird der topicName nach name_raw kopiert u. anschließend die Leerzeichen entfernt
		for (var i = 0; i < $scope.topics.length; i++) {
			$scope.topics[i].topic_name_raw = $scope.topics[i].topicName;			
			$scope.topics[i].topic_nr = i;			
			$scope.topics[i].topic_name = $scope.topics[i].topicName.replace(/\s+/g,'');//löscht alle Leerzeichen			
		}
		/*Suche Kurse und weise sie den Topics zu. Suche events zu den Kursen der Topics und weise sie den Topics zu*/
		var aNE=$scope.allNextEvents
		for (var i = 0; i < $scope.topics.length; i++) { //für alle topics
			// console.log('$scope.topics.length: '+$scope.topics.length)
			var t=$scope.topics[i]
			for (var j = 0; j < $scope.topiccourseCourse.length; j++) { //für alle topiccourCourse-Einträge
				var tcC=$scope.topiccourseCourse[j]

				//Wenn die topic_id des Elements aus der Topicliste == der topic_id des Elements aus der m:n-TopicCourses-Liste ist
				//dann lege in der Topicliste ein Array für die Sidebarelemente an. 
				//Vergleiche darauf hin die tc_course_id des TopicCourse Elements mit den course_id's aus der AllNextEvents-Liste.
				//Wenn die id's identisch sind füge dem aktuellen SidebarArray das Event hinzu
				if (t.topic_id == tcC.topic_id) {	//wenn ids gleich sind
					if (!$scope.topics[i].sideBarCourses){$scope.topics[i].sideBarCourses=[]}//lege sidebarArray für topic an
						for (var k = 0; k < $scope.eventlist.length; k++) {	//für alle allNextEvents-Einträge											
						if ($scope.topics[i].sideBarCourses.length<5) { //sidebar soll 5 elemente haben											
							if (tcC.course_id == $scope.eventlist[k].course_id) { //nur Events die zur aktuellen course_id passen
								$scope.topics[i].sideBarCourses.push($scope.eventlist[k]) //befülle SideBar-Array
								$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1]//Definiere ID-name ohne Leerzeichen
								.sysName=$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,'');
								// console.log('sysName: '+$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,''))
							};								
						};
					};
				};					
			};
		};

		//};
		console.log('fertiges $scope.topics: (Auskommentiert)');console.log($scope.topics);	
		},function(response) {$scope.topics = 'Fehler in topicCtrl-$http: '+response}
	)


/*A reservation sends an E-Mail to the reservating person with some description and an other E-Mail to 
the responsible person in the Brand (DB-change -> registermail)*/
$scope.reservateCourse = function(part) {
	var reserveInfo = /*document.getElementById($scope['inputNameId'+part]).mVorname ||*/ 'Horst'
	var reserveInfo = part

	console.log('reservepush: '+ reserveInfo)
	$http.post('/EduMS/api/index.php/'+bname+'/'+pw+'/reserve', reserveInfo)
	$http.post('localhost:4041', reserveInfo)
}
}])











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