<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller{

    function get_files(){
        $filess = File::all();

        return response()->json([
            "files: "=> $filess
        ]);
    }

}
