
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




app.directive('registerFormTwo', function() {
	return{
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
		 <div ng-bind-html="sbc.location_description"></div>\
		 </h3></div><div ng-show="sbc.btnRegister">\
		 <register-form-two></register-form-two></div></a></div>'
	}
});



app.directive('courseList', function(){
	return{
		template: '<div class="container" style="width: 98%;">\
					  <div class="panel-group" id="t.topic_name_raw">\
					    <div class="panel panel-default">\
					      <div class="panel-heading with panel-primary">\
					      <h3><a data-toggle="collapse" href="#{{c.sysName}}">{{c.courseHeadline}}</a></h3>\
					      </div>\
					      <div id="{{c.sysName}}"" class="panel-collapse collapse">\
					        <div class="panel-body" ng-if="c.test=0">Kurs: {{c.courseHeadline}}{{c.courseDescription}}{{c.coursePrice}}{{c.number_of_days}}{{c.min_participants}}</div>\
					        <div class="panel-body" ng-if="c.test=1"> \
					        	<h3>Test: {{c.courseHeadline}}</h3>\
					        	<div ng-bind-html="c.courseDescription"></div>\
					        	<div ng-bind-html="c.courseDescriptionCertificate"></div>\
					        	<h4 style="color:green">Preis: {{c.coursePrice}},00 €</h4>\
					        	<h4 style="color:blue">Dauer: {{c.number_of_days}} Tage</h4>\
					        	<h4 style="color:red">Mindestteilnehmerzahl: {{c.min_participants}} Personen</h4></div>\
					      </div>\
					    </div>\
					  </div> \
					</div>',
		replace: true
	}
})


</script>