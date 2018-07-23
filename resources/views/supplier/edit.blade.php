@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h1 align="center">Update supplier</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/suppliers/{{$supplier->id}}" enctype="multipart/form-data">
	                  	 <input type="hidden" name="_method" value="PATCH">
				        @csrf
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="code">Code</label>
				            <input type="text" class="form-control @if($errors->has('code')) is-invalid @endif" name="code" value="{{$supplier->code}}">
				            <div class="invalid-feedback">{{$errors->first('code')}}</div>  
				          </div>
				        </div>

				        <div class="row">
				         <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="title">Title</label>
				            <input type="text" class="form-control @if($errors->has('title')) is-invalid @endif" name="title" value="{{$supplier->title}}">
				            <div class="invalid-feedback">{{$errors->first('title')}}</div> 
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="address">Address</label>
				            <textarea class="form-control" name="address">{{$supplier->address}}</textarea> 
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="contact">Contact</label>
				            <input type="text" class="form-control" name="contact" value="{{$supplier->contact}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="email">Email</label>
				            <input type="text" class="form-control @if($errors->has('email')) is-invalid @endif" name="email" value="{{$supplier->email}}">
				            <div class="invalid-feedback">{{$errors->first('email')}}</div> 
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="phone">Phone</label>
				            <input type="text" class="form-control" name="phone" value="{{$supplier->phone}}">
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