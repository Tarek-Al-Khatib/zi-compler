<?php

namespace App\Http\Controllers;
use App\Events\FileContentUpdated;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\File;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller{
  

    function get_files(){
        $files = File::where('user_id', auth()->id())->get();

        return response()->json([
            "files"=> $files
        ]);
    }
        public function get_filesId(){
            $userId = auth()->id();

            $files = File::with('user')  
                ->where('user_id', $userId) 
                ->get();
    
            return response()->json([
                "files" => $files
            ]);
        }

    public function store(Request $request)
    {  
        
        $file = File::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'language' =>$request->language,
            'content' =>""
        ]);

        return response()->json([
            'message' => 'File created successfully!',
            'file' => $file
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $file = File::findOrFail($id);
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

