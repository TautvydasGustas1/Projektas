@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" align="center"><h1>Create Order</h1></div>
                <div class="card-body">
	                  <form method="post" action="{{url('orders')}}" enctype="multipart/form-data">
				        @csrf
												
				        <div class="row">
				          <div class="col-md-4"></div>
				         	 <div class="form-group col-md-4">
				         	 	
								 <div id="form" ></div>
								 
								
				            <!-- <label for="order_no">Order No</label>
				            <input type="order_no" class="form-control @if($errors->has('order_no')) is-invalid @endif" name="order_no">
				            <div class="invalid-feedback">{{$errors->first('order_no')}}</div>   -->
				          </div>
				        </div>
						 
					 <div class="row">
						<div class="col-md-4"></div>
				        	<div class="form-group col-md-5">
				        		<div id="status" name="status"></div>
						  <!-- <label for="status">Status</label>
						  <select class="form-control" name="status">
						  	<option disabled selected value></option>
						    <option value="0">0 - Not sent</option>
						    <option value="1">1 - Sent current to open</option>
						    <option value="2">2 - Closed</option>						
						  </select> ---->
						</div>
					</div> 
						
				
				        <div class="row">
							<div class="col-md-4"></div>
				        		<div class="form-group col-md-5">
				        			<div id="supplier" name="supplier"></div>
						  			<!-- <label for="supplier">Supplier Code</label>
						  				<select class="form-control" name="supplier">
						  				<option disabled selected value></option>
						  				@foreach($supplier as $supplier1)
						  			    <option value="{{ $supplier1['title'] }}">{{ $supplier1['code'] }}</option>
						  			  	@endforeach
						  				</select> -->
								</div> 
				 			</div>



							<div class="row">
								</div>
			         				 <div class="form-group col-md-5" style="margin-top:60px">
			           				 <button type="submit" class="btn btn-success">Submit</button>
			          				 </div>
			          				 
			       			 </div>
				    	</form>	

                </div>
            </div>
        </div>
    </div>
</div>


@endsection