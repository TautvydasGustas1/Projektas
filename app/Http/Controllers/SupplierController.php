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
         
   		return $suppliers->toJson();
   	}

   	public function create() {

   		return view('supplier.create');
   	}

   	public function save() {

   		$this->validate(request(), [
   			'code' => 'required|unique:suppliers,code',
   			'title' => 'required',
   			'email' => 'required|unique:suppliers,email'
   		]);

   		Supplier::create(request()->all());
  
   		 return response()->json('Saved!');
   	}

   	public function edit($id) {

   		$supplier = Supplier::FindOrFail($id);


   		 return $supplier->toJson();
   	}

   	public function update($id, Request $request) {

   		$suppliers = Supplier::FindOrFail($id);

   		$this->validate(request(), [
   			'code' => 'required|unique:suppliers,code,'.$id,
            'title' => 'required',
            'email' => 'required|unique:suppliers,email,'.$id
   		]);

   		\Session::flash('flash_message edit', 'Supplier has been edited succesfully!');

   		$suppliers->update($request->all());

		return response()->json('Updated!');
   	}

   		public function delete($id) {
   			$supplier = Supplier::find($id);
            $supplier->delete();

           

        return response()->json('Supplier deleted');
    
   	}


}
