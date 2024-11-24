<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/test', function () {
    \Illuminate\Support\Facades\Mail::to('omarmallouk76@gmail.com')->send(
        new \App\Mail\MyEmail()
    );
    return 'Done';
});

// Route::get('/test', function(){
//     return new \App\Mail\MyEmail();
// });