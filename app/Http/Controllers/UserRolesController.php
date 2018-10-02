<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserRolesController extends Controller
{
	
	public function __construct() {
   		$this->middleware('auth');
   	}

	public function UsersNotConfirmed(Request $request)
	{
	 	$data = User::where('confirmed', 0)->get();
	 	return $data;
	}
	public function UsersInfo(Request $request)
	{
	 	$data = User::where('confirmed', 1)->get();
	 	return $data;
	}

	public function UserReject($id)
	{
	 	$user = User::find($id);
        $user->delete();

        return response()->json('User Rejected!');
	}

	public function UserAccept($id)
	{
	 	$user = User::FindOrFail($id);
	 	$user->update(['confirmed' => 1]);

        return response()->json('User Accepted!');
	}
	public function UserRole()
	{
		return Auth::user()->role;
	}
	public function ChangeRole($id, Request $request)
	{
		$role = $request->all();

		$user = User::FindOrFail($id);

		$user->update(['role' => $role['role']]);

		$data = User::where('confirmed', 1)->get();

		return $data;
	}
}