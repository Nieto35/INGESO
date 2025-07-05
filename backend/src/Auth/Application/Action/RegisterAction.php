<?php

namespace Pos\Auth\Application\Action;

use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\ExistUserException;
use Pos\Auth\Domain\Service\UserService;

class RegisterAction
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @throws ExistUserException
     */
    public function execute(User $user): void
    {
        $this->userService->create($user);

    }

}
