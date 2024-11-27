<?php

namespace App\Http\Controllers;
use App\Events\FileContentUpdated;
use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller{

    function get_files(){
        $filess = File::all();

        return response()->json([
            "files"=> $filess
        ]);
    }


    public function store(Request $request)
    {
        
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

       
        $file = File::create([
            'name' => $validated['name'],
            'language' => $validated['language'],
            'content' => $validated['content'],
            'user_id' => auth()->id(), 
        ]);

        return response()->json([
            'message' => 'File created successfully!',
            'file' => $file
        ], 201);
    }


    public function update(Request $request)
    {
        $file = File::findOrFail($request->fileId);
        $file->content = $request->content;
        $file->save();

        broadcast(new FileContentUpdated(
            $file->id,
            $file->content,
            $request->cursorPosition,
            $request->userId
        ))->toOthers();

        return response()->json(['status' => 'success']);
    }
}

