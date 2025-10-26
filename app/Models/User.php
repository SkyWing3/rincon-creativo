<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\Role;
use App\Enums\Departamento;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'f_last_name',
        's_last_name',
        'email',
        'password',
        'phone',
        'departamento',
        'city',
        'address',
        'role',
        'photo_url',
    ];

    protected $attributes = [
         'photo_url' => 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => Role::class,
            'departamento' => Departamento::class,
        ];
    }
    
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'user_id', 'id');
    }
}
