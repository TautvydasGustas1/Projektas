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
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

/*Route::view('/ssuppliers/{path?}', 'layouts/app');*/

// Supplier
//--------------------------------
Route::get('/suppliers/{id}/edit', 'SupplierController@edit')->name('suppliers');
Route::delete('/suppliers/{id}/delete', 'SupplierController@delete')->name('suppliers');
Route::post('/suppliers/{id}', 'SupplierController@update')->name('suppliers');

Route::get('/suppliers', 'SupplierController@index')->name('suppliers');
Route::post('/suppliers', 'SupplierController@save')->name('suppliers');
Route::get('/suppliers/create', 'SupplierController@create')->name('suppliers');
Route::get('/suppliers/search', 'SupplierController@getReactSearch')->name('suppliers');
//---------------------------------

// Customer
//----------------------------------
Route::get('/customers', 'CustomerController@index')->name('customers');
Route::post('/customers', 'CustomerController@save')->name('customers');
Route::get('/customers/create', 'CustomerController@create')->name('customers');


Route::get('/customers/{id}/edit', 'CustomerController@edit')->name('customers');
Route::delete('/customers/{id}/delete', 'CustomerController@delete')->name('customers');
Route::post('/customers/{id}', 'CustomerController@update')->name('customers');
Route::get('/customers/search', 'CustomerController@getReactSearch')->name('customers');
//---------------------------------

//Contacts
//---------------------------------
Route::get('/contactsIndex','ContactController@index')->name('contacts');
Route::post('/contactsIndex','ContactController@save')->name('contacts');
Route::post('/contacts/{id}', 'ContactController@update')->name('contacts');
Route::get('/contacts/{id}/edit', 'ContactController@edit')->name('contacts');
Route::get('/contacts/search', 'ContactController@getReactSearch')->name('contacts');
Route::delete('/contacts/{id}/delete', 'ContactController@delete')->name('contacts');
Route::get('/contacts/api', 'ContactController@API');
//---------------------------------


//Product
//----------------------------------
Route::get('/products/{id}/edit', 'ProductController@edit')->name('products');
Route::delete('/products/{id}/delete', 'ProductController@delete')->name('products');
Route::post('/products/{id}', 'ProductController@update')->name('products');

Route::get('/products', 'ProductController@index')->name('products');
Route::post('/products', 'ProductController@save')->name('products');
Route::get('/products/create', 'ProductController@create')->name('products');
Route::get('/products/search', 'ProductController@getReactSearch')->name('products');
//---------------------------------


//Orders
//---------------------------------
Route::get('/orders/{id}/edit', 'OrderController@edit')->name('orders');
Route::delete('/orders/{id}/delete', 'OrderController@delete')->name('orders');
Route::post('/orders/{id}', 'OrderController@update')->name('orders');

Route::get('/orders', 'OrderController@index')->name('orders');
Route::post('/orders', 'OrderController@save')->name('orders');
Route::get('/orders/create', 'OrderController@create')->name('orders');
Route::get('/orders/api', 'OrderController@API');
Route::get('/orders/search', 'OrderController@getReactSearch')->name('orders');
//---------------------------------

//Order Items
//---------------------------------
Route::get('/order/{order}/items/{id}/edit', 'OrderItemsController@edit')->name('/order/{order}/items/{id}/edit');
Route::delete('/order/{order}/items/{id}/delete', 'OrderItemsController@delete')->name('/order/{order}/items/{id}/delete');
Route::post('/order/{order}/items/{id}', 'OrderItemsController@update')->name('/order/{order}/items/{id}/edit');

Route::get('/order/{order}/items', 'OrderItemsController@index')->name('order_items');
Route::post('/order/{order}/items', 'OrderItemsController@save')->name('order_items');
Route::get('/order/{order}/items/create', 'OrderItemsController@create')->name('order/{order}/items');
Route::get('/orders/{order}/api', 'OrderItemsController@API');
Route::get('/orders/{order}/CustomerApi', 'OrderItemsController@CustomerAPI');
Route::get('headerRequest', 'OrderItemsController@headerRequest');
Route::get('/order/{order}/search', 'OrderItemsController@getReactSearch')->name('order_items');
//---------------------------------

//Admin View
//---------------------------------
Route::get('/admin/users/not_confirmed', 'UserRolesController@UsersNotConfirmed');
Route::delete('/admin/users/{id}/reject', 'UserRolesController@UserReject');
Route::post('/admin/users/{id}/accept', 'UserRolesController@UserAccept');
Route::get('/admin/users/role', 'UserRolesController@UserRole');
Route::get('/admin/users/info', 'UserRolesController@UsersInfo');
Route::post('/admin/users/{id}/change_role', 'UserRolesController@ChangeRole');
//---------------------------------


Route::view('/oorders/{path?}', 'layouts/app');
Route::view('/contacts/{path?}', 'layouts/app');
Route::view('/ssuppliers/{path?}', 'layouts/app');
Route::view('/pproducts/{path?}', 'layouts/app');
Route::view('/ccustomers/{path?}', 'layouts/app');
Route::view('/oorder/{order}/items/{path?}', 'layouts/app');
Route::view('/admin/{path?}', 'layouts/app');
