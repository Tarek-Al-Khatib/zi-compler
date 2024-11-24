@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Collaboration Accepted!:D</h1>
        <p>{{ session('message') }}</p>
    </div>
@endsection
