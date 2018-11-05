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
        'supplier_id',
    	'address',
    	'phone',
    	'comments',
        'modified_UserID'

    ];
    
    public function GetSuppliersID() {

        return $this->belongsTo(Supplier::class, 'supplier_id'); 
    }
}