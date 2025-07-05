<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    public $timestamps = false; // Disable automatic timestamps

    protected $table = 'users';

    protected $primaryKey = 'dni'; // Specify the primary key column

    public $incrementing = false; // Indicate that the primary key is not auto-incrementing
    protected $keyType = 'string'; // Specify the type of the primary key

    protected $fillable = [
        'dni',
        'name',
        'email',
        'birth_date',
        'phone',
    ];



}
