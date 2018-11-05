<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [

    	'code',
    	'title',
    	'address',
    	'contact',
    	'email',
    	'phone',
        'modified_UserID'

    ];

    public function GiveSupplierID() {
  
    	return $this->hasMany(Order::class); 
    }

    public function GiveSupplierID_Contacts() {
  
        return $this->hasMany(Contact::class); 
    }
}
