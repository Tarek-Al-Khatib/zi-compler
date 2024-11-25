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
        
       $validated = $request->validate([
            'name' => 'required|string|max:255',
            'language' => 'required|string|max:255',
        ]);

       
        $file = File::create([
            'name' => $validated['name'],
            'language' => $validated['language'],
            'user_id' => auth()->id(), 
        ]);

        return response()->json([
            'message' => 'File created successfully!',
            'file' => $file
        ], 201);
    }
}

