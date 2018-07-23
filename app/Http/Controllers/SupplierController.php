<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Supplier;

class SupplierController extends Controller
{
   	public function __construct() {
   		$this->middleware('auth');
   	}


   	public function index() {

   		$suppliers = Supplier::all();
   		return view('supplier.list', compact('suppliers'));
   	}

   	public function create() {

   		return view('supplier.create');
   	}

   	public function save() {

   		$this->validate(request(), [
   			'code' => 'required',
   			'title' => 'required',
   			'email' => 'required'
   		]);

   		Supplier::create(request()->all());

   		\Session::flash('flash_message', 'Supplier has been created succesfully!');
  
   		return redirect('/suppliers');
   	}

   	public function edit($id) {

   		$supplier = Supplier::FindOrFail($id);


   		 return view('supplier.edit', compact('supplier'));
   	}

   	public function update($id, Request $request) {

   		$suppliers = Supplier::FindOrFail($id);

   		$this->validate(request(), [
   			'code' => 'required',
   			'title' => 'required',
   			'email' => 'required'
   		]);

   		\Session::flash('flash_message edit', 'Supplier has been edited succesfully!');

   		$suppliers->update($request->all());

		return redirect('/suppliers');
   	}

   		public function delete($id) {
   			$supplier = Supplier::FindOrFail($id);
   			$supplier->delete();

   			\Session::flash('flash_message delete', 'Supplier has been deleted succesfully!');

   		return back();
   	}


}
