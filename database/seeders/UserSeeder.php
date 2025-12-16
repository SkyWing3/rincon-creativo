<?php

namespace Database\Seeders;



use App\Models\User;

use App\Enums\Role;

use App\Enums\Departamento;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a normal user
        User::create([
            'first_name' => 'Normal',
            'f_last_name' => 'User',
            's_last_name' => 'Test',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => Role::Client,
            'phone' => '12345678',
            'departamento' => Departamento::Beni, // Assuming you have a Departamento enum and Beni is a case
            'city' => 'Trinidad',
            'address' => 'Calle Falsa 123',
        ]);

        // Create an administrator user
        User::create([
            'first_name' => 'Admin',
            'f_last_name' => 'User',
            's_last_name' => 'Manager',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => Role::Admin,
            'phone' => '87654321',
            'departamento' => Departamento::SantaCruz, // Assuming you have a Departamento enum and SantaCruz is a case
            'city' => 'Santa Cruz',
            'address' => 'Avenida Siempre Viva 456',
        ]);
    }
}
