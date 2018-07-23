@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h1 align="center">Update Product</h1></div>
                <div class="card-body">
	                  <form method="POST" action="/products/{{$product->id}}" enctype="multipart/form-data">
	                  	 <input type="hidden" name="_method" value="PATCH">
				        @csrf
				       <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="sku">Sku</label>
				            <input type="text" class="form-control @if($errors->has('code')) is-invalid @endif" name="sku" value="{{$product->sku}}">
				          <div class="invalid-feedback">{{$errors->first('sku')}}</div>  
				          </div>
				        </div>
						

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="title">Title</label>
				            <input type="text" class="form-control  @if($errors->has('title')) is-invalid @endif" name="title" value="{{$product->title}}">
				            <div class="invalid-feedback">{{$errors->first('title')}}</div>
				          </div>
				        </div>

				     
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="cost">Cost</label>
				            <input type="text" class="form-control" name="cost" value="{{$product->cost}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="price">Price</label>
				            <input type="text" class="form-control" name="price" value="{{$product->price}}">
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="special_price">Special Price</label>
				            <input type="text" class="form-control" name="special_price" value="{{$product->special_price}}">
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