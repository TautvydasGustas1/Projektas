@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-20">
            <div class="card">
                <div class="card-header"><h1 align="center">Products</h1></div>
                <a href="products/create" class="btn btn-primary" align="center">Add Product</a>

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
							<th>Sku</th>
							<th>Title</th>
							<th>Cost</th>
							<th>Price</th>
							<th>Special Price</th>
							
						</tr>
							
						</thead>
			<tbody>
				
				  @foreach($products as $product)

                  			<tr>
                  			
							<td>{{$product->sku}}</td>
							<td>{{$product->title}}</td>
							<td>{{$product->cost}}</td>
							<td>{{$product->price}}</td>
							<td>{{$product->special_price}}</td>
				
							<td><a href="/products/{{$product->id}}/edit" class="btn btn-green btn-sm" type=button> Edit </a></td>
							<td><a href="/products/{{$product->id}}/delete" class="btn btn-danger btn-sm" type=button> Delete </a></td>
								
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