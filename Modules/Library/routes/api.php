<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Library\Http\Controllers\Admin\BookController;

Route::get('/books/search', [BookController::class, 'search'])->name('library.api.books.search');
Route::get('/books/popular', [BookController::class, 'popular'])->name('library.api.books.popular');
Route::get('/categories', [\Modules\Library\Http\Controllers\Admin\BookCategoryController::class, 'list'])->name('library.api.categories');