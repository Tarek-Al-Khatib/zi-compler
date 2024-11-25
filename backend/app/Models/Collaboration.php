<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Collaboration extends Model{
use HasFactory;

// public $incrementing = false;

// protected $primaryKey = ['file_id', 'user_id'];

    protected $fillable = [
        'file_id',  
        'user_id',  
        'role',     
        'status',   
    ];

  

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
