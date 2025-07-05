<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// Auth
use Pos\Auth\Infrastructure\Repository\UserRepositoryEloquent;
use Pos\Auth\Domain\Repository\UserRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Auth
        $this->app->bind(UserRepository::class, UserRepositoryEloquent::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Add any bootstrapping logic here if needed
    }
}
