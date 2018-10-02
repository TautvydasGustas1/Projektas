<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{

    	public function __construct() {
   		$this->middleware('auth');
   	}


   	public function index(Request $request) {

   		$customers = Customer::limit(25)->skip($request->page)->get();
   		return $customers->toJson();
   	}

   	public function create() {

   		return view('customer.create');
   	}

   	public function save() {

      $UserID = Auth::id();

   		Customer::create(array_merge(request()->all(), ['modified_UserID' => $UserID]));



   		 return response()->json('Sekmingai pridėtas naujas įrašas!');
   	}

   	public function edit($id) {

   		$customer = Customer::FindOrFail($id);


   		 return $customer->toJson();
   	}

   		public function update($id, Request $request) {
      
      $UserID = Auth::id();
   		$customers = Customer::FindOrFail($id);

   		$customers->update(array_merge($request->all(), ['modified_UserID' => $UserID]));


		return response()->json('Sekmingai pataisytas įrašas');
   	}

   	public function delete($id) {
   			$customer = Customer::find($id);
            $customer->delete();


   		return response()->json('Customer deleted');
   	}

       public function getReactSearch(Request $request)
    {

        $customer = Customer::where('last_name', 'like', '%'.request()->q.'%')
        ->orWhere('first_name', 'like', '%'.request()->q . '%')->limit(30)->get();

        return $customer->toJson();
    }

}
