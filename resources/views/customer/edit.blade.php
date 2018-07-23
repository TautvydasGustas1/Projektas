@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h1 align="center">Update customer</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/customers/{{$customer->id}}" enctype="multipart/form-data">
	                  	 <input type="hidden" name="_method" value="PATCH">
				        @csrf
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="code">First name</label>
				            <input type="text" class="form-control" name="first_name" value="{{$customer->first_name}}"> 
				          </div>
				        </div>

				        <div class="row">
				         <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="title">Last name</label>
				            <input type="text" class="form-control" name="last_name" value="{{$customer->last_name}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="address">Address</label>
				            <textarea class="form-control" name="address">{{$customer->address}}</textarea> 
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="contact">Email</label>
				            <input type="text" class="form-control" name="email" value="{{$customer->email}}">
				          </div>
				        </div>


				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="phone">Phone</label>
				            <input type="text" class="form-control" name="phone" value="{{$customer->phone}}">
				          </div>
				        </div>

							<div class="row">
			         				 <div class="form-group col-md-4" style="margin-top:60px">
			           				 <button type="submit" class="btn btn-success">Update</button>
			          				 </div>
			       			 </div>
			       			
				    	</form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection