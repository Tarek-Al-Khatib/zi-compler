<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\File;

class FileController extends Controller{
  

    function get_files(){
        $filess = File::all();

        return response()->json([
            "files"=> $filess
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
}

