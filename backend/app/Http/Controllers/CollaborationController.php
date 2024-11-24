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


    public function acceptCollaboration($fileId, $userId)
{
    $collaboration = Collaboration::where('file_id', $fileId)
                                  ->where('user_id', $userId)
                                  ->first();

    if (!$collaboration) {
        return response()->json(['message' => 'Collaboration request not found'], 404);
    }

    $collaboration->status = 'accepted';
    $collaboration->save();

    return response()->json(['message' => 'Collaboration accepted successfully']);
}



}
