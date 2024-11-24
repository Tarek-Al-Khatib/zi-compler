<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\MyEmailController;
use App\Http\Controllers\FileController;



Route::get('/collabs',[CollaborationController::class,"get_collaborations"]);
Route::post('/sendColabos', [MyEmailController::class, 'sendCollabo']);
Route::get('/files', [FileController::class, 'get_files']);


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('/test', function(){
//     return new \App\Mail\MyEmail();
// });



// Route::get('/sendEmail,', [])