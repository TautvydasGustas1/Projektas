@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" align="center"><h1>Edit Order Item</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/order/{{$order_items->order_id}}/items/{{$order_items->id}}" enctype="multipart/form-data">
	                  	<input type="hidden" name="_method" value="PATCH">
				        @csrf

				        							<div class="row">
			         				 <div class="form-group col-md-4" style="margin-top:60px">
			           				 <button type="submit" class="btn btn-success">Save</button>
			          				 </div>
			       			 </div>

				        <div class="row">
							<div class="col-md-4"></div>
				      		  <div class="form-group col-md-4">
								  <label for="order_id">Order Number</label>
								  <input type="text" class="form-control" name="order_id" value="{{$order_items->order_id}}">
							  </div>
						</div>
				
						
				      <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="sku">Sku</label>
						  <select class="form-control" name="sku">
						  	<option disabled selected value></option>
						    @foreach($skus as $sku)
    						<option value="{{ $sku['sku'] }}" {{($order_items->sku == $sku['sku']) ? 'selected' : ''}} >{{ $sku['sku'] }}</option>
  							@endforeach
						  </select>
						</div>
					</div>
				        

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="product_title">Product title</label>
				            <input type="text" class="form-control" name="product_title" value="{{$order_items->product_title}}">
				            <div class="invalid-feedback">{{$errors->first('product_title')}}</div>
				          </div>
				        </div>

				  
				         <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="customer_title">Customer Title</label>
				            <input type="text" class="form-control" name="customer_title" value="{{$order_items->customer_title}}">
				          </div>
				        </div>

		
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="contact_info">Contact Info</label>
				            <input type="text" class="form-control" name="contact_info" value="{{$order_items->contact_info}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="price">Price</label>
				            <input type="text" class="form-control" name="price"  value="{{$order_items->price}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="qty">Quantity</label>
				            <input type="text" class="form-control" name="qty"  value="{{$order_items->qty}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="deadline">Deadline</label>
				            <input type="date" class="form-control" name="deadline"  value="{{$order_items->deadline}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="leadtime">Leadtime</label>
				            <input type="date" class="form-control" name="leadtime"  value="{{$order_items->leadtime}}">
				          </div>
				        </div>

				       <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="item_status">Item Status</label>
						  <select class="form-control" name="item_status"  value="{{$order_items->item_status}}">
						  	<option disabled selected value></option>
						    <option value="0" {{($order_items->item_status == '0') ? 'selected' : ''}}>0 - Not requested</option>
						    <option value="1" {{($order_items->item_status == '1') ? 'selected' : ''}}>1 - Requested</option>
						    <option value="2" {{($order_items->item_status == '2') ? 'selected' : ''}}>2 - Confirmed</option>
						    <option value="3" {{($order_items->item_status == '3') ? 'selected' : ''}}>3 - Declined</option>
						    <option value="4" {{($order_items->item_status == '4') ? 'selected' : ''}}>4 - Undecided</option>
						    <option value="5" {{($order_items->item_status == '5') ? 'selected' : ''}}>5 - Delivered</option>
						  </select>
						</div>
					</div>

				         <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="notified">Notified</label>
						  <select class="form-control" name="notified">
						  	<option disabled selected value></option>
						    <option value="0" {{($order_items->notified == '0') ? 'selected' : ''}}>0 - Customer not notified about status</option>
						    <option value="1" {{($order_items->notified == '1') ? 'selected' : ''}}>1 - Customer notified about status</option>
						    <option value="2" {{($order_items->notified == '2') ? 'selected' : ''}}>2 - Customer not notified about arrival</option>
						    <option value="3" {{($order_items->notified == '3') ? 'selected' : ''}}>3 - Customer notified about arrival</option>
						  </select>
						</div>
					</div>

				        <div class="row">
						<div class="col-md-4"></div>
				        <div class="form-group col-md-4">
						  <label for="customer_status">Customer Status</label>
						  <select class="form-control" name="customer_status">
						  	<option disabled selected value></option>
						    <option value="0" {{($order_items->customer_status == '0') ? 'selected' : ''}}>0 - Request</option>
						    <option value="1" {{($order_items->customer_status == '1') ? 'selected' : ''}}>1 - Price offer</option>
						    <option value="2" {{($order_items->customer_status == '2') ? 'selected' : ''}}>2 - Negotiation</option>
						    <option value="3" {{($order_items->customer_status == '3') ? 'selected' : ''}}>3 - Closed refused</option>
						    <option value="4" {{($order_items->customer_status == '4') ? 'selected' : ''}}>4 - Closed confirmed</option>
						  </select>
						</div>
					</div>
				</form>
					 </div>
                </div>
            </div>
        </div>
    </div>

@endsection

