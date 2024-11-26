<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collaboration;
use App\Models\User;
use App\Models\File;

class CollaborationController extends Controller{
    function get_collaborations(){

        $userId = auth()->id();
        $collaborations = Collaboration::with(['user', 'file'])
        ->where('creator_id', $userId) 
        ->get();

        
        return response()->json([
            "collaborations"=> $collaborations
        ]);
    }




     function accept($fileId, $userId){

        $file = File::find($fileId);

        $creatorId = $file->user_id;
        
    $collaboration = Collaboration::where('file_id', $fileId)
                                  ->where('user_id', $userId)
                                  ->first();                           

    if ($collaboration) {
        return redirect()->route('collaborations.success')
                             ->with('message', 'You have already accepted this collaboration!');
        }

        $creatorId = Collaboration::where('file_id', $fileId)->value('creator_id');

        // if (!$creatorId) {
        //     return redirect()->route('collaborations.error')
        //         ->with('error', 'Creator not found for the specified file!');
        // }

        
        $collaboration = new Collaboration();
        $collaboration->file_id = $fileId;
        $collaboration->user_id = $userId;
        $collaboration->creator_id = $file->user_id;
        $collaboration->role = 'editor'; 
        $collaboration->status = 'accepted'; 
        $collaboration->save();

        return redirect()->route('collaborations.success')
                         ->with('message', 'You have successfully accepted the collaboration!');
    }
}
