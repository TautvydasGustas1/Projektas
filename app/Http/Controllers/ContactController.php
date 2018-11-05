<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Supplier;
use App\DB;

class ContactController extends Controller
{
    

    public function index(Request $request, Supplier $supplier)
    {
       // $supplier_id = Contact::all('supplier');
        //dd($supplier_id);
       // $supplier->find($supplier_id)->code;
      //  dd($supplier->find(2)->code);
      // Supplier::with('GiveSupplierID_Contacts')->get();
      // dd($supplier->with('GiveSupplierID_Contacts')->where('title')->get());

        //dd($supplier->all('code'));
        $contacts = Contact::with('GetSuppliersID')->limit(25)->skip($request->page)->get();
       // dd($contacts);
        //dd(Contact::with('GetSuppliersID')->first());
        //$contacts = Contact::all('first_name', 'last_name', 'title', 'address', 'email', 'phone', 'comments');

        return $contacts->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save()
    {
        $UserID = Auth::id();
        Contact::create(array_merge(request()->all(), ['modified_UserID' => $UserID]));

         return response()->json('Sekmingai pridėtas naujas įrašas!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {   
        $contact = Contact::FindOrFail($id);

         return $contact->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $contact = Contact::FindOrFail($id);
        $UserID = Auth::id();

        $contact->update(array_merge($request->all(), ['modified_UserID' => $UserID]));


        return response()->json('Sekmingai pataisytas įrašas');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $contact = Contact::find($id);
        $contact->delete();


        return response()->json('Contact deleted');
    }

    public function getReactSearch(Request $request)
    {

        $fields = explode(',', $request->fields);
        $temp = implode(",'|',", $fields);

        $DB = new Contact;
        $searchQuery = '%' . $request->q . '%';
     
                $comp = $DB->select('*')
                ->whereRaw("CONCAT(".$temp.") like '$searchQuery'")->with('GetSuppliersID')->get();

        return $comp->toJson();
    }

     public function API(Supplier $supplier)
    {
        $supplier = Supplier::where('code', 'like', '%'.request()->code.'%')
        ->orWhere('title', 'like', '%'.request()->code.'%')->limit(10)->get();
        return response()->json($supplier);
    }
}

