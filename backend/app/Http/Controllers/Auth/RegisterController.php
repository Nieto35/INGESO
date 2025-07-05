<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Pos\Auth\Application\Action\RegisterAction;
use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\ExistUserException;
use Pos\Auth\Domain\Exception\InvalidArgumentException;

class RegisterController
{
    public function __invoke(Request $request, RegisterAction $action): JsonResponse
    {
        try {
            $user = User::fromRequest($request);
            $action->execute($user);
        } catch (InvalidArgumentException $e) {
            return response()->json([
                'error' => 'Invalid input',
                'message' => $e->getMessage(),
            ], 422);
        } catch (ExistUserException $e) {
            return response()->json([
                'error' => 'User already exists',
                'message' => $e->getMessage(),
            ], 409);
        }
        return response()->json([
            'message' => 'User registered successfully',
        ], 200);
    }

}
