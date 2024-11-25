<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
// use Illuminate\Support\Facades\Auth;

class FileController extends Controller{

    function get_files(){
        $filess = File::all();

        return response()->json([
            "files"=> $filess
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
}

