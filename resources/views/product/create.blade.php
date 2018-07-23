@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header" align="center"><h1>Create Product</h1></div>
                <div class="card-body">
	                  <form method="post" action="{{url('products')}}" enctype="multipart/form-data">
				        @csrf
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				          	
				            <label for="sku">Sku</label>
				            <input type="text" class="form-control @if($errors->has('sku')) is-invalid @endif" name="sku">
				          <div class="invalid-feedback">{{$errors->first('sku')}}</div>  
				          </div>
				        </div>
						

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="title">Title</label>
				            <input type="text" class="form-control  @if($errors->has('title')) is-invalid @endif" name="title">
				            <div class="invalid-feedback">{{$errors->first('title')}}</div>
				          </div>
				        </div>

				     
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="cost">Cost</label>
				            <input type="text" class="form-control" name="cost">
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
				            <label for="special_price">Special Price</label>
				            <input type="text" class="form-control" name="special_price">
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