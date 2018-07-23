@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" align="center"><h1>Edit Order</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/orders/{{$order->id}}" enctype="multipart/form-data">
	                  	 <input type="hidden" name="_method" value="PATCH">
				        @csrf
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				          	
							<div id="form" action="{{$order->id}}"></div>

				            <!-- <label for="order_no">Order No</label>
				            <input type="order_no" class="form-control @if($errors->has('order_no')) is-invalid @endif" name="order_no" value="{{$order->order_no}}">
				            				          <div class="invalid-feedback">{{$errors->first('order_no')}}</div>   -->
				          </div>
				        </div>


					 <div class="row">
					 	<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						 <!--  <label for="status">Status</label>
						 <select class="form-control" name="status">
						   <option  value="0" {{($order->status == '0') ? 'selected' : ''}}>0 - Not sent</option>
						   <option  value="1" {{($order->status == '1') ? 'selected' : ''}}>1 - Sent current to open</option>
						   <option  value="2" {{($order->status == '2') ? 'selected' : ''}}>2 - Closed</option>						
						 </select> -->
						</div>
					</div>
						
				        <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						 <!--  <label for="supplier">Supplier</label>
						 <select class="form-control" name="supplier" value="{{$order->supplier}}">
						 	<option disabled selected value></option>
						   @foreach($supplier as $supplier1)
						     						<option value="{{ $supplier1['code'] }}" {{($order->supplier == $supplier1['code']) ? 'selected' : ''}} >{{ $supplier1['code'] }}</option>
						   							@endforeach
						 </select> -->
						</div>
				   
							<div class="row">
			         				 <div class="form-group col-md-4" style="margin-top:60px">
			           				 <button type="submit" class="btn btn-success">Submit</button>
			          				 </div>
			       			 </div>
				    	</form>
							</div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection