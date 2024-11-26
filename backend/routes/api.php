<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\MyEmailController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OpenAIController;

Route::middleware("auth")->get('/user', function (Request $request) {
  return $request->user();
});

Route::middleware(['auth:api'])->group(function () {
  Route::patch('/collaborations/accept/{fileId}/{userId}', [CollaborationController::class, 'accept'])
      ->name('collaborations.accept');
  Route::get('/user/collaborators', [CollaborationController::class, 'getUserCollaborators']);
  Route::get('/user/collaborations', [CollaborationController::class, 'getUserCollaborations']);
});


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
  Route::get('/files1', [FileController::class, 'get_filesId']);
  Route::post('/files2', [FileController::class, 'store']);
  Route::get('users', [UserController::class, 'getUsers']);
  Route::get('/collabs',[CollaborationController::class,"get_collaborations"]);
  Route::get('/collabsPending',[CollaborationController::class,"getPendingCollaborations"]);
  Route::patch('collaboration-roles/{fileId}/{userId}/role', [CollaborationController::class, 'updateRoleInCollaboration']);
  Route::patch('collaboration-status/{fileId}/{userId}/role', [CollaborationController::class, 'updateRoleInCollaboration']);
  Route::put('/{id}',[FileController::class,"update_content"]);
Route::post('/sendColabos', [MyEmailController::class, 'sendCollabo']);
});
Route::post('/debugCode',[OpenAIController::class, 'debugCode']);


