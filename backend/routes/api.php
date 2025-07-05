<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\GetTableUsersController;
use App\Http\Controllers\Auth\UpdateUserController;
use Illuminate\Routing\Router;

Route::prefix('user')
    ->as('user.')
    ->group(function (Router $router) {
        $router->post('/create', '\\'.RegisterController::class)->name('create');
        $router->get('/table', '\\'.GetTableUsersController::class)->name('table');
        $router->put('/update', '\\'.UpdateUserController::class)->name('update');
    });
