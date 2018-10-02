<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    

    public function index(Request $request)
    {
        $contacts = Contact::limit(25)->skip($request->page)->get();
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

        $contact = Contact::where('last_name', 'like', '%'.request()->q.'%')
        ->orWhere('first_name', 'like', '%'.request()->q . '%')
        ->orWhere('title', 'like', '%'.request()->q . '%')->limit(30)->get();

        return $contact->toJson();
    }
}

