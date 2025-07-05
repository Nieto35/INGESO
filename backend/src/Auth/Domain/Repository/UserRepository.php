<?php

namespace Pos\Auth\Domain\Repository;

use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\ExistUserException;
use Pos\Auth\Domain\Exception\UserNotFoundException;
use Pos\Auth\Domain\ValueObject\UserDni;

interface UserRepository
{
    public function create(
        User $user
    ):void;

    public function getAll(int $page, ?string $search = null): array;

    /**
     * @throws ExistUserException
     */
    public function existUser(UserDni $dni): void;

    /**
     * @throws UserNotFoundException
     */
    public function update(User $user): void;
}
