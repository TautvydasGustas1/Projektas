<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Supplier;

class SupplierController extends Controller
{
   	public function __construct() {
   		$this->middleware('auth');
   	}


   	public function index(Request $request) {

   		$supplier = Supplier::limit(25)->skip($request->page)->get();

      
       
        return $supplier->toJson();
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

      public function getReactSearch(Request $request)
    {

        $suppliers = Supplier::where('title', 'like', '%'.request()->q.'%')
        ->orWhere('code', 'like', '%'.request()->q . '%')->limit(30)->get();

        return $suppliers->toJson();
    }


}
