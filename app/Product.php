<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
   protected $fillable = [

    	'sku',
    	'title',
    	'cost',
    	'price',
    	'special_price',
        'modified_UserID'

    ];

    public function GiveProductSku() {

    	return $this->hasMany(Order_Items::class); 
    }
}
