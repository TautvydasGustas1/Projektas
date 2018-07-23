<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order_Items extends Model
{
    protected $fillable = [

    	'order_id',
    	'sku',
    	'product_title',
    	'customer_id',
    	'customer_title',
    	'contact_info',
    	'price',
    	'qty',
    	'deadline',
    	'leadtime',
    	'item_status',
    	'notified',
    	'customer_status'
    ];

    public function order() {

    	return $this->belongsTo(Order::class); 
    }

    public function GetProductSku() {

    	return $this->belongsTo(Product::class); 
    }

    public function GetCustomerId() {

    	return $this->belongsTo(Customer::class); 
    }

    public static function GetLastOrderId() {
    	
    	if(Order_Items::first()) {

    	 return Order_Items::latest()->first()->order_id;	
    	}
    	else
    	{
    		return null;
    	}
    }


}
