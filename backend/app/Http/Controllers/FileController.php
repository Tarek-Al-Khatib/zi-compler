<?php

namespace App\Http\Controllers;

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
        
        $request->validate([
            'name' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

       
        $file = File::create([
            'user_id' => auth()->id(), 
            'name' => $request->name,
            'language' => $request->language,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'File created successfully!',
            'file' => $file
        ], 201);
    }
}

