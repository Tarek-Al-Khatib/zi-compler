<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collaboration;
use App\Models\CollaborationRole;
use App\Models\User;
use App\Models\File;

class CollaborationController extends Controller{
    function get_collaborations(){

        $userId = auth()->id();
        $collaborations = CollaborationRole::with(['user', 'file'])
        ->where('creator_id', $userId) 
        ->get();

        
        return response()->json([
            "collaborations"=> $collaborations
        ]);
    }



    public function updateRoleInCollaboration(Request $request, $fileId, $userId){
        try {
            $request->validate([
                'role' => 'required|in:editor,viewer',
            ]);
            $creatorId = auth()->id();

            $collaboration = CollaborationRole::where('file_id', $fileId)
                ->where('user_id', $userId)
                ->where('creator_id', $creatorId)
                ->first();

            if (!$collaboration) {
                return response()->json(['error' => 'Collaboration not found or you are not the creator'], 404);
            }

            $collaboration->update([
                'role' => $request->role,
            ]);
    
            return response()->json([
                'message' => 'Role updated successfully',
                'collaboration' => $collaboration,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong. Please check the server logs.',
            ], 500);
        }
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

        
        $collaborationRole = new CollaborationRole();
        $collaborationRole->file_id = $fileId;
        $collaborationRole->user_id = $userId;
        $collaborationRole->creator_id = $creatorId;
        $collaborationRole->role = 'editor'; 
        $collaborationRole->status = 'accepted';
        // dd($creatorId, $fileId, $userId);
 
        $collaborationRole->save();

        return redirect()->route('collaborations.success')
                         ->with('message', 'You have successfully accepted the collaboration!');
    }
}
