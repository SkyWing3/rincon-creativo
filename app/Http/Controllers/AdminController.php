<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    protected function ensureAdmin(Request $request): ?User
    {
        $user = $request->user();
        if (!$user || !in_array($user->role?->value ?? null, [Role::Admin->value, Role::Fulfillment->value], true)) {
            abort(403, 'No autorizado');
        }
        return $user;
    }

    public function users(Request $request)
    {
        $this->ensureAdmin($request);
        return User::all();
    }

    public function orders(Request $request)
    {
        $this->ensureAdmin($request);
        return Order::with(['details', 'user'])->latest()->get();
    }

    public function products(Request $request)
    {
        $this->ensureAdmin($request);
        return Product::with('category')->get();
    }

    public function categories(Request $request)
    {
        $this->ensureAdmin($request);
        return Category::all();
    }

    public function storeProduct(Request $request)
    {
        $this->ensureAdmin($request);

        $payload = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'precio' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'imagen_url' => ['nullable', 'url'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $product = Product::create($payload);

        return response()->json($product->load('category'), 201);
    }

    public function updateProduct(Request $request, Product $product)
    {
        $this->ensureAdmin($request);

        $payload = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
            'precio' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'imagen_url' => ['nullable', 'url'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $product->update($payload);

        return $product->load('category');
    }

    public function deleteProduct(Request $request, Product $product)
    {
        $this->ensureAdmin($request);
        $product->delete();

        return response()->noContent();
    }

    public function storeCategory(Request $request)
    {
        $this->ensureAdmin($request);
        $payload = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
        ]);

        $category = Category::create($payload);

        return response()->json($category, 201);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $this->ensureAdmin($request);
        $payload = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'descripcion' => ['nullable', 'string'],
        ]);

        $category->update($payload);

        return $category;
    }

    public function deleteCategory(Request $request, Category $category)
    {
        $this->ensureAdmin($request);
        $category->delete();

        return response()->noContent();
    }

    public function updateUserRole(Request $request, User $user)
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'role' => ['required', 'string', 'in:admin,fulfillment,client'],
        ]);

        $user->role = $validated['role'];
        $user->save();

        return $user;
    }
}
