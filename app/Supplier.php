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

    public function GetContactID() {

        return $this->belongsTo(Contact::class); 
    }
}
