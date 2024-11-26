<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller{

    function get_files(){
        $files = File::where('user_id', auth()->id())->get();

        return response()->json([
            "files"=> $files
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
    
    public function update_content($id, Request $request)
    {  
        
        $file = File::find($id)->update([
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => 'File updated successfully!',
        ], 201);
    }

}

