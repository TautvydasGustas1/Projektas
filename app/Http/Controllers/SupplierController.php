<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Supplier;
use Illuminate\Support\Facades\Auth;


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
      
      $UserID = Auth::id();
   		Supplier::create(array_merge(request()->all(), ['modified_UserID' => $UserID]));
  
       return response()->json('Sekmingai pridėtas naujas įrašas!');
   	}

   	public function edit($id) {

   		$supplier = Supplier::FindOrFail($id);


   		 return $supplier->toJson();
   	}

   	public function update($id, Request $request) {
      $UserID = Auth::id();
   		$suppliers = Supplier::FindOrFail($id);

   		$this->validate(request(), [
   			'code' => 'required|unique:suppliers,code,'.$id,
            'title' => 'required',
            'email' => 'required|unique:suppliers,email,'.$id
   		]);

   		$suppliers->update(array_merge($request->all(), ['modified_UserID' => $UserID]));

		return response()->json('Sekmingai pataisytas įrašas');
   	}

   		public function delete($id) {
   			$supplier = Supplier::find($id);
        $supplier->delete();

           

        return response()->json('Supplier deleted');
    
   	}

      public function getReactSearch(Request $request)
    {

      $fields = explode(',', $request->fields);
        $temp = implode(",'|',", $fields);

        $DB = new Supplier;
        $searchQuery = '%' . $request->q . '%';
     
                $comp = $DB->select('*')
                ->whereRaw("CONCAT(".$temp.") like '$searchQuery'")->get();

        return $comp->toJson();

        /*$suppliers = Supplier::where('title', 'like', '%'.request()->q.'%')
        ->orWhere('code', 'like', '%'.request()->q . '%')->limit(30)->get();*/

       // return $comp->toJson();
    }

}
