<?php

namespace Pos\Auth\Application\Action;

use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\UserNotFoundException;
use Pos\Auth\Domain\Service\UserService;

class UpdateUserAction
{

    private UserService $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws UserNotFoundException
     */
    public function execute(User $user): void
    {
        $this->userService->update($user);
    }
}
