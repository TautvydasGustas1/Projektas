@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"><h1>Create Customer</h1></div>
                <div class="card-body">
	                  <form method="POST" action="{{url('customers')}}" enctype="multipart/form-data">
				        @csrf
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				      

				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="last name">Last name</label>
				            <input type="text" class="form-control" name="last name">
				          </div>
				        </div>


				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="address">Address</label>
				            <textarea type="text" class="form-control" name="address"> </textarea>
				          </div>
				        </div>

				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="email">Email</label>
				            <input type="text" class="form-control" name="email">  </input> 
				          </div>
				        </div>
				        
				        <div class="row">
				          <div class="col-md-4"></div>
				          <div class="form-group col-md-4">
				            <label for="phone">Phone</label>
				            <input type="text" class="form-control" name="phone">
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
@endsection