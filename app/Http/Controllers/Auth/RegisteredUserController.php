<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\Departamento;
use App\Enums\Role;
use Illuminate\Validation\Rules\Enum;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:40',
            'f_last_name' => 'required|string|max:50',
            's_last_name' => 'required|string|max:50',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => ['required',
                        'string',
                        'digits:8',
                        'regex:/^[67]\d{7}$/'],
            'departamento' => ['required', new Enum(Departamento::class)],
            'city' => 'required|string|max:90|min:5',
            'address' => 'required|string|max:350|min:10',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'f_last_name' => $request->f_last_name,
            's_last_name' => $request->s_last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'departamento' => $request->departamento,
            'city' => $request->city,
            'address' => $request->address,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
