<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collaboration;

class CollaborationController extends Controller{
    function get_collaborations(){
        $collaborations = Collaboration::all();

        return response()->json([
            "collaborations: "=> $collaborations
        ]);
    }



}
