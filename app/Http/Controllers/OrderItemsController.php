<?php

namespace App\Http\Controllers;

use App\Order_Items;
use Illuminate\Http\Request;
use App\Order;
use App\Customer;
use App\Product;
use Illuminate\Support\Facades\Auth;


class OrderItemsController extends Controller
{

     public function __construct() {
        $this->middleware('auth');
    }
    
    public function index(Order $order, Request $request) {


       $order_item = Order_Items::where('order_id', $order->id)->limit(25)->skip($request->page)->get();
       $order_no = Order::where('id', $order->id)->get();

       $data['order_item'] = $order_item;
       $data['order_no'] = $order_no;

        return json_encode($data);
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

         $UserID = Auth::id();
        
        $order_items = Order_Items::create(array_merge(request()->all(), ['modified_UserID' => $UserID]));
        
         return response()->json('Sekmingai pridėtas naujas įrašas!');
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
         $UserID = Auth::id();
         
        $order_items = $id;
        
        $order_items->update(array_merge($request->all(), ['modified_UserID' => $UserID]));

        return response()->json('Sekmingai pataisytas įrašas');
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
        $customer = Customer::where('last_name', 'like', '%'.request()->last_name.'%')
        ->orWhere('first_name', 'like', '%'.request()->last_name.'%')->limit(10)->get();
        return response()->json($customer);
    }

    public function headerRequest()
    {
        $id = Order_Items::latest()->get()->first();


        return json_encode($id);
    }

    public function getReactSearch(Request $request, $id)
    {
       // $order_items = Order_Items::where('order_id', $id)->get();

        $fields = explode(',', $request->fields);
        $temp = implode(",'|',", $fields);

        $DB = new Order_Items;
        $searchQuery = '%' . $request->q . '%';
        //$comp = Order_Items::where('order_id', $id)->get();     
        $comp = $DB->select('*')
        ->whereRaw("CONCAT(".$temp.") like '$searchQuery'")->where('order_id', $id)->get();

       // $comp->GetSuppliersID;
        return $comp->toJson();
    }

}