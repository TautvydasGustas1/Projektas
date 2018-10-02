<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
     protected $fillable = [

    	'first_name',
    	'last_name',
    	'email',
    	'address',
    	'phone',
        'modified_UserID'

    ];


    public function GiveCustomerId() {

    	return $this->hasMany(Order_Items::class); 
    }
}
