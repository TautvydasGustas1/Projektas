<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller
{

    	public function __construct() {
   		$this->middleware('auth');
   	}


   	public function index() {

   		$customers = Customer::all();
   		return $customers->toJson();
   	}

   	public function create() {

   		return view('customer.create');
   	}

   	public function save() {

   		Customer::create(request()->all());



   		 return response()->json('Saved!');
   	}

   	public function edit($id) {

   		$customer = Customer::FindOrFail($id);


   		 return $customer->toJson();
   	}

   		public function update($id, Request $request) {

   		$customers = Customer::FindOrFail($id);

   		\Session::flash('flash_message edit', 'Customer has been edited succesfully!');

   		$customers->update($request->all());


		return response()->json('Updated!');
   	}

   	public function delete($id) {
   			$customer = Customer::find($id);
            $customer->delete();


   		return response()->json('Customer deleted');
   	}

}
