<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ProductController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }
        public function index(Request $request) {


        $products = Product::limit(25)->skip($request->page)->get();

       
        return $products->toJson();
    }

    
    public function create() {

        return view('product.create');
    }

    
        public function save() {

        $this->validate(request(), [
            'sku' => 'required|unique:products,sku',
            'title' => 'required'
        ]);

        $UserID = Auth::id();
        Product::create(array_merge(request()->all(), ['modified_UserID' => $UserID]));

  
         return response()->json('Sekmingai pridėtas naujas įrašas!');
    }
    
        public function edit($id) {

        $product = Product::FindOrFail($id);
         return $product->toJson();
    }

    
    public function update($id, Request $request) {

        $UserID = Auth::id();
        $products = Product::FindOrFail($id);

        $this->validate(request(), [
            'sku' => 'required|unique:products,sku,'.$id,
            'title' => 'required'
        ]);

        $products->update(array_merge($request->all(), ['modified_UserID' => $UserID]));

        return response()->json('Sekmingai pataisytas įrašas');
    }


    public function delete($id) {
            $product = Product::find($id);
            $product->delete();

        return response()->json('Supplier deleted');
    }


    public function getReactSearch(Request $request)
    {
        $string = request()->q;
        $new_string = str_replace('+', '%2B', $string);

        $products = Product::where('title', 'like', '%' .request()->q.'%')
        ->orWhere('sku', 'like', '%'.request()->q. '%')->limit(30)->get();

        return $products->toJson();
    }
}