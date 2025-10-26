<?php

namespace App\Http\Requests;

use App\Enums\Departamento;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'f_last_name' => ['required', 'string', 'max:255'],
            's_last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['required', 'digits:8'],
            'departamento' => ['required', Rule::enum(Departamento::class)],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'photo_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
