<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Pos\Auth\Application\Action\UpdateUserAction;
use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\InvalidArgumentException;
use Pos\Auth\Domain\Exception\UserNotFoundException;

class UpdateUserController
{

    public function __invoke(Request $request, UpdateUserAction $action): JsonResponse
    {
        try {
            $user = User::fromRequest($request);
            $action->execute($user);
        } catch (InvalidArgumentException $e) {
            return response()->json([
                'error' => 'Datos inválidos',
                'message' => $e->getMessage(),
            ], 422);
        } catch (UserNotFoundException $e) {
            return response()->json([
                'error' => 'Usuario no encontrado',
                'message' => $e->getMessage(),
            ], 404);
        }

        return response()->json([
            'message' => 'User updated successfully',
        ], 200);
    }

}
