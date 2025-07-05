<?php

namespace Pos\Auth\Domain\Service;

use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\ExistUserException;
use Pos\Auth\Domain\Exception\UserNotFoundException;
use Pos\Auth\Domain\Repository\UserRepository;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @throws ExistUserException
     */
    public function create(User $user): void
    {
        $this->userRepository->existUser($user->getId());

        $this->userRepository->create($user);
    }

    public function getAllUsers(int $page, ?string $search = null): array
    {
        return $this->userRepository->getAll($page, $search);
    }

    /**
     * @throws UserNotFoundException
     */
    public function update(User $user): void
    {
        $this->userRepository->update($user);
    }

}
