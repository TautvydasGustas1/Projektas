@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-sm-20">
            <div class="card">
                <div class="card-header"><h1 align="center">Items for order {{$order->order_no}}</h1></div>
                <a href="/order/{{$order->id}}/items/create" class="btn btn-primary" align="center">Add Order Item</a>

                @if (Session::has('flash_message'))
                	<div class="alert alert-success"> {{Session::get('flash_message')}} </div>
                @endif

                @if (Session::has('flash_message edit'))
                	<div class="alert alert-success"> {{Session::get('flash_message edit')}} </div>
                @endif

                 @if (Session::has('flash_message delete'))
                	<div class="alert alert-success"> {{Session::get('flash_message delete')}} </div>
                @endif

                <div class="card-body">
                 	
					<table class="table"> 
						<thead>
						<tr>
							<th>Order ID</th>
							<th>Sku</th>
              <th>Product Title</th>
              <th>Customer Title</th>
              <th>Contact Info</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Deadline</th>
              <th>Leadtime</th>
              <th>Item Status</th>
              <th>Notified</th>
              <th>Customer Status</th>
						</tr>
							
						</thead>
			<tbody>
				
                  			
          @foreach($order_items as $order_item)

                        <tr>
							<td>{{$order_item->order_id}}</td>
							<td>{{$order_item->sku}}</td>
              <td>{{$order_item->product_title}}</td>
              <td>{{$order_item->customer_title}}</td>
              <td>{{$order_item->contact_info}}</td>
              <td>{{$order_item->price}}</td>
              <td>{{$order_item->qty}}</td>
              <td>{{$order_item->deadline}}</td>
              <td>{{$order_item->leadtime}}</td>
              <td>{{$order_item->item_status}}</td>
              <td>{{$order_item->notified}}</td>
              <td>{{$order_item->customer_status}}</td>
							
							<td><a href="/order/{{$order->id}}/items/{{$order_item->id}}/edit" class="btn btn-green btn-sm" type=button> Edit </a></td>
							<td><a href="/order/{{$order_item->order_id}}/items/{{$order_item->id}}/delete" class="btn btn-danger btn-sm" type=button> Delete </a></td>
								
							</tr>
              
                  @endforeach
			</tbody>
                
						</table>
              

                </div>
            </div>
        </div>
    </div>
</div>
@endsection