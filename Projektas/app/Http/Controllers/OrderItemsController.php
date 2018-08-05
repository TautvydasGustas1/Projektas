<?php

namespace App\Http\Controllers;

use App\Order_Items;
use Illuminate\Http\Request;
use App\Order;
use App\Customer;
use App\Product;

class OrderItemsController extends Controller
{

     public function __construct() {
        $this->middleware('auth');
    }
    
    public function index(Order $order) {

        $order_items = $order->orderItems;

        return $order_items->toJson();

    }
    
    public function create(Customer $customers, Product $skus, Order $order) {

        $customers = Customer::all();
        $skus = Product::all();
    

        return view('order_items.create', compact('customers', 'skus', 'order'));
    }
    
   public function save(Order $order) {

        
        $order_items = Order_Items::create(request()->all());
        \Session::flash('flash_message', 'Order item has been created succesfully!');
        return redirect("/order/$order->id/items");
    }

    
   public function edit(Order $order, Order_Items $id, Customer $customers, Product $skus) {


        $order_items = $id;
        $orders = Order::all();
        $customers = Customer::all();
        $skus = Product::all();


         return view('order_items.edit', compact('order_items', 'orders', 'customers', 'skus'));
    }

   
    public function update(Order $order, Order_Items $id, Request $request) {
        $order_items = $id;

        \Session::flash('flash_message edit', 'Order item has been edited succesfully!');

        $order_items->update($request->all());

        return redirect("/order/$order_items->order_id/items");
    }

    public function delete(Order $order, Order_Items $id) {

            $order_items = $id;
            $order_items->delete();

            \Session::flash('flash_message delete', 'Order item has been deleted succesfully!');

        return back();
    }

    public function API(Product $product)
    {
        $product = Product::where('sku', 'like', '%'.request()->sku.'%')->limit(10)->get();
        return response()->json($product);
    }

}