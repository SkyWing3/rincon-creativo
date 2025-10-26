<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function app(): Response
    {
        return Inertia::render('Store');
    }

    public function products()
    {
        return Product::with('category')->get();
    }

    public function categories()
    {
        return Category::all();
    }
}
