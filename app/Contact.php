<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
    	'title',
    	'first_name',
    	'last_name',
    	'email',
    	'address',
    	'phone',
    	'comments',
        'modified_UserID'

    ];

    public function GiveContactID() {
  
    	return $this->hasMany(Supplier::class); 
    }
    
}
