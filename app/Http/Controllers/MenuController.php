<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order_Items;

class MenuController extends Controller
{
   
   public function index(Order_Items $OrderID)
   {
   	    $orderID = Order_Items::all();
        $orderid=$OrderID->GetLastOrderId();
        dd($orderid->order_id);
        return view(compact('order_id'));
   }
}
