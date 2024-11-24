<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\MyEmail;

class MyEmailController extends Controller{

    public function sendCollaborationRequest($fileId, $receiverEmail)
    {
        // Get sender info (loggedin)
        $sender = auth()->user();
    
        // receiverinfo
        $receiver = User::where('email', $receiverEmail)->first();
    
        if (!$receiver) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Create a URL for the collaboration request page 
        $url = route('collaborations.accept', ['fileId' => $fileId, 'userId' => $receiver->id]);
    
        // Send email
        Mail::to($receiver->email)->send(new CollaborationRequestMail($sender->name, $url));
    
        return response()->json(['message' => 'Collaboration request sent successfully']);
    }
}
