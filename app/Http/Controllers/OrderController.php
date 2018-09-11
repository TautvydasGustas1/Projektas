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
    
    public function index(Request $request) {

        $orders = Order::limit(25)->skip($request->page)->get();

      
       
        return $orders->toJson();
    }

   
    public function create(Supplier $supplier) {


        $supplier = Supplier::all();

        return view('order.create', compact('supplier'));
    }

    
   public function save() {

        $this->validate(request(), [

            'order_no' => 'required',
            'order_no' => 'required|unique:orders,order_no'
        ]);

        Order::create(request()->all());

  
        return response()->json('Saved!');
    }

    
   public function edit($id, Supplier $supplier) {

        $order = Order::FindOrFail($id);
        $supplier = Supplier::all();


       return $order->toJson();
    }

    
   public function update($id, Request $request) {

        $orders = Order::FindOrFail($id);

         $this->validate(request(), [
            'order_no' => 'required|unique:orders,order_no,'.$id
            
        ]);

        \Session::flash('flash_message edit', 'Order has been edited succesfully!');

        $orders->update($request->all());

       return response()->json('Updated!');
    }


    public function delete($id) {

            $order = Order::find($id);
            $order->delete();

           

        return response()->json('Order deleted');
    }

    public function API(Supplier $supplier)
    {
        $supplier = Supplier::where('code', 'like', '%'.request()->title.'%')->limit(10)->get();
        return response()->json($supplier);
    }

      public function getReactSearch(Request $request)
    {

        $order = Order::where('order_no', 'like', '%'.request()->q.'%')
        ->orWhere('supplier', 'like', '%'.request()->q . '%')->limit(30)->get();

        return $order->toJson();
    }
}