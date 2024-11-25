<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyEmailController;
use App\Http\Controllers\CollaborationController;

Route::get('/', function () {
    return view('welcome');
});


Route::post('/sendColabos', [MyEmailController::class, 'sendCollabo']);

Route::get('/collaborations/accept/{fileId}/{userId}', [CollaborationController::class, 'accept'])
    ->name('collaborations.accept');

Route::get('/collaborations/success', function () {
    return view('collaborations.success');
})->name('collaborations.success');




