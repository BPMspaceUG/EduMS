<?php
include_once '_dbconfig.inc.php';
?>
<?php
include_once '_header.inc.php';
?>

<?php
/* presente $help_text when not empty */
if ($help_text) {
		echo '<div class="container bg-info 90_percent" >' ;
			echo "<a data-toggle=\"collapse\" data-target=\"#collapse_help_event\" >PSEUDO CODE FOR EVENT_GRID PHP - Later here will be the helptext&nbsp;<i class=\"fa fa-chevron-down\"></i></a>";
			echo "<div id=\"collapse_help_event\" class=\"collapse\"> ";
			include_once 'event_helptxt.php';
			echo "</div>";
		echo "</div><p></p><p></p>";
		
}
?>

<div class="clearfix"></div>
<div class="container 90_percent">
<a href="#" class="btn btn-primary navbar-left" title='events 10 days in the passt and all events in the future'>-&nbsp;10&nbsp;<i class="fa fa-sun-o"></i>&nbsp;/+&nbsp;<i class="fa fa-refresh "></i>&nbsp;<i class="fa fa-moon-o"></i></a>
<a href="#" class="btn btn-primary navbar-left" title='all events in the passt and al events in the future'>-&nbsp;<i class="fa fa-refresh "></i>&nbsp;<i class="fa fa-moon-o"></i>>&nbsp;/+&nbsp;<i class="fa fa-refresh "></i>&nbsp;<i class="fa fa-moon-o"></i></a>	

<a href="#" class="btn btn-primary navbar-right">Signaturlist</a>

<a href="#" class="btn btn-primary navbar-right">Certificates</a>	
</div>

<div class="container 90_percent";>
<table id="all_events" class="tablesorter table table-striped table-hover"> 
<thead> 
<tr> 
    <th><i class="fa fa-square-o"></i></th>
	<th>Event_ID <b class="caret"></b></th>
	<th>Start Date <b class="caret"></b></th> 
    <th>Course <b class="caret"></b></th> 
    <th>reg P <b class="caret"></b></th> 
    <th>sto P <b class="caret"></b></th> 
    <th>min P <b class="caret"></b></th>
    <th>density <b class="caret"></b></th>
    <th>life cyle <b class="caret"></b></th>
    <th>guarantee <b class="caret"></b></th>
    <th>visability <b class="caret"></b></th>
    <th>brand <b class="caret"></b></th>
	<th>trainer <b class="caret"></b></th>
</tr> 
</thead> 
<tbody> 
<tr> 
    <td><i class="fa fa-square-o"></i>&nbsp;<a data-toggle="collapse" data-target="#collapse1" ><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button></a>&nbsp;<a data-toggle="modal" data-target="#EventForm"><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></a></td>
	<td>1&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
    <td colspan=12>
		<div id="collapse1" class="collapse"> 
			<table class="table table-striped table-hover">
				<thead> 
				<tr> 
					<th></th>
					<th>P_ID</th>
					<th>Status></th> 
					<th>Order Date</th> 
					<th>Lastname</th> 
					<th>Firstname</th> 
					<th>Email Address</th>
					<th>Email Address 2</th>
					<th>Organization<</th>
					<th>Comment</th>
					<th>Status Billing</th>
					<th>Invoice Info</th>

				</tr> 
				</thead>
				<tbody> 
				<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
								<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr> 
					<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr> 
									<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
									<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
									<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
									<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
				
				
				
				
				
				
				</tbody>	
				
			</table>
		</div>
	</td>     
</tr> 
<tr> 
    <td><i class="fa fa-square-o"></i>&nbsp;<a data-toggle="collapse" data-target="#collapse2" ><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button></a>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>
    <td>2&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ItSec F</td> 
    <td>9</td> 
    <td>0</td> 
    <td>3</td> 
    <td><i class="fa fa-battery-three-quarters text-success"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
    <td colspan=12>
		<div id="collapse2" class="collapse"> 
			<table class="table table-striped table-hover">
				<thead> 
				<tr> 
					<th></th>
					<th>P_ID</th>
					<th>Status></th> 
					<th>Order Date</th> 
					<th>Lastname</th> 
					<th>Firstname</th> 
					<th>Email Address</th>
					<th>Email Address 2</th>
					<th>Organization<</th>
					<th>Comment</th>
					<th>Status Billing</th>
					<th>Invoice Info</th>

				</tr> 
				</thead>
				<tbody> 
				<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr>
								<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr> 
								<tr> 
					<td><button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></td>     
					<td>23443</td>
					<td>registriert <b class="caret"></b></td>     
					<td>13.11.2014</td>     
					<td>iudy</td>     
					<td>kcjxbvpdfg</td>     
					<td>gh@dfghn.fr</td>     
					<td>gh@dfghn.fr</td>     
					<td>hjsfg</td>     
					<td>634634634634345634</td>     
					<td>gestellt</td>      
					<td>456436</td>     
				</tr> 
				</tbody>	
				
			</table>
		</div>
	</td>     
</tr> 
<tr> 
       
	<td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td>
	<td>3&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td>
		<td>4&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>5&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>2</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-empty text-danger"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td>
		<td>6&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td>
		<td>7&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>8&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 

<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 
<tr> 
        <td><i class="fa fa-square-o">&nbsp;</i><button type="button" class="btn btn-success"><i class="fa fa-plus-square"></i></button>&nbsp;<button type="button" class="btn btn-info"><i class="fa fa-pencil"></i></button></i></td><td>9&nbsp;</td> 
    <td>21.12.2015</td> 
    <td>ITIL F</td> 
    <td>7</td> 
    <td>1</td> 
    <td>5</td> 
    <td><i class="fa fa-battery-quarter"></i></td> 
    <td>planed <b class="caret"></b></td> 
    <td>only 3</td> 
    <td>public</td> 
    <td>mITSM</td> <td>Sepp</td>     
</tr> 




</tbody> 
</table> </div>
<?php
include_once '_footer.inc.php';
?>

<!---------------- MODAL ------------------------------->

<div class="modal fade" id="EventForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<h4 class="modal-title" id="myModalLabel">Form Event</h4>
		</div>
		<div class="modal-body">
			<div class="container 90_percent">;
				<div class="row">;
					<div class="col-sm-12">Hier ein Formularteil oben</div>;	
				</div>
				<div class="row">";
					<div class="col-sm-6">Hier ein Formularteil links</div>;
					<div class="col-sm-6">Hier ein Formularteil rechts</div>;
				</div>;
			</div>;	
		</div>;	
		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="button" class="btn btn-primary">Save changes</button>
		</div>
    </div>
  </div>
</div>


 
 