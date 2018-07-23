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
   		return view('customer.list', compact('customers'));
   	}

   	public function create() {

   		return view('customer.create');
   	}

   	public function save() {

   		Customer::create(request()->all());



   		return redirect('/customers');
   	}

   	public function edit($id) {

   		$customer = Customer::FindOrFail($id);


   		 return view('customer.edit', compact('customer'));
   	}

   		public function update($id, Request $request) {

   		$customers = Customer::FindOrFail($id);

   		\Session::flash('flash_message edit', 'Customer has been edited succesfully!');

   		$customers->update($request->all());


		return redirect('/customers');
   	}

   	public function delete($id) {
   			$customer = Customer::FindOrFail($id);
   			$customer->delete();

   			\Session::flash('flash_message delete', 'Customer has been deleted succesfully!');

   		return back();
   	}

}
