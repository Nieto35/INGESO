<?php

namespace Pos\Auth\Application\Action;

use Pos\Auth\Domain\Exception\TableException;
use Pos\Auth\Domain\Service\UserService;

class GetTableUsersAction
{
    private UserService $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws TableException
     */
public function execute(int $page, ?string $search = null): array
{
    if ($page < 1) {
        throw new TableException("El número de página debe ser mayor que 0.");
    }

    $result = $this->userService->getAllUsers($page, $search);

    if ($page > $result['last_page']) {
        throw new TableException("La página {$page} no existe. La última página es {$result['last_page']}.");
    }

    return $result;
}
}
