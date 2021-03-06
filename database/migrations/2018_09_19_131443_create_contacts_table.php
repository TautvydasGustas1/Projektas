<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name')->nullable(true);
            $table->string('last_name')->nullable(true);
            $table->string('title')->nullable(true);
            $table->string('address')->nullable(true);
            $table->string('email')->nullable(true);
            $table->integer('supplier_id')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->string('comments')->nullable(true);
            $table->string('modified_UserID');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
