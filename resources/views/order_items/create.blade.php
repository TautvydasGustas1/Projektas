@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" align="center"><h1>Create Order Item</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/order/{{$order['id']}}/items" enctype="multipart/form-data">
				        @csrf
				        <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
				        	
						  <label for="order_id">Order Number</label>
						  {{--<select class="form-control" name="order_id">
						  	<option disabled selected value></option>
						    @foreach($orders as $order)
    						<option value="{{ $order['id'] }}">{{ $order['order_no'] }}</option>
  							@endforeach
						  </select>
						--}}
						<input class="form-control" type="text" name="order_no" value="{{$order->order_no}}">
						<input type="hidden" name="order_id" value="{{$order->id}}">
						</div>
					</div>
						
				       <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="sku">Sku</label>
						  <select class="form-control" name="sku">
						  	<option disabled selected value></option>
						    @foreach($skus as $sku)
    						<option value="{{ $sku['sku'] }}">{{ $sku['sku'] }}</option>
  							@endforeach
						  </select>
						</div>
					</div>
				        
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="product_title">Product title</label>
				            <input type="text" class="form-control" name="product_title">
				          </div>
				        </div>


				         <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="customer_title">Customer Title</label>
				            <input type="text" class="form-control" name="customer_title">
				          </div>
				        </div>

		
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="contact_info">Contact Info</label>
				            <input type="text" class="form-control" name="contact_info">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="price">Price</label>
				            <input type="text" class="form-control" name="price">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="qty">Quantity</label>
				            <input type="text" class="form-control" name="qty">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="deadline">Deadline</label>
				            <input type="date" class="form-control" name="deadline">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="leadtime">Leadtime</label>
				            <input type="date" class="form-control" name="leadtime">
				          </div>
				        </div>

				       <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="item_status">Item Status</label>
						  <select class="form-control" name="item_status">
						  	<option disabled selected value></option>
						    <option value="0">0 - Not requested</option>
						    <option value="1">1 - Requested</option>
						    <option value="2">2 - Confirmed</option>
						    <option value="3">3 - Declined</option>
						    <option value="4">4 - Undecided</option>
						    <option value="5">5 - Delivered</option>
						  </select>
						</div>
					</div>

				         <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="notified">Notified</label>
						  <select class="form-control" name="notified">
						  	<option disabled selected value></option>
						    <option value="0">0 - Customer not notified about status</option>
						    <option value="1">1 - Customer notified about status</option>
						    <option value="2">2 - Customer not notified about arrival</option>
						    <option value="3">3 - Customer notified about arrival</option>
						  </select>
						</div>
					</div>

				        <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="customer_status">Customer Status</label>
						  <select class="form-control" name="customer_status">
						  	<option disabled selected value></option>
						    <option value="0">0 - Request</option>
						    <option value="1">1 - Price offer</option>
						    <option value="2">2 - Negotiation</option>
						    <option value="3">3 - Closed refused</option>
						    <option value="4">4 - Closed confirmed</option>
						  </select>
						</div>
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

