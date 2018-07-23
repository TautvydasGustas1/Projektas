@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-20">
            <div class="card">
                <div class="card-header" align="center"><h1>Customers</h1></div>
                 <a href="customers/create" class="btn btn-primary" align="center">Add Customer</a>
                <div class="card-body">
						
					<table class="table"> 
						<thead>
						<tr>
							<th>First name</th>
							<th>Last name</th>
							<th>Email</th>
							<th>Address</th>
							<th>Phone</th>
						</tr>
							
						</thead>
			<tbody>
				
				  @foreach($customers as $customer)

                  			<tr>
                  			
							<td>{{$customer->first_name}}</td>
							<td>{{$customer->last_name}}</td>
							<td>{{$customer->email}}</td>
							<td>{{$customer->address}}</td>
							<td>{{$customer->phone}}</td>
							<td><a href="/customers/{{$customer->id}}/edit" class="btn btn-green btn-sm" type=button> Edit </a></td>
							<td><a href="/customers/{{$customer->id}}/delete" class="btn btn-danger btn-sm" type=button> Delete </a></td>
								
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