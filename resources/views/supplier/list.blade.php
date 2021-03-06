@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-20">
            <div class="card">
                <div class="card-header"><h1 align="center">Suppliers</h1></div>
                <a href="suppliers/create" class="btn btn-primary" align="center">Add Supplier</a>

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
							<th>Code</th>
							<th>Title</th>
							<th>Address</th>
							<th>Contact</th>
							<th>Email</th>
							<th>Phone</th>
						</tr>
							
						</thead>
			<tbody>
				
				  @foreach($suppliers as $supplier)

                  			<tr>
                  			
							<td>{{$supplier->code}}</td>
							<td>{{$supplier->title}}</td>
							<td>{{$supplier->address}}</td>
							<td>{{$supplier->contact}}</td>
							<td>{{$supplier->email}}</td>
							<td>{{$supplier->phone}}</td>
							<td><a href="/suppliers/{{$supplier->id}}/edit" class="btn btn-green btn-sm" type=button> Edit </a></td>
							<td><a href="/suppliers/{{$supplier->id}}/delete" class="btn btn-danger btn-sm" type=button> Delete </a></td>
								
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