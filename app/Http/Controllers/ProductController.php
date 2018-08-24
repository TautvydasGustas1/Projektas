<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }
        public function index(Request $request) {


        $products = Product::limit(25)->skip(25+$request->page)->get();

        
        return $products->toJson();
    }

    
    public function create() {

        return view('product.create');
    }

    
        public function save() {

        $this->validate(request(), [
            'sku' => 'required|unique:products,sku'
        ]);

        Product::create(request()->all());


  
         return response()->json('Saved!');
    }


    
        public function edit($id) {

        $product = Product::FindOrFail($id);


         return $product->toJson();
    }

    
    public function update($id, Request $request) {

        $products = Product::FindOrFail($id);

        $this->validate(request(), [
            'sku' => 'required|unique:products,sku,'.$id
        ]);

        $products->update($request->all());

        return response()->json('Updated!');
    }


    public function delete($id) {
            $product = Product::find($id);
            $product->delete();



        return response()->json('Supplier deleted');
    }
}
