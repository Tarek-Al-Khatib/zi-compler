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

    public function getPendingCollaborations(Request $request)
{
    $userId = auth()->id(); 

    $pendingCollaborations = CollaborationRole::where('user_id', $userId)
                                              ->where('status', 'pending')
                                              ->get();

    return response()->json([
        'pendingCollaborations' => $pendingCollaborations,
    ]);
}

// public function getUserCollaborations()
// {
//     $userId = auth()->id(); 

//     $collaborations = CollaborationRole::with(['file', 'user'])
//         ->where('user_id', $userId)
//         ->where('status', 'accepted') 
//         ->get();

//     return response()->json([
//         'collaborations' => $collaborations,
//     ]);
// }


public function getUserCollaborations()
{
    $userId = auth()->id(); 

    $collaborations = CollaborationRole::with(['file', 'user'])
        ->whereHas('file', function ($query) use ($userId) {
            $query->where('creator_id', $userId);
        })
        ->where('status', 'accepted') 
        ->get();

    return response()->json([
        'collaborations' => $collaborations,
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
    
    
    public function accept($fileId, $userId)
    {
        try {
            // Find the collaboration record in the collaboration_roles table
            $collaboration = CollaborationRole::where('file_id', $fileId)
                ->where('user_id', $userId)
                ->where('status', 'pending') // Ensure only pending invitations are accepted
                ->first();
    
            // Check if collaboration exists
            if (!$collaboration) {
                return response()->json(['error' => 'Collaboration not found or already accepted'], 404);
            }
    
            // Update the status to accepted
            $collaboration->update([
                'status' => 'accepted',
            ]);
    
            return response()->json([
                'message' => 'Collaboration accepted successfully',
                'collaboration' => $collaboration,
            ]);
        } catch (\Exception $e) {
            // Log and return any exception
            \Log::error('Error accepting collaboration: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong. Please check the server logs.'], 500);
        }
    }
    
}
