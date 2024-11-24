<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\CollaborationRequestMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\File;

class MyEmailController extends Controller{

    public function sendCollaborationRequest($fileId,$senderId,$receiverEmail){
        logger("File ID: $fileId");
        logger("Sender ID: $senderId");
        logger("Receiver Email: $receiverEmail");

        // Get sender info (loggedin)
        $sender = User::find($senderId);
        $fileExist = File::find($fileId);

        if (!$fileExist) {
            logger("File not found: $fileId");
            return response()->json(['error' => 'file not found'], 404);
        }

        if (!$sender) {
            logger("Sender not found: $senderId");
            return response()->json(['error' => 'Sender not found'], 404);
        }

        
    
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
