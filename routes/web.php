<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Supplier
//--------------------------------
Route::get('/suppliers/{id}/edit', 'SupplierController@edit')->name('suppliers');
Route::get('/suppliers/{id}/delete', 'SupplierController@delete')->name('suppliers');
Route::patch('/suppliers/{id}', 'SupplierController@update')->name('suppliers');

Route::get('/suppliers', 'SupplierController@index')->name('suppliers');
Route::post('/suppliers', 'SupplierController@save')->name('suppliers');
Route::get('/suppliers/create', 'SupplierController@create')->name('suppliers');
//---------------------------------

// Customer
//----------------------------------
Route::get('/customers', 'CustomerController@index')->name('customers');
Route::post('/customers', 'CustomerController@save')->name('customers');
Route::get('/customers/create', 'CustomerController@create')->name('customers');


Route::get('/customers/{id}/edit', 'CustomerController@edit')->name('customers');
Route::get('/customers/{id}/delete', 'CustomerController@delete')->name('customers');
Route::patch('/customers/{id}', 'CustomerController@update')->name('customers');
//---------------------------------

//Product
//----------------------------------
Route::get('/products/{id}/edit', 'ProductController@edit')->name('products');
Route::get('/products/{id}/delete', 'ProductController@delete')->name('products');
Route::patch('/products/{id}', 'ProductController@update')->name('products');

Route::get('/products', 'ProductController@index')->name('products');
Route::post('/products', 'ProductController@save')->name('products');
Route::get('/products/create', 'ProductController@create')->name('products');
//---------------------------------


//Orders
//---------------------------------
Route::get('/orders/{id}/edit', 'OrderController@edit')->name('orders');
Route::get('/orders/{id}/delete', 'OrderController@delete')->name('orders');
Route::patch('/orders/{id}', 'OrderController@update')->name('orders');

Route::get('/orders', 'OrderController@index')->name('orders');
Route::post('/orders', 'OrderController@save')->name('orders');
Route::get('/orders/create', 'OrderController@create')->name('orders');
Route::get('/orders/api', 'OrderController@API');
//---------------------------------

//Order Items
//---------------------------------
Route::get('/order/{order}/items/{id}/edit', 'OrderItemsController@edit')->name('/order/{order}/items/{id}/edit');
Route::get('/order/{order}/items/{id}/delete', 'OrderItemsController@delete')->name('/order/{order}/items/{id}/delete');
Route::patch('/order/{order}/items/{id}', 'OrderItemsController@update')->name('/order/{order}/items/{id}/edit');

Route::get('/order/{order}/items', 'OrderItemsController@index')->name('order_items');
Route::post('/order/{order}/items', 'OrderItemsController@save')->name('order_items');
Route::get('/order/{order}/items/create', 'OrderItemsController@create')->name('order/{order}/items');
//---------------------------------

