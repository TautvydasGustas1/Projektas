<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use App\Supplier;


class OrderController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }
    
    public function index(Supplier $supplier) {

        $orders = Order::all();
        $supplier = Supplier::all();
        $Supplier = Supplier::find($supplier);
        return view('order.list', compact('orders', 'supplier'));
    }

   
    public function create(Supplier $supplier) {


        $supplier = Supplier::all();

        //dd($supplier);

        return view('order.create', compact('supplier'));
    }

    
   public function save() {

        $this->validate(request(), [
            'order_no' => 'required'
            
        ]);

        Order::create(request()->all());

        \Session::flash('flash_message', 'Order has been created succesfully!');
  
        return redirect('/orders');
    }

    
   public function edit($id, Supplier $supplier) {

        $order = Order::FindOrFail($id);
         $supplier = Supplier::all();


         return view('order.edit', compact('order', 'supplier'));
    }

    
   public function update($id, Request $request) {

        $orders = Order::FindOrFail($id);

         $this->validate(request(), [
            'order_no' => 'required'
            
        ]);

        \Session::flash('flash_message edit', 'Order has been edited succesfully!');

        $orders->update($request->all());

        return redirect('/orders');
    }



   
    public function delete($id) {
            $order = Order::FindOrFail($id);
            $order->delete();

            \Session::flash('flash_message delete', 'Order has been deleted succesfully!');

        return back();
    }

    public function API(Supplier $supplier)
    {
        $supplier = Supplier::where('code', 'like', '%'.request()->title.'%')->limit(10)->get();
        return response()->json($supplier);
    }
}