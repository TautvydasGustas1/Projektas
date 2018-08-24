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

           

       $order_items = Order_Items::where('order_id', $order->id)->get();
       $order_item["items"] = $order_items;
       $order_item["order"] = $order;

        return json_encode($order_item);
      // return $order_items->toJson();

    }
    
    public function create(Customer $customers, Product $skus, Order $order) {

        

        return $order->toJson();
    }
    
   public function save(Order $order) {

        $this->validate(request(), [

            'order_id' => 'numeric',
            'customer_id' => 'numeric',
            'price' => 'numeric',
            'qty' => 'numeric'
        ]);
        
        $order_items = Order_Items::create(request()->all());
        
        return response()->json('Saved!');
    }

    
   public function edit(Order $order, $id) {

         $order_items = Order_Items::find($id);

         return $order_items->toJson();
    }

   
    public function update(Order $order, Order_Items $id, Request $request) {

        $this->validate(request(), [

            'order_id' => 'numeric',
            'customer_id' => 'numeric',
            'price' => 'numeric',
            'qty' => 'numeric'
        ]);

        $order_items = $id;
        $order_items->update($request->all());

        return response()->json('Succesfully updated!');
    }

    public function delete(Order $order, $id) {

            $order_items = Order_Items::find($id);
            $order_items->delete();         

        return response()->json('Order Item deleted');
    }

    public function API(Product $product)
    {
        $product = Product::where('sku', 'like', '%'.request()->sku.'%')->limit(10)->get();
        return response()->json($product);
    }

     public function CustomerAPI(Customer $customer)
    {
        $customer = Customer::where('last_name', 'like', '%'.request()->last_name.'%')->limit(10)->get();
        return response()->json($customer);
    }

    public function headerRequest()
    {
        $id = Order_Items::latest()->get()->first();


        return $id->toJson();
    }

}