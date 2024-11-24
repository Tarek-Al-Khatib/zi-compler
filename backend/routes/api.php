<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\MyEmailController;
use App\Http\Controllers\FileController;



Route::get('/collabs',[CollaborationController::class,"get_collaborations"]);
Route::post('/sendColabos', [MyEmailController::class, 'sendCollabo']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('/test', function(){
//     return new \App\Mail\MyEmail();
// });



// Route::get('/sendEmail,', [])



Route::middleware("auth")->get('/user', function (Request $request) {
  return $request->user();
});

// Route::middleware("auth")->get('/files', function (Request $request) {
//   return $request->get_files();
// });



Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'
], function ($router) {
  Route::post('login', [AuthController::class, "login"]);
  Route::post('register', [AuthController::class, "register"]);
  Route::post('logout', [AuthController::class, "logout"]);
  Route::post('refresh', [AuthController::class, "refresh"]);
  Route::post('me',[AuthController::class, "me"]);
  Route::get('/files', [FileController::class, 'get_files']);
  Route::post('/files1', [FileController::class, 'store']);
});
