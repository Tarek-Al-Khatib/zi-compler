<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MyEmailController;
use App\Http\Controllers\CollaborationController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/test', function () {
    \Illuminate\Support\Facades\Mail::to('omarmallouk76@gmail.com')->send(
        new \App\Mail\MyEmail()
    );
    return 'Done';
});


Route::get('/test-mail', function () {
    $senderName = 'John Doe';
    $acceptUrl = 'http://example.com/accept';
    \Illuminate\Support\Facades\Mail::to('receiver@example.com')
        ->send(new \App\Mail\CollaborationRequestMail($senderName, $acceptUrl));
    return 'Email sent!';
});


Route::get('/testColab/{fileId}/{senderId}/{receiverEmail}', [MyEmailController::class, 'sendCollaborationRequest']);



// Route::get('/testColab', [MyEmailController::class, 'sendCollaborationRequest'])
//     ->name('test.collaboration.email');

Route::post('/sendColab/{fileId}/{receiverEmail}', [MyEmailController::class, 'sendCollaborationRequest']);

Route::get('/acceptColab/{fileId}/{userId}', [CollaborationController::class, 'acceptCollaboration'])->name('collaborations.accept');

// Route::get('/test', function(){
//     return new \App\Mail\MyEmail();
// });