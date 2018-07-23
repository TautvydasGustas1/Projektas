<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    protected $fillable = [

    	'order_no',
    	'status',
    	'supplier'
    ];

    public function GetSupplierID() {

    	return $this->belongsTo(Supplier::class); 
    }

    public function orderItems() {

    	return $this->hasMany(Order_Items::class); 
    }
}
