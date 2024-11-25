<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collaboration;

class CollaborationController extends Controller{
    function get_collaborations(){
        $collaborations = Collaboration::with(['user', 'file'])->get();
        return response()->json([
            "collaborations"=> $collaborations
        ]);
    }

     function accept($fileId, $userId){
    $collaboration = Collaboration::where('file_id', $fileId)
                                  ->where('user_id', $userId)
                                  ->first();                           

    if ($collaboration) {
        return redirect()->route('collaborations.success')
                             ->with('message', 'You have already accepted this collaboration!');
        }

        
        $collaboration = new Collaboration();
        $collaboration->file_id = $fileId;
        $collaboration->user_id = $userId;
        $collaboration->role = 'editor'; 
        $collaboration->status = 'accepted'; 
        $collaboration->save();

        return redirect()->route('collaborations.success')
                         ->with('message', 'You have successfully accepted the collaboration!');
    }
}
