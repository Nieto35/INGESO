<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Pos\Auth\Application\Action\GetTableUsersAction;
use Pos\Auth\Domain\Exception\TableException;

class GetTableUsersController
{
    public function __invoke(Request $request, GetTableUsersAction $action): JsonResponse
    {
        try {
            $page = (int) $request->input('page', 1);
            $search = $request->input('search', null);

            $users = $action->execute($page, $search);

            return response()->json([
                'users' => $users,
            ], 200);
        } catch (TableException $e) {
            return response()->json([
                'error' => 'Tabla no encontrada',
                'message' => $e->getMessage(),
            ], 404);
        }
    }

}
