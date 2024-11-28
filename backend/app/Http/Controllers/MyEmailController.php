<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\CollaborationRequestMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\File;
use App\Models\CollaborationRole;

class MyEmailController extends Controller{


    function get_PendingName(){
        $files = File::where('user_id', auth()->id())->get();

        return response()->json([
            "files"=> $files
        ]);
    }
   
    public function sendCollabo(Request $request)
    {
        $validated = $request->validate([
            
            'fileId' => 'required|integer',
            'senderName' => 'required|string',
            'receiverEmail' => 'required|email',
            'receiverId' => 'required|integer',
            
        ]);

        $fileId = $validated['fileId'];
        $senderName = $validated['senderName'];
        $receiverEmail = $validated['receiverEmail'];
        $receiverId = $validated['receiverId'];
       

        $file = File::find($fileId);

    if (!$file) {
        return response()->json(['error' => 'File not found'], 404);
    }

    $creatorId = auth()->id();


    $collaboration = CollaborationRole::create([
        'file_id' => $fileId,
        'user_id' => $receiverId,
        'creator_id' => $creatorId,
        'role' => 'viewer',
        'status' => 'pending',
        'name' => 'name'
    ]);

        $acceptUrl = route('collaborations.accept', ['fileId' => $fileId, 'userId' => $receiverId, 'creatorId' => $creatorId]);

        Mail::to($receiverEmail)
            ->send(new CollaborationRequestMail($senderName, $acceptUrl));

        return response()->json(['message' => 'Collaboration email sent successfully!'], 200);
    }

}