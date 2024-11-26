<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\CollaborationRequestMail;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\File;

class MyEmailController extends Controller{

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

        // $creatorId = Collaboration::where('file_id', $fileId)->value('creator_id');

        // if (!$creatorId) {
        //     return response()->json(['error' => 'Creator not found for the specified file'], 404);
        // }

        $file = File::find($fileId);

    if (!$file) {
        return response()->json(['error' => 'File not found'], 404);
    }

    $creatorId = $file->user_id;

        $acceptUrl = route('collaborations.accept', ['fileId' => $fileId, 'userId' => $receiverId, 'creatorId' => $creatorId]);

        Mail::to($receiverEmail)
            ->send(new CollaborationRequestMail($senderName, $acceptUrl));

        return response()->json(['message' => 'Collaboration email sent successfully!'], 200);
    }

}