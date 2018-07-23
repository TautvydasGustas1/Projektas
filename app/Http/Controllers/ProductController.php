<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }
        public function index() {

        $products = Product::all();
        return view('product.list', compact('products'));
    }

    
    public function create() {

        return view('product.create');
    }

    
        public function save() {

        $this->validate(request(), [
            'sku' => 'required',
            'title' => 'required'
        ]);

        Product::create(request()->all());


        \Session::flash('flash_message', 'Product has been created succesfully!');
  
        return redirect('/products');
    }


    
        public function edit($id) {

        $product = Product::FindOrFail($id);


         return view('product.edit', compact('product'));
    }

    
    public function update($id, Request $request) {

        $products = Product::FindOrFail($id);

        $this->validate(request(), [
            'sku' => 'required',
            'title' => 'required'
        ]);
    \Session::flash('flash_message edit', 'Product has been edited succesfully!');

        $products->update($request->all());

        return redirect('/products');
    }


    public function delete($id) {
            $product = Product::FindOrFail($id);
            $product->delete();

            \Session::flash('flash_message delete', 'Product has been deleted succesfully!');

        return back();
    }
}
