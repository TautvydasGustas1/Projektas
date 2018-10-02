<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemsTable extends Migration
{
   
    public function up()
    {
        Schema::create('order__items', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('order_id')->nullable(true);
            $table->string('sku')->nullable(true);
            $table->string('product_title')->nullable(true);
            $table->Integer('customer_id')->nullable(true);
            $table->string('customer_title')->nullable(true);
            $table->string('contact_info')->nullable(true);
            $table->float('price')->nullable(true);
            $table->float('qty')->nullable(true);
            $table->date('deadline')->nullable(true);
            $table->date('leadtime')->nullable(true);
            $table->string('item_status')->nullable(true);
            $table->string('notified')->nullable(true);
            $table->string('customer_status')->nullable(true);
            $table->string('modified_UserID');

            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('order__items');
    }
}
