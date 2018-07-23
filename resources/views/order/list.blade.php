@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-20">
            <div class="card">
                <div class="card-header"><h1 align="center">Orders</h1></div>
                <a href="orders/create" class="btn btn-primary" align="center">Add Order</a>

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
							<th>Order No</th>
							<th>Status</th>
							<th>Supplier</th>
						</tr>
							
						</thead>
			<tbody>
				  @foreach($orders as $order)

                  			<tr>
                  			
							<td>{{$order->order_no}}</td>
							<td>{{$order->status}}</td>
							<td>{{($order->supplier)}}</td>
							
							<td><a href="/orders/{{$order->id}}/edit" class="btn btn-green btn-sm" type=button> Edit </a></td>
							<td><a href="/order/{{$order->id}}/items/create" class="btn btn-success btn-sm" type=button> Add items </a></td>
							<td><a href="/order/{{$order->id}}/items" class="btn btn-info btn-sm" type=button> Show items </a></td>
							<td><a href="/orders/{{$order->id}}/delete" class="btn btn-danger btn-sm" type=button> Delete </a></td>
								
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